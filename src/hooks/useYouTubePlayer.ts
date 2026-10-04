import { type RefObject, useEffect, useRef, useState } from 'react'

// Minimal typings for the bits of the YouTube IFrame Player API we use.
interface YTPlayer {
  loadVideoById(videoId: string): void
  playVideo(): void
  pauseVideo(): void
  mute(): void
  unMute(): void
  isMuted(): boolean
  setVolume(volume: number): void
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
        onAutoplayBlocked?: () => void
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

/**
 * iPhone / iPad (incl. iPadOS posing as a Mac) never autoplay embedded video
 * with sound — only muted. Start muted there so playback begins immediately.
 */
const IS_IOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

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
  { enabled = true, interactive = true }: { enabled?: boolean; interactive?: boolean } = {},
) {
  const playerRef = useRef<YTPlayer | null>(null)
  const readyRef = useRef(false)
  const latestVideoRef = useRef(videoId)
  const loadedVideoRef = useRef('')
  const [state, setState] = useState<number>(-1)
  const [muted, setMuted] = useState(IS_IOS)

  useEffect(() => {
    let cancelled = false
    const host = containerRef.current
    if (!host || !enabled) return

    // The API replaces the element it's given, so hand it a disposable child.
    const mount = document.createElement('div')
    host.appendChild(mount)

    let fallbackTimer: number | undefined
    // Browser refused to autoplay with sound → play muted instead.
    const playMuted = () => {
      const player = playerRef.current
      if (!player) return
      player.mute()
      player.playVideo()
      setMuted(true)
    }

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
            // Kid mode hides YouTube's UI entirely (it links out to youtube.com).
            controls: interactive ? 1 : 0,
            disablekb: interactive ? 0 : 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            mute: IS_IOS ? 1 : 0,
            iv_load_policy: 3, // no annotations
            fs: interactive ? 1 : 0,
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
              playerRef.current?.playVideo()
              // Some browsers block silently instead of firing onAutoplayBlocked.
              fallbackTimer = window.setTimeout(() => {
                const s = playerRef.current?.getPlayerState()
                if (s !== PlayerState.PLAYING && s !== PlayerState.BUFFERING) playMuted()
              }, 2000)
            },
            onAutoplayBlocked: playMuted,
            onStateChange: (event) => {
              setState(event.data)
              // Catch unmutes done through YouTube's own controls too.
              setMuted(playerRef.current?.isMuted() ?? false)
            },
          },
        })
      })
      .catch(() => {
        // Offline: the screen shows its own message; we retry when back online.
      })

    return () => {
      cancelled = true
      window.clearTimeout(fallbackTimer)
      readyRef.current = false
      playerRef.current?.destroy()
      playerRef.current = null
      host.replaceChildren()
    }
  }, [containerRef, enabled, interactive])

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
    muted,
    /** Switch video right now — call from a tap so iOS keeps the sound on. */
    loadNow: (id: string) => {
      latestVideoRef.current = id
      if (readyRef.current && playerRef.current) {
        loadedVideoRef.current = id
        playerRef.current.loadVideoById(id)
      }
    },
    /** Must run inside a tap handler — that's what lets iOS play sound. */
    unmute: () => {
      const player = playerRef.current
      if (!player) return
      player.unMute()
      player.setVolume(100)
      player.playVideo()
      setMuted(false)
    },
    isPlaying: () => playerRef.current?.getPlayerState() === PlayerState.PLAYING,
  }
}
