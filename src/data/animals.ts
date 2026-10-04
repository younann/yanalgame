export interface AnimalItem {
  id: string
  nameArabic: string
  emoji: string
  soundCue: string
  /** Real recording of the animal. Rabbits are (nearly) silent, so they have none. */
  soundAudioUrl?: string
  imageUrl: string
  coPlayTip: string
  /** YouTube video IDs — each one checked to exist and allow embedding. */
  videos: string[]
}

// Grid order. Image + sound sources and licenses are listed in CREDITS.md.
export const ANIMALS: AnimalItem[] = [
  {
    id: 'cow',
    nameArabic: 'بقرة',
    emoji: '🐮',
    soundCue: 'مووو!',
    soundAudioUrl: '/sounds/cow.mp3',
    imageUrl: '/animals/cow.jpg',
    coPlayTip: 'قلدوا صوت البقرة سوا مع طفلكم بصوت عالي: مووو! واسألوه: شو بتوكل البقرة؟',
    videos: [
      'KjmuBo8xoCU', // Cows mooing and grazing in a field — The Parakeet
      'FaC1WpYljZ4', // Real cows mooing and grazing — The Parakeet
      '3K2UrGo9IhI', // Cow sounds, real cows for kids — Animals All The Time
      'UwHXkmWTqGA', // Baby cows playing — Animals All The Time
      'EVUu8s5NyBQ', // Moo cow moo, authentic sounds for toddlers — Sunday Heppner
    ],
  },
  {
    id: 'sheep',
    nameArabic: 'خروف',
    emoji: '🐑',
    soundCue: 'مااااع!',
    soundAudioUrl: '/sounds/sheep.mp3',
    imageUrl: '/animals/sheep.jpg',
    coPlayTip: 'قولوا سوا: مااااع! ودوروا على إشي أبيض ومنفوش متل صوف الخروف.',
    videos: [
      'CGilPYScFLQ', // Baby lamb goes baa — Animal Scoops
      'OwxIzr7CbcQ', // Lambs jumping
      'd3_vmdKSE3c', // Happy lambs playing in the pasture
      'cTvNSy-81KI', // Lambs running — Edgar's Mission
      'cDL7PXkGCNg', // Sheep baa (authentic sounds) — Sunday Heppner
    ],
  },
  {
    id: 'dog',
    nameArabic: 'كلب',
    emoji: '🐶',
    soundCue: 'هَوْ هَوْ!',
    soundAudioUrl: '/sounds/dog.mp3',
    imageUrl: '/animals/dog.jpg',
    coPlayTip: 'اعملوا هَوْ هَوْ سوا، وهزّوا إيديكم متل ذيل الكلب لما يكون مبسوط!',
    videos: [
      'VAH-ixdFWFs', // 20 minutes of adorable puppies — The Pet Collective
      'pxn0wL_uSm4', // World's cutest puppies — The Pet Collective
      '0m6nGKPXr9E', // Fluffy puppies playing on the grass
      'I4zmOb2ehgk', // Big dogs in the puppy playground — The Farm
    ],
  },
  {
    id: 'cat',
    nameArabic: 'بسة',
    emoji: '🐱',
    soundCue: 'مياووو!',
    soundAudioUrl: '/sounds/cat.mp3',
    imageUrl: '/animals/cat.jpg',
    coPlayTip: 'قولوا مياووو بصوت ناعم، وامشوا على إيديكم وإجريكم متل البسة.',
    videos: [
      'Mj19KE_HV1E', // Mom cat with 4 meowing kittens, no added music
      'BgIgKcqPd4k', // Kittens meowing all at the same time
      'y0sF5xhGreA', // 20 minutes of adorable kittens — The Pet Collective
      'r902nXm0cUs', // Low-stimulation cats & kittens for toddlers
    ],
  },
  {
    id: 'duck',
    nameArabic: 'بطة',
    emoji: '🦆',
    soundCue: 'واك واك!',
    soundAudioUrl: '/sounds/duck.mp3',
    imageUrl: '/animals/duck.jpg',
    coPlayTip: 'امشوا سوا متل البطة يمين وشمال وقولوا: واك واك!',
    videos: [
      'ndiVL4plQDI', // Duck — All Things Animal TV
      'MA0c2v-tct0', // Duck hatches and grows — Dodo Kids
      'zBKRJfKVhfA', // Ducklings' pool time
      'DpWSJy_yfFA', // Mama duck with ducklings in a row — Nat Geo Animals
    ],
  },
  {
    id: 'horse',
    nameArabic: 'حصان',
    emoji: '🐴',
    soundCue: 'إيييهه!',
    soundAudioUrl: '/sounds/horse.mp3',
    imageUrl: '/animals/horse.jpg',
    coPlayTip: 'اعملوا صوت حوافر الحصان بإيديكم على الطاولة: تِك تَك تِك تَك!',
    videos: [
      '7-kQJzd7muA', // Newborn foal takes first steps — BBC
      '3kEmHjxYoeA', // Happy horses playing
      '1bBPeWQ3xFM', // Andalusian foal running & playing
      'GpLqrigeZ6w', // Baby foal with its mom
      'dnIToKkZagw', // The sound of the horse — Animal Universe
    ],
  },
  {
    id: 'bird',
    nameArabic: 'عصفور',
    emoji: '🐦',
    soundCue: 'زيق زيق!',
    soundAudioUrl: '/sounds/bird.mp3',
    imageUrl: '/animals/bird.jpg',
    coPlayTip: 'افردوا إيديكم متل الجناحات وطيروا بالغرفة وأنتو بتقولوا: زيق زيق!',
    videos: [
      'kofPPkwR_kU', // Bird sounds! — KLT Wild
      'DKRUCoEd1JQ', // Baby bluebirds nest-box time-lapse
      'ODD7DdtLvTo', // Baby birds fed by mommy robin
      '0AugFrZPP9U', // Tropical birds with names and sounds
    ],
  },
  {
    id: 'rabbit',
    nameArabic: 'أرنب',
    emoji: '🐰',
    soundCue: 'نُطّ نُطّ!',
    imageUrl: '/animals/rabbit.jpg',
    coPlayTip: 'الأرنب ما بيحكي كتير، بس بينُطّ! نُطّوا سوا متل الأرنب وحرّكوا مناخيركم.',
    videos: [
      'baQBc3e1BaE', // Baby rabbits and their mom — Sarah's Wildlife Encounters
      '0dWkMaynGkk', // Rabbits! Learn about rabbits — KLT Wild
      'qM9YWm6T_hc', // Cute bunny jumping competition
      'Ddy20YF3qR0', // The wonderful world of rabbits
    ],
  },
]

export const ANIMALS_DATA: Record<string, AnimalItem> = Object.fromEntries(
  ANIMALS.map((animal) => [animal.id, animal]),
)

// Last video shown per animal, so the same one never plays twice in a row —
// whether via "فيديو تاني" or by going back and tapping the animal again.
const lastPlayedVideoMap: Record<string, string> = {}

/** Pure pick: a random video for the animal, avoiding the last one played. */
export function getRandomVideoForAnimal(animalId: string): string {
  const animal = ANIMALS_DATA[animalId]
  if (!animal || animal.videos.length === 0) return ''

  if (animal.videos.length === 1) return animal.videos[0]

  const lastVideo = lastPlayedVideoMap[animalId]
  const eligibleVideos = animal.videos.filter((id) => id !== lastVideo)

  const randomIndex = Math.floor(Math.random() * eligibleVideos.length)
  return eligibleVideos[randomIndex]
}

/**
 * Records the video actually on screen. Kept separate from the pick (and
 * idempotent) so React StrictMode's double-invoked initializers can't desync it.
 */
export function markVideoPlayed(animalId: string, videoId: string): void {
  lastPlayedVideoMap[animalId] = videoId
}
