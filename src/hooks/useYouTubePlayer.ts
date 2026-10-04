import { type RefObject, useEffect, useRef, useState } from 'react'

// Minimal typings for the bits of the YouTube IFrame Player API we use.
interface YTPlayer {
  loadVideoById(videoId: string): void
  playVideo(): void
  pauseVideo(): void
  getPlayerState(): number
  destroy(): void
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    options: {
      host?: string
      videoId: string
      width?: string
      height?: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: () => void
        onStateChange?: (event: { data: number }) => void
      }
    },
  ) => YTPlayer
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

export const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
} as const

let apiPromise: Promise<YTNamespace> | null = null

function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT)
      return
    }
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve(window.YT!)
    }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.onerror = () => {
      // e.g. opened offline — forget the failure so the next attempt retries.
      script.remove()
      apiPromise = null
      reject(new Error('YouTube IFrame API failed to load'))
    }
    document.head.appendChild(script)
  })
  return apiPromise
}

/**
 * Mounts a YouTube player into `containerRef` and swaps videos in place
 * (no iframe reload) whenever `videoId` changes.
 */
export function useYouTubePlayer(
  containerRef: RefObject<HTMLDivElement | null>,
  videoId: string,
  enabled = true,
) {
  const playerRef = useRef<YTPlayer | null>(null)
  const readyRef = useRef(false)
  const latestVideoRef = useRef(videoId)
  const loadedVideoRef = useRef('')
  const [state, setState] = useState<number>(-1)

  useEffect(() => {
    let cancelled = false
    const host = containerRef.current
    if (!host || !enabled) return

    // The API replaces the element it's given, so hand it a disposable child.
    const mount = document.createElement('div')
    host.appendChild(mount)

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return
        loadedVideoRef.current = latestVideoRef.current
        playerRef.current = new YT.Player(mount, {
          host: 'https://www.youtube-nocookie.com',
          videoId: loadedVideoRef.current,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            iv_load_policy: 3, // no annotations
            fs: 1,
            hl: 'ar',
          },
          events: {
            onReady: () => {
              readyRef.current = true
              // The video may have changed while the player was booting.
              if (loadedVideoRef.current !== latestVideoRef.current) {
                loadedVideoRef.current = latestVideoRef.current
                playerRef.current?.loadVideoById(latestVideoRef.current)
              }
            },
            onStateChange: (event) => setState(event.data),
          },
        })
      })
      .catch(() => {
        // Offline: the screen shows its own message; we retry when back online.
      })

    return () => {
      cancelled = true
      readyRef.current = false
      playerRef.current?.destroy()
      playerRef.current = null
      host.replaceChildren()
    }
  }, [containerRef, enabled])

  useEffect(() => {
    latestVideoRef.current = videoId
    if (readyRef.current && playerRef.current && loadedVideoRef.current !== videoId) {
      loadedVideoRef.current = videoId
      playerRef.current.loadVideoById(videoId)
    }
  }, [videoId])

  return {
    state,
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    isPlaying: () => playerRef.current?.getPlayerState() === PlayerState.PLAYING,
  }
}
