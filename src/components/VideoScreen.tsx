import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getItem, getRandomVideo, type Item, markVideoPlayed } from '../data/catalog'
import { PlayerState, useYouTubePlayer } from '../hooks/useYouTubePlayer'
import { useKidLock } from '../lock/kidLockContext'
import BackButton from './BackButton'

export default function VideoScreen() {
  const { categoryId = '', itemId = '' } = useParams()
  const item = getItem(categoryId, itemId)
  if (!item) return <Navigate to={`/${categoryId}`} replace />
  // Keyed so a different item always gets a fresh player + fresh pick.
  return <ItemVideo key={`${categoryId}/${item.id}`} categoryId={categoryId} item={item} />
}

function ItemVideo({ categoryId, item }: { categoryId: string; item: Item }) {
  const playerHostRef = useRef<HTMLDivElement>(null)
  const [videoId, setVideoId] = useState(() => getRandomVideo(categoryId, item))
  const { locked } = useKidLock()

  useEffect(() => {
    markVideoPlayed(categoryId, item.id, videoId)
  }, [categoryId, item.id, videoId])

  const online = useOnline()
  // Rebuilt when the connection comes back (videos recover after offline) and
  // when kid mode toggles (YouTube's own controls only exist for parents).
  const player = useYouTubePlayer(playerHostRef, videoId, { enabled: online, interactive: !locked })

  const nextVideo = () => {
    const id = getRandomVideo(categoryId, item)
    // Load inside the tap itself — iOS only allows sound during a user gesture.
    player.loadNow(id)
    if (player.muted) player.unmute()
    setVideoId(id)
  }
  const ended = player.state === PlayerState.ENDED
  const paused = player.state === PlayerState.PAUSED

  return (
    <main className="video-screen flex min-h-dvh justify-center bg-cream px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="video-layout">
        <div className="area-controls">
          {/* Back — first in RTL flow, so it sits top-right */}
          <div className="area-header flex items-center gap-3">
            <BackButton to={`/${categoryId}`} label="رجوع" className="min-h-[72px] flex-1" />
            <img
              src={item.imageUrl}
              alt={item.nameArabic}
              draggable={false}
              className="compact-hide size-[72px] shrink-0 rounded-[1.5rem] border-4 border-cream-border object-cover shadow-clay"
            />
          </div>

          {/* Next random video */}
          <button
            type="button"
            onClick={nextVideo}
            className="area-next compact-btn flex min-h-[84px] cursor-pointer items-center justify-center gap-3 rounded-full bg-play px-6 text-3xl font-extrabold text-white shadow-[0_6px_0_var(--color-play-dark)] outline-none transition-transform duration-150 hover:brightness-110 focus-visible:ring-4 focus-visible:ring-play/50 active:translate-y-1 active:scale-95 active:shadow-[0_2px_0_var(--color-play-dark)]"
          >
            فيديو تاني!
            <span aria-hidden>🎲</span>
          </button>

          <SoundButton
            item={item}
            pauseVideo={player.pause}
            resumeVideo={player.play}
            isVideoPlaying={player.isPlaying}
          />

          {/* Parent co-play tip */}
          <aside className="area-tip compact-hide flex gap-3 rounded-3xl border-4 border-cream-border bg-white p-4 shadow-clay">
            <span aria-hidden className="text-3xl leading-none">
              💡
            </span>
            <div>
              <p className="mb-1 font-bold text-play">فكرة للعب المشترك</p>
              <p className="text-base leading-relaxed font-medium text-[#5b4a42]">{item.coPlayTip}</p>
            </div>
          </aside>
        </div>

        {/* Player */}
        <div className="area-video relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-cream-border bg-[#2b211c] shadow-clay">
          <div
            ref={playerHostRef}
            className={`absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full ${locked ? 'pointer-events-none' : ''}`}
          />
          {locked && online && !ended && (
            // Kid mode: YouTube can't be touched (no links out) — the whole
            // video is one big play/pause button instead.
            <button
              type="button"
              aria-label={paused ? 'شغّل' : 'وقّف'}
              onClick={paused ? player.play : player.pause}
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
            >
              {paused && (
                <span className="flex size-24 items-center justify-center rounded-full bg-play/90 text-5xl text-white shadow-clay">
                  ▶
                </span>
              )}
            </button>
          )}
          {!online && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#2b211c] text-center text-white">
              <span aria-hidden className="text-6xl">
                📶
              </span>
              <p className="px-4 text-lg font-bold">بدنا إنترنت للفيديو — بس الصوت شغّال!</p>
            </div>
          )}
          {online && player.muted && !ended && (
            // iOS only autoplays muted — one big tap turns the sound on.
            <button
              type="button"
              aria-label="شغّل الصوت"
              onClick={player.unmute}
              className="absolute start-3 top-3 flex size-20 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-sound text-4xl shadow-clay transition-transform duration-150 active:scale-90 motion-safe:animate-pulse"
            >
              🔊
            </button>
          )}
          {online && ended && (
            // Covers YouTube's end screen so no suggested videos are tappable.
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[#2b211c]/90">
              <button
                type="button"
                aria-label="عيد الفيديو"
                onClick={player.play}
                className="flex size-24 cursor-pointer items-center justify-center rounded-full bg-back text-5xl shadow-clay transition-transform duration-150 active:scale-90"
              >
                🔁
              </button>
              <button
                type="button"
                aria-label="فيديو تاني"
                onClick={nextVideo}
                className="flex size-24 cursor-pointer items-center justify-center rounded-full bg-play text-5xl shadow-clay transition-transform duration-150 active:scale-90"
              >
                🎲
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function useOnline() {
  const [online, setOnline] = useState(() => navigator.onLine)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])
  return online
}

/** Says the word aloud with an Arabic voice, if the device has one. */
function speakArabic(text: string): { onEnd: (cb: () => void) => void } | null {
  if (!('speechSynthesis' in window)) return null
  const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith('ar'))
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = voice?.lang ?? 'ar-SA'
  if (voice) utterance.voice = voice
  utterance.rate = 0.8
  utterance.pitch = 1.15
  speechSynthesis.cancel()
  speechSynthesis.speak(utterance)
  return { onEnd: (cb) => (utterance.onend = cb) }
}

function SoundButton({
  item,
  pauseVideo,
  resumeVideo,
  isVideoPlaying,
}: {
  item: Item
  pauseVideo: () => void
  resumeVideo: () => void
  isVideoPlaying: () => boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [hopKey, setHopKey] = useState(0)

  useEffect(() => {
    // Voices load async on some browsers; touching the list kicks that off.
    if ('speechSynthesis' in window) speechSynthesis.getVoices()
    if (!item.soundAudioUrl) return
    const audio = new Audio(item.soundAudioUrl)
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [item.soundAudioUrl])

  const onPress = () => {
    setHopKey((k) => k + 1)

    // Pause the video so the sound / word is clearly heard, then carry on.
    const wasPlaying = isVideoPlaying()
    if (wasPlaying) pauseVideo()
    const resume = () => {
      if (wasPlaying) resumeVideo()
    }

    const audio = audioRef.current
    if (audio) {
      audio.onended = resume
      audio.currentTime = 0
      void audio.play().catch(resume)
      return
    }
    // No real recording (food, toys, rabbit…): say the word instead.
    const speech = speakArabic(item.nameArabic)
    if (speech) speech.onEnd(resume)
    else resume()
  }

  return (
    <button
      type="button"
      onClick={onPress}
      className="area-sound compact-btn flex min-h-[76px] cursor-pointer items-center justify-center gap-3 rounded-full bg-sound px-6 text-2xl font-extrabold text-[#4a2a00] shadow-[0_6px_0_var(--color-sound-dark)] outline-none transition-transform duration-150 hover:brightness-105 focus-visible:ring-4 focus-visible:ring-sound-dark/50 active:translate-y-1 active:scale-95 active:shadow-[0_2px_0_var(--color-sound-dark)]"
    >
      <span key={hopKey} aria-hidden className={`text-4xl ${hopKey ? 'animate-hop' : ''}`}>
        {item.emoji}
      </span>
      {item.soundCue}
      <span aria-hidden>{item.soundAudioUrl ? '📢' : '🗣️'}</span>
    </button>
  )
}
