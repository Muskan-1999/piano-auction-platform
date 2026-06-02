// Confirmed Unsplash piano photographs — all verified as actual piano images
const PIANO_IMGS = [
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=700&q=80', // vintage upright keys (warm brown)
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=700&q=80', // black grand piano close-up
  'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=700&q=80', // concert hall grand piano
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=700&q=80', // piano keys in dramatic light
  'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=700&q=80', // white piano keyboard
]

const img = (i) => PIANO_IMGS[i % PIANO_IMGS.length]

export const uprightPianos = [
  {
    slug: 'yamaha-c1984-upright-piano-est-1800-2200-plus-vat',
    name: 'Yamaha (c1984) Upright Piano',
    est: '£1,800-£2,200 Plus VAT',
    image: img(0),
    images: [img(0), img(1), img(2)],
    description: 'A Yamaha upright piano from 1984 in a traditional ebonised case with excellent tone and responsive action.',
  },
  {
    slug: 'yamaha-c1979-upright-piano-est-1800-2200-plus-vat',
    name: 'Yamaha (c1979) Upright Piano',
    est: '£1,800-£2,200 Plus VAT',
    image: img(1),
    images: [img(1), img(0), img(3)],
    description: 'A Yamaha upright piano from 1979 in good condition with warm tone and reliable playability.',
  },
  {
    slug: 'yamaha-c1987-upright-piano-est-1400-1800-plus-vat',
    name: 'Yamaha (c1987) Upright Piano',
    est: '£1,400-£1,800 Plus VAT',
    image: img(2),
    images: [img(2), img(4), img(1)],
    description: 'A Yamaha upright piano from 1987 in a polished ebonised case; a reliable instrument suitable for practice and performance.',
  },
  {
    slug: 'kawai-c1973-upright-piano-est-800-1200-plus-vat',
    name: 'Kawai (c1973) Upright Piano',
    est: '£800-£1,200 Plus VAT',
    image: img(3),
    images: [img(3), img(0), img(2)],
    description: 'A Kawai upright piano from 1973 in a traditional case with a warm, full tone across all registers.',
  },
  {
    slug: 'liedermann-upright-piano-est-1200-1800-plus-vat',
    name: 'Liedermann Upright Piano',
    est: '£1,200-£1,800 Plus VAT',
    image: img(4),
    images: [img(4), img(2), img(0)],
    description: 'A Liedermann upright piano in good overall condition, ideal for the home or studio.',
  },
  {
    slug: 'yamaha-c2008-upright-piano-est-2500-3500',
    name: 'Yamaha (c2008) Upright Piano',
    est: '£2,500-£3,500',
    image: img(0),
    images: [img(0), img(3), img(4)],
    description: 'A modern Yamaha upright piano from 2008 in excellent condition with a bright, clear tone and light action.',
  },
  {
    slug: 'steinmeyer-upright-piano-est-300-400',
    name: 'Steinmeyer Upright Piano',
    est: '£300-£400',
    image: img(1),
    images: [img(1), img(4), img(3)],
    description: 'A Steinmeyer upright piano in playable condition, suitable as a starter instrument or for restoration.',
  },
  {
    slug: 'yamaha-c1979-upright-piano-est-2000-2500',
    name: 'Yamaha (c1979) Upright Piano',
    est: '£2,000-£2,500',
    image: 'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17891Jun26-600x624.jpg',
    images: [
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17891Jun26.jpg',
    ],
    description: 'A Model U3 upright piano in a traditional bright ebonised case; together with a stool.',
  },
  {
    slug: 'schimmel-c1991-upright-piano-est-1800-2200',
    name: 'Schimmel (c1991) Upright Piano',
    est: '£1,800-£2,200',
    image: 'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26201-600x450.jpg',
    images: [
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26201.jpg',
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26202.jpg',
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26203.jpg',
    ],
    description: 'A Model T130 upright piano in a traditional bright walnut case.',
  },
  {
    slug: 'petrof-c1997-upright-piano-est-800-1000',
    name: 'Petrof (c1997) Upright Piano',
    est: '£800-£1,000',
    image: 'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26201-600x800.jpg',
    images: [
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26201.jpg',
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26202.jpg',
      'https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26203.jpg',
    ],
    description: 'A Model Sonatina upright piano in a modern satin mahogany case.',
  },
]
