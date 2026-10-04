import type { Item } from './types'

// Photo + sound credits: CREDITS.md
export const ITEMS: Item[] = [
  {
    id: 'car',
    nameArabic: 'سيارة',
    emoji: '🚗',
    soundCue: 'بيب بيب!',
    soundAudioUrl: '/sounds/transport-car.mp3',
    imageUrl: '/transport/car.jpg',
    coPlayTip: 'امسكوا ستيرنج وهمي وسوقوا سوا: برررم! ولما توقفوا اضغطوا الزمور وقولوا: بيب بيب!',
    videos: [
      'rADqW39e4mM', // CARS | Cars For Kids — Things That Go TV!
      'NWCWGOSldVQ', // Let's Go To The Car Wash! See inside a real car wash — Super Simple Play with Caitie!
      '1Hhy5Uy3fhA', // Car Wash for Kids | Drive-thru Carwash fun — Handyman Hal
      'iRuq5RPUqbw', // Car Carrier for Children | Truck Tunes for Kids — twentytrucks
      'OpQ-_GFMUNU', // 4X4 OFF ROAD | Cars For Kids — Things That Go TV!
    ],
  },
  {
    id: 'truck',
    nameArabic: 'شاحنة',
    emoji: '🚚',
    soundCue: 'برررم!',
    imageUrl: '/transport/truck.jpg',
    coPlayTip: 'حمّلوا ألعاب صغار بصندوق أو سلة وجرّوها سوا متل الشاحنة وقولوا: برررم! وبعدين فضّوا الحمولة.',
    videos: [
      '90Akp8nk904', // LOW STIMULATION Garbage Trucks for Toddlers — Kids Quiet Corner
      'HWLuXiA-Lsw', // Garbage Truck for Children | Truck Tunes for Kids — twentytrucks
      '0Cks5F8EfF8', // SEMI TRAILER | Trucks For Kids — Things That Go TV!
      'qU3-T3GVSHI', // Cement Mixer for Children | Truck Tunes for Kids — twentytrucks
      'Ape0NGMLR7U', // Trucks Galore! — CoasterFan2105
    ],
  },
  {
    id: 'bus',
    nameArabic: 'باص',
    emoji: '🚌',
    soundCue: 'توت توت!',
    soundAudioUrl: '/sounds/transport-bus.mp3',
    imageUrl: '/transport/bus.jpg',
    coPlayTip: 'صفّوا كراسي ورا بعض واعملوا باص، اطلعوا عليه سوا وغنّوا: عجلات الباص بتلف وبتلف! وقولوا: توت توت!',
    videos: [
      'CFlBtMD2Qis', // Bus for Children | Truck Tunes for Kids — twentytrucks
      'cxZmWDuUPAg', // DOUBLE DECKER BUS | Buses For Kids — Things That Go TV!
      'kIIbKhNDP2g', // Handyman Hal learns about School Bus — Handyman Hal
      'SjPYTZ0cU9E', // School Bus Depot | Virtual Field Trip — KidVision Pre-K
      't3Tt89Td3_8', // London's Buses in action at Stratford Bus Station — The London Transport Droid
    ],
  },
  {
    id: 'train',
    nameArabic: 'قطار',
    emoji: '🚂',
    soundCue: 'تشو تشو!',
    soundAudioUrl: '/sounds/transport-train.mp3',
    imageUrl: '/transport/train.jpg',
    coPlayTip: 'امسكوا بكتاف بعض واعملوا قطار بالبيت، امشوا شوي شوي وبعدين أسرع وقولوا: تشو تشو!',
    videos: [
      'f9HxtqFVXV0', // LOW STIMULATION Trains for Toddlers — Kids Quiet Corner
      'Ty8uibvScnk', // TRAIN | Trains For Kids — Things That Go TV!
      '9x8SkBakj8I', // THE FLAM RAILWAY | Trains For Kids — Things That Go TV!
      'Ae_17XhWDMI', // Trains, metro and trams for kids 4K (Berlin) — Alexander
      'xVMsAgHy_IY', // California Trains! 1 Hour, 150+ Trains! — CoasterFan2105
    ],
  },
  {
    id: 'airplane',
    nameArabic: 'طيارة',
    emoji: '✈️',
    soundCue: 'ززززوووم!',
    soundAudioUrl: '/sounds/transport-airplane.mp3',
    imageUrl: '/transport/airplane.jpg',
    coPlayTip: 'افتحوا إيديكم متل جناحات الطيارة وطيروا سوا بالغرفة وقولوا: ززززوووم! ولما تشوفوا طيارة بالسما أشّروا عليها.',
    videos: [
      'rR74W4SnRf0', // LOW STIMULATION Planes for Toddlers — Kids Quiet Corner
      '6WQ4aOV9aS8', // AIRPLANES | Aircraft For Kids — Things That Go TV!
      'e6aOJSMJlEk', // Let's Fly In An Airplane! Caitie's Classroom Field Trips — Super Simple Play with Caitie!
      '04Xa26YOfcw', // (4K) 100 planes landing and take off in 1 HOUR — mylosairplanefan
      'vEVtnS3sqe4', // 30 BIG PLANE TAKEOFFS from ABOVE, Hong Kong — HD Melbourne Aviation
    ],
  },
  {
    id: 'firetruck',
    nameArabic: 'سيارة إطفاء',
    emoji: '🚒',
    soundCue: 'ني نو ني نو!',
    soundAudioUrl: '/sounds/transport-firetruck.mp3',
    imageUrl: '/transport/firetruck.jpg',
    coPlayTip: 'العبوا إنكم إطفائية: امسكوا خرطوم وهمي ورشّوا مي على النار وقولوا: ني نو ني نو! وشو لون سيارة الإطفاء؟ أحمر!',
    videos: [
      'cSQFL1lW97g', // LOW STIMULATION Fire Trucks for Toddlers — Kids Quiet Corner
      'WY1F_gj87VM', // Here Comes A Fire Engine (full length version) — Kids Trucks TV
      'Y0lUEPyEoqw', // Fire Trucks for Children | Truck Tunes for Kids — twentytrucks
      'MDhfKlbkzs4', // Let's Visit The Fire Station | Caitie's Classroom — Super Simple Play with Caitie!
      'Ju1VmyCcxpQ', // #FDNYSmart Virtual Firehouse Tour for Kids — FDNY
    ],
  },
  {
    id: 'tractor',
    nameArabic: 'تراكتور',
    emoji: '🚜',
    soundCue: 'بُت بُت بُت!',
    soundAudioUrl: '/sounds/transport-tractor.mp3',
    imageUrl: '/transport/tractor.jpg',
    coPlayTip: 'اعملوا حالكم بتسوقوا تراكتور بالأرض وقولوا: بُت بُت بُت! واسألوه: شو بيزرع الفلاح؟ قمح، بندورة، خيار!',
    videos: [
      'h_DjDz5G-ak', // 1 Hour of Big Machines For Kids Who LOVE Tractors — Tractor Ted
      '5u5MjifJRLk', // Munchy Crunchy | Tractor Ted Full Episode — Tractor Ted
      '1uXpB_4yDHA', // John Deere Kids | Real Tractors & Farmers at Work — John Deere Kids
      'DgpcC83LjhQ', // Here Comes A Tractor (full length version) — Kids Trucks TV
      'r6R8yoHmqM8', // TRACTOR | Farming Trucks For Kids — Things That Go TV!
    ],
  },
  {
    id: 'boat',
    nameArabic: 'سفينة',
    emoji: '🚢',
    soundCue: 'بوووو!',
    soundAudioUrl: '/sounds/transport-boat.mp3',
    imageUrl: '/transport/boat.jpg',
    coPlayTip: 'وقت الحمّام حطّوا لعبة أو صحن بلاستيك ع المي وخلّوه يعوم متل السفينة وقولوا سوا بصوت غليظ: بوووو!',
    videos: [
      'AnYNgJjBwgY', // LOW STIMULATION Boats & Ships for Toddlers — Kids Quiet Corner
      '_FbYuYPhQjw', // CRUISE SHIP | Boats For Kids — Things That Go TV!
      '-mnqoXMGax4', // TUG BOAT | Boats For Kids — Things That Go TV!
      'O313vLG2Uh8', // Boats Galore! — CoasterFan2105
      'pzEuMeutsec', // Boats for kids | Boat rides at Marina — Handyman Hal
    ],
  },
]
