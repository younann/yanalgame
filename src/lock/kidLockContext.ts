import { createContext, useContext } from 'react'

export interface KidLockState {
  /** Kid mode: every exit the app controls is blocked until the parent PIN is entered. */
  locked: boolean
  hasPin: boolean
  setPin: (pin: string) => Promise<void>
  checkPin: (pin: string) => Promise<boolean>
  lock: () => void
  unlock: () => void
}

export const KidLockContext = createContext<KidLockState | null>(null)

export function useKidLock(): KidLockState {
  const ctx = useContext(KidLockContext)
  if (!ctx) throw new Error('useKidLock must be used inside <KidLockProvider>')
  return ctx
}

/**
 * Installs a "guard" history entry behind the app's first page, before the
 * router starts. Pressing back past the first page lands on it; while locked
 * we bounce forward instead of leaving (Android back button, swipe-back).
 */
export function installHistoryGuard(): void {
  try {
    if (sessionStorage.getItem('yn.guard')) return
    sessionStorage.setItem('yn.guard', '1')
  } catch {
    return
  }
  history.replaceState({ ynGuard: true }, '', location.href)
  history.pushState(null, '', location.href)
}
