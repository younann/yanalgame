import { useNavigate } from 'react-router-dom'
import { ANIMALS } from '../data/animals'

/** Home: nothing but a 2-column grid of big, tappable animal photos. */
export default function AnimalGrid() {
  const navigate = useNavigate()

  return (
    <main className="min-h-dvh bg-cream">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-4 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
        {ANIMALS.map((animal, index) => (
          <button
            key={animal.id}
            type="button"
            aria-label={animal.nameArabic}
            onClick={() => navigate(`/video/${animal.id}`)}
            className="aspect-square cursor-pointer overflow-hidden rounded-[2.25rem] border-4 border-cream-border bg-white shadow-clay transition-transform duration-150 active:scale-95"
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
