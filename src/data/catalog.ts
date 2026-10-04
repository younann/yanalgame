import { ANIMALS } from './animals'
import { ITEMS as FOOD } from './food'
import { ITEMS as TOYS } from './toys'
import { ITEMS as TRANSPORT } from './transport'
import type { Category, Item } from './types'

export type { Category, Item }

// Home screen order (RTL: first one sits top-right).
export const CATEGORIES: Category[] = [
  { id: 'animals', nameArabic: 'حيوانات', items: ANIMALS, cover: ['cow', 'dog', 'cat', 'duck'] },
  { id: 'transport', nameArabic: 'سيارات وطيارات', items: TRANSPORT, cover: ['car', 'airplane', 'bus', 'train'] },
  { id: 'food', nameArabic: 'أكل', items: FOOD, cover: ['apple', 'banana', 'strawberry', 'milk'] },
  { id: 'toys', nameArabic: 'ألعاب', items: TOYS, cover: ['ball', 'teddy', 'balloon', 'blocks'] },
]
  .map(({ cover, ...category }) => ({
    ...category,
    coverImages: cover
      .map((id) => category.items.find((item) => item.id === id)?.imageUrl)
      .filter((url): url is string => Boolean(url)),
  }))
  .filter((category) => category.items.length > 0)

export function getCategory(categoryId: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === categoryId)
}

export function getItem(categoryId: string, itemId: string): Item | undefined {
  return getCategory(categoryId)?.items.find((item) => item.id === itemId)
}

// Last video shown per item, so the same one never plays twice in a row —
// whether via "فيديو تاني" or by going back and tapping the item again.
const lastPlayedVideoMap: Record<string, string> = {}

/** Pure pick: a random video for the item, avoiding the last one played. */
export function getRandomVideo(categoryId: string, item: Item): string {
  if (item.videos.length === 0) return ''
  if (item.videos.length === 1) return item.videos[0]

  const lastVideo = lastPlayedVideoMap[`${categoryId}/${item.id}`]
  const eligibleVideos = item.videos.filter((id) => id !== lastVideo)

  const randomIndex = Math.floor(Math.random() * eligibleVideos.length)
  return eligibleVideos[randomIndex]
}

/**
 * Records the video actually on screen. Kept separate from the pick (and
 * idempotent) so React StrictMode's double-invoked initializers can't desync it.
 */
export function markVideoPlayed(categoryId: string, itemId: string, videoId: string): void {
  lastPlayedVideoMap[`${categoryId}/${itemId}`] = videoId
}
