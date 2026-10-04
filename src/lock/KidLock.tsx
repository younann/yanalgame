import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { KidLockContext } from './kidLockContext'

const PIN_KEY = 'yn.pinHash'
const LOCKED_KEY = 'yn.locked'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Private mode etc. — the lock still works for this session.
  }
}

async function hashPin(pin: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`yalla-nehki:${pin}`))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

export function KidLockProvider({ children }: { children: ReactNode }) {
  const [pinHash, setPinHash] = useState(() => read(PIN_KEY))
  const [locked, setLocked] = useState(() => read(LOCKED_KEY) === '1' && read(PIN_KEY) !== null)

  const setPin = useCallback(async (pin: string) => {
    const hash = await hashPin(pin)
    write(PIN_KEY, hash)
    setPinHash(hash)
  }, [])

  const checkPin = useCallback(
    async (pin: string) => pinHash !== null && (await hashPin(pin)) === pinHash,
    [pinHash],
  )

  const lock = useCallback(() => {
    write(LOCKED_KEY, '1')
    setLocked(true)
  }, [])

  const unlock = useCallback(() => {
    write(LOCKED_KEY, '0')
    setLocked(false)
  }, [])

  useExitGuards(locked)

  return (
    <KidLockContext.Provider value={{ locked, hasPin: pinHash !== null, setPin, checkPin, lock, unlock }}>
      {children}
    </KidLockContext.Provider>
  )
}

function useExitGuards(locked: boolean) {
  // Back past the first page.
  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      if (!(event.state as { ynGuard?: boolean } | null)?.ynGuard) return
      if (locked) history.go(1)
      else history.back()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [locked])

  // Closing / reloading the tab (desktop & Android browsers) asks first.
  useEffect(() => {
    if (!locked) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [locked])

  // Fullscreen where the browser supports it (desktop, Android — not iPhone).
  // Needs a user gesture, so (re)enter on the next tap after locking / exiting.
  useEffect(() => {
    if (!locked || !document.fullscreenEnabled) return
    const enter = () => {
      if (document.fullscreenElement) return
      document.documentElement
        .requestFullscreen({ navigationUI: 'hide' })
        .then(() => {
          // Chrome: keep Esc from leaving fullscreen.
          const keyboard = (navigator as Navigator & { keyboard?: { lock?: (keys: string[]) => Promise<void> } })
            .keyboard
          return keyboard?.lock?.(['Escape'])
        })
        .catch(() => {})
    }
    window.addEventListener('pointerup', enter)
    return () => {
      window.removeEventListener('pointerup', enter)
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    }
  }, [locked])

  // No right-click / long-press menus ("open in new tab", "save image"…).
  useEffect(() => {
    const onContextMenu = (event: Event) => event.preventDefault()
    window.addEventListener('contextmenu', onContextMenu)
    return () => window.removeEventListener('contextmenu', onContextMenu)
  }, [])
}
