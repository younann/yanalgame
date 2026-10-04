import type { ReactNode } from 'react'

export interface Tile {
  key: string
  label: string
  /** One photo, or several for a 2×2 mosaic (category tiles). */
  images: string[]
  onClick: () => void
}

/** A text-free grid of big, tappable photos that always fits the screen. */
export default function TileGrid({
  tiles,
  variant,
  header,
}: {
  tiles: Tile[]
  variant: 'categories' | 'items'
  header?: ReactNode
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-cream px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))] py-[max(1rem,env(safe-area-inset-top),env(safe-area-inset-bottom))] min-[600px]:p-6 [@media(orientation:landscape)_and_(max-height:540px)]:p-4">
      <div className={`tile-wrap ${variant} ${header ? 'has-header' : ''}`}>
        {header}
        <div className="tile-grid">
          {tiles.map((tile, index) => (
            <button
              key={tile.key}
              type="button"
              aria-label={tile.label}
              onClick={tile.onClick}
              className="aspect-square cursor-pointer overflow-hidden rounded-[2.25rem] border-4 border-cream-border bg-white shadow-clay outline-none transition-transform duration-150 hover:-translate-y-1 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-play/60 active:scale-95"
            >
              {tile.images.length === 1 ? (
                <img
                  src={tile.images[0]}
                  alt=""
                  draggable={false}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full rounded-[1.9rem] object-cover"
                />
              ) : (
                <span className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-[1.9rem]">
                  {tile.images.slice(0, 4).map((src) => (
                    <img key={src} src={src} alt="" draggable={false} decoding="async" className="h-full w-full object-cover" />
                  ))}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
