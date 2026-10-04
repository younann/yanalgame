import { useNavigate } from 'react-router-dom'
import { ANIMALS } from '../data/animals'

/** Home: nothing but a grid of big, tappable animal photos. */
export default function AnimalGrid() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-dvh items-center justify-center bg-cream px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))] py-[max(1rem,env(safe-area-inset-top),env(safe-area-inset-bottom))] min-[600px]:p-6 [@media(orientation:landscape)_and_(max-height:540px)]:p-4">
      <div className="animal-grid">
        {ANIMALS.map((animal, index) => (
          <button
            key={animal.id}
            type="button"
            aria-label={animal.nameArabic}
            onClick={() => navigate(`/video/${animal.id}`)}
            className="aspect-square cursor-pointer overflow-hidden rounded-[2.25rem] border-4 border-cream-border bg-white shadow-clay outline-none transition-transform duration-150 hover:-translate-y-1 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-play/60 active:scale-95"
          >
            <img
              src={animal.imageUrl}
              alt=""
              draggable={false}
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full rounded-[1.9rem] object-cover"
            />
          </button>
        ))}
      </div>
    </main>
  )
}
