export interface Item {
  id: string
  nameArabic: string
  emoji: string
  /** Text on the sound button: an imitation ("مووو!") or the word itself ("تفاحة!"). */
  soundCue: string
  /** Real recording. Items without one have their Arabic name spoken instead. */
  soundAudioUrl?: string
  imageUrl: string
  coPlayTip: string
  /** YouTube video IDs — each one checked to exist and allow embedding. */
  videos: string[]
}

export interface Category {
  id: string
  nameArabic: string
  /** Photos for the home screen tile's 2×2 mosaic. */
  coverImages: string[]
  items: Item[]
}
