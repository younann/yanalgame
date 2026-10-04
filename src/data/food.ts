import type { Item } from './types'

// Photo credits: CREDITS.md
export const ITEMS: Item[] = [
  {
    id: 'apple',
    nameArabic: 'تفاحة',
    emoji: '🍎',
    soundCue: 'تفاحة!',
    imageUrl: '/food/apple.jpg',
    coPlayTip: 'جيبوا تفاحة حقيقية وخلّوا طفلكم يمسكها ويشمّها، واسألوه: شو لونها؟ حمرا!',
    videos: [
      'UWLmEh1HIBw', // APPLE | How Does it Grow? — TRUE FOOD TV
      '66yQwR9OE4I', // Apples: From Farm to Table — Farm & Food Care
      'XfYP101XXx0', // Visiting an Apple Orchard — Maryland Farm & Harvest
      'yZ-VOwA7dxc', // How to Pick Apples... the right way! — Wilson's Orchard & Farm
      '5A9p26ITUeM', // How to Harvest, Store and Process Apples — GrowVeg
    ],
  },
  {
    id: 'banana',
    nameArabic: 'موزة',
    emoji: '🍌',
    soundCue: 'موزة!',
    imageUrl: '/food/banana.jpg',
    coPlayTip: 'قشّروا موزة سوا شوي شوي وخلّوا طفلكم يساعد، وقولوا: يمّ يمّ موزة صفرا!',
    videos: [
      '_l7sak6Vlq8', // DOLE - Harvesting Bananas — DoleTube
      'uRPVDzgaIbA', // Dole - How do bananas grow? — DoleTube
      'SgFKfVfghpg', // How Do Bananas Grow and End Up in the Store? — Inside Edition
      '9ru29L97MYE', // Where Do Bananas Come From? — SciShow Kids
      'uMEiyEv-Y5o', // Australian Bananas Farm to Table Education Video for Kids — AustralianBananas
    ],
  },
  {
    id: 'milk',
    nameArabic: 'حليب',
    emoji: '🥛',
    soundCue: 'حليب!',
    imageUrl: '/food/milk.jpg',
    coPlayTip: 'وأنتو بتشربوا حليب سوا، قولوا: الحليب من البقرة، مووو! وخلّوا طفلكم يقلّد البقرة.',
    videos: [
      '1LEGl6SF4Jc', // Follow Milk's Journey from Farm to Store — Midwest Dairy
      'Qt8SqUB386k', // Milk's Journey From Farm to Table — Nevada Dairy Farmers
      '-qYYLZfkNyY', // The Process of Milk Production: From Cow to Carton — Ontario Dairy Education
      '5fEnWkCF6bg', // How 100% Canadian milk gets from farm to table? — Dairy Farmers of Canada
      'vfX0-boEgZk', // Dairy Cows Pt. 2: Milking the Cows — Farms For City Kids Foundation
    ],
  },
  {
    id: 'bread',
    nameArabic: 'خبز',
    emoji: '🍞',
    soundCue: 'خبز!',
    imageUrl: '/food/bread.jpg',
    coPlayTip: 'اعجنوا عجينة صغيرة سوا (أو صلصال) وخلّوا طفلكم يطبطب عليها ويعمل رغيف متل خبز الطابون.',
    videos: [
      'GDxxxmtBl58', // Baking bread in Palestine — bmindelicato
      'fF3FL4sKNdI', // Palestinian Traditional Cuisine Taboon Oven and bread — m76gmm
      'cJIC7oin8Hk', // Baking Fresh Bread in Palestine — Shayma Hmedat
      '7PUsVyM6_Cg', // Lebanese Bread Bakery in the United States: How It's Made — Anthony Rahayel
      '69TIDEQJu_k', // PITTA BREAD | How It's Made — Discovery UK
    ],
  },
  {
    id: 'orange',
    nameArabic: 'برتقانة',
    emoji: '🍊',
    soundCue: 'برتقانة!',
    imageUrl: '/food/orange.jpg',
    coPlayTip: 'دحرجوا برتقانة على الأرض لبعض متل الطابة، وبعدين قشّروها سوا وشمّوا ريحتها الحلوة.',
    videos: [
      'Pmql-zeRJqM', // ORANGE | How Does it Grow? — TRUE FOOD TV
      'K1TjRSV1e_M', // Oranges - Harvesting — Florida Department of Agriculture
      'YurFUFnwf4o', // These Orange Groves Are a Feast for the Eyes — Smithsonian Channel
      'AH2ruIbOp2U', // California Navel Oranges — America's Heartland
    ],
  },
  {
    id: 'watermelon',
    nameArabic: 'بطيخ',
    emoji: '🍉',
    soundCue: 'بطيخ!',
    imageUrl: '/food/watermelon.jpg',
    coPlayTip: 'دقّوا على البطيخة سوا: طق طق! وبعدين عدّوا البزر الأسود بشقفة البطيخ.',
    videos: [
      'hoL1JnxH-2w', // How Watermelons are Harvested — Maryland Farm & Harvest
      'KNoPwKT8rVQ', // Growing Watermelon Plant Time Lapse - Seed to Fruit — eLapse
      'I8XNCGLNhHc', // Watermelon Farmers — America's Heartland
      'GFaRoRZmzBo', // From the Ground Up - Growing Watermelons — VirginiaFarmBureau
      'hMPG2GqO6ZY', // Florida Watermelon Harvest — Field Rows
    ],
  },
  {
    id: 'egg',
    nameArabic: 'بيضة',
    emoji: '🥚',
    soundCue: 'بيضة!',
    imageUrl: '/food/egg.jpg',
    coPlayTip: 'قلّدوا الجاجة سوا: بق بق بقاق! وخبّوا بيضة (بلاستيك أو مسلوقة) وخلّوا طفلكم يدوّر عليها.',
    videos: [
      'ozMPRSZ8Ykk', // How an Egg Hatches — Nature on PBS
      'q9Ui3EFFV-g', // This Mother Hen Talks To Her Eggs – And They Chirp Back! — BBC Earth
      'F38tIGO5TFY', // Baby Chick Hatching | Egg Hatching — Birdy Official
      '1mGgj-F8pvc', // Hatching Eggs - Chicks / Chickens - Time lapse Video — Organic Productions
      'JR4SrNNkMtQ', // BC Egg - Free-Range Barn Tour — BC Egg
    ],
  },
  {
    id: 'strawberry',
    nameArabic: 'فراولة',
    emoji: '🍓',
    soundCue: 'فراولة!',
    imageUrl: '/food/strawberry.jpg',
    coPlayTip: 'عدّوا حبات الفراولة سوا: وحدة، تنتين، تلاتة! وخلّوا طفلكم يحط كل حبة بالصحن.',
    videos: [
      '0V1vPC2ir4Y', // STRAWBERRY | How Does it Grow? — TRUE FOOD TV
      'QzMYnxhlbcc', // Sweet Strawberries: how do they grow? — Eat Happy Project
      'HABzhzcm_pg', // STRAWBERRY From Seed Time-lapse 160 Days — Boxlapse
      'xhR7I0ipbSM', // How to Grow Strawberries from Planting to Harvest — GrowVeg
    ],
  },
]
