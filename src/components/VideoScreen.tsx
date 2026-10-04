import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ANIMALS_DATA,
  type AnimalItem,
  getRandomVideoForAnimal,
  markVideoPlayed,
} from '../data/animals'
import { PlayerState, useYouTubePlayer } from '../hooks/useYouTubePlayer'

export default function VideoScreen() {
  const { animalId = '' } = useParams()
  const animal = ANIMALS_DATA[animalId]
  if (!animal) return <Navigate to="/" replace />
  // Keyed so a different animal always gets a fresh player + fresh pick.
  return <AnimalVideo key={animal.id} animal={animal} />
}

function AnimalVideo({ animal }: { animal: AnimalItem }) {
  const navigate = useNavigate()
  const playerHostRef = useRef<HTMLDivElement>(null)
  const [videoId, setVideoId] = useState(() => getRandomVideoForAnimal(animal.id))
  const player = useYouTubePlayer(playerHostRef, videoId)

  useEffect(() => {
    markVideoPlayed(animal.id, videoId)
  }, [animal.id, videoId])

  const nextVideo = () => setVideoId(getRandomVideoForAnimal(animal.id))
  const ended = player.state === PlayerState.ENDED

  return (
    <main className="min-h-dvh bg-cream">
      <div className="mx-auto flex max-w-md flex-col gap-4 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Back — first in RTL flow, so it sits top-right */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex min-h-[72px] flex-1 cursor-pointer items-center justify-center gap-3 rounded-[2rem] bg-back px-6 text-2xl font-extrabold text-back-ink shadow-clay transition-transform duration-150 active:scale-95"
          >
            <span aria-hidden className="text-3xl">➜</span>
            رجوع للألعاب
          </button>
          <img
            src={animal.imageUrl}
            alt={animal.nameArabic}
            draggable={false}
            className="size-[72px] shrink-0 rounded-[1.5rem] border-4 border-cream-border object-cover shadow-clay"
          />
        </div>

        {/* Player */}
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-cream-border bg-[#2b211c] shadow-clay">
          <div ref={playerHostRef} className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full" />
          {ended && (
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

        {/* Next random video */}
        <button
          type="button"
          onClick={nextVideo}
          className="flex min-h-[84px] cursor-pointer items-center justify-center gap-3 rounded-full bg-play px-6 text-3xl font-extrabold text-white shadow-[0_6px_0_var(--color-play-dark)] transition-transform duration-150 active:translate-y-1 active:scale-95 active:shadow-[0_2px_0_var(--color-play-dark)]"
        >
          فيديو تاني!
          <span aria-hidden>🎲</span>
        </button>

        <SoundButton animal={animal} pauseVideo={player.pause} resumeVideo={player.play} isVideoPlaying={player.isPlaying} />

        {/* Parent co-play tip */}
        <aside className="flex gap-3 rounded-3xl border-4 border-cream-border bg-white p-4 shadow-clay">
          <span aria-hidden className="text-3xl leading-none">💡</span>
          <div>
            <p className="mb-1 font-bold text-play">فكرة للعب المشترك</p>
            <p className="text-base leading-relaxed font-medium text-[#5b4a42]">{animal.coPlayTip}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}

function SoundButton({
  animal,
  pauseVideo,
  resumeVideo,
  isVideoPlaying,
}: {
  animal: AnimalItem
  pauseVideo: () => void
  resumeVideo: () => void
  isVideoPlaying: () => boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [hopKey, setHopKey] = useState(0)

  useEffect(() => {
    if (!animal.soundAudioUrl) return
    const audio = new Audio(animal.soundAudioUrl)
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [animal.soundAudioUrl])

  const onPress = () => {
    setHopKey((k) => k + 1)
    const audio = audioRef.current
    if (!audio) return

    // Pause the video so the real sound is clearly heard, then carry on.
    const wasPlaying = isVideoPlaying()
    if (wasPlaying) pauseVideo()
    audio.onended = wasPlaying ? () => resumeVideo() : null
    audio.currentTime = 0
    void audio.play().catch(() => {})
  }

  return (
    <button
      type="button"
      onClick={onPress}
      className="flex min-h-[76px] cursor-pointer items-center justify-center gap-3 rounded-full bg-sound px-6 text-2xl font-extrabold text-[#4a2a00] shadow-[0_6px_0_var(--color-sound-dark)] transition-transform duration-150 active:translate-y-1 active:scale-95 active:shadow-[0_2px_0_var(--color-sound-dark)]"
    >
      <span key={hopKey} aria-hidden className={`text-4xl ${hopKey ? 'animate-hop' : ''}`}>
        {animal.emoji}
      </span>
      {animal.soundCue}
      {animal.soundAudioUrl && <span aria-hidden>📢</span>}
    </button>
  )
}
