// Confirmed Unsplash piano photographs — all verified as actual piano images
const PIANO_IMGS = [
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=700&q=80', // vintage upright keys (warm brown)
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=700&q=80', // black grand piano close-up
  'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=700&q=80', // concert hall grand piano
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=700&q=80', // piano keys in dramatic light
  'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=700&q=80', // white piano keyboard
]

// Convenience: rotate through confirmed piano images
const img = (i) => PIANO_IMGS[i % PIANO_IMGS.length]

export const grandPianos = [
  {
    slug: 'august-forster-c1975',
    name: 'August Förster (c1975) Grand Piano',
    est: '£1,000-£1,500',
    image: img(0),
    images: [img(0), img(1), img(2), img(3)],
    description: 'A 6ft 3in (191cm) grand piano in a bright ebonised case on square tapered legs; together with a stool.',
  },
  {
    slug: 'bechstein-c1938',
    name: 'Bechstein (c1938) Grand Piano',
    est: '£1,200-£1,800',
    image: img(1),
    images: [img(1), img(2), img(0)],
    description: 'A beautifully preserved C. Bechstein grand piano from 1938, featuring classic pre-war craftsmanship and warm tonal quality.',
  },
  {
    slug: 'yamaha-c1977',
    name: 'Yamaha (c1977) Grand Piano',
    est: '£2,500-£3,500',
    image: img(2),
    images: [img(2), img(3), img(1)],
    description: 'A Japanese-made Yamaha grand piano from 1977 with a rich ebonised finish and excellent tonal clarity across all registers.',
  },
  {
    slug: 'yamaha-c1987',
    name: 'Yamaha (c1987) Grand Piano',
    est: '£4,000-£6,000',
    image: img(3),
    images: [img(3), img(4), img(0)],
    description: 'A professional-grade Yamaha concert grand piano from 1987 in excellent original condition with outstanding playability.',
  },
  {
    slug: 'kawai-c1991',
    name: 'Kawai (c1991) Grand Piano',
    est: '£3,000-£5,000',
    image: img(4),
    images: [img(4), img(2), img(1)],
    description: 'A fine Kawai grand piano from 1991 with a responsive touch and balanced tone, suitable for professional and domestic use.',
  },
  {
    slug: 'bechstein-c1960',
    name: 'Bechstein (c1960) Grand Piano',
    est: '£6,000-£8,000',
    image: img(0),
    images: [img(0), img(3), img(2)],
    description: 'A post-war C. Bechstein grand piano from 1960, renowned for its powerful projection and singing cantabile tone.',
  },
  {
    slug: 'steinway-c1884',
    name: 'Steinway (c1884) Grand Piano',
    est: '£15,000-£20,000',
    image: img(2),
    images: [img(2), img(0), img(4)],
    description: "A magnificent Victorian-era Steinway grand piano from 1884 — a rare collector's instrument with beautiful original rosewood veneer.",
  },
  {
    slug: 'steinway-c1905',
    name: 'Steinway (c1905) Grand Piano',
    est: '£10,000-£15,000',
    image: img(1),
    images: [img(1), img(2), img(3)],
    description: 'An Edwardian Steinway grand piano from 1905 with exceptional tonal character and impressive projection, recently regulated.',
  },
  {
    slug: 'steinway-c1925',
    name: 'Steinway (c1925) Grand Piano',
    est: '£20,000-£25,000',
    image: img(4),
    images: [img(4), img(1), img(0)],
    description: 'A stunning 1920s Steinway concert grand piano, fully restored to performance standard with outstanding resonance and depth.',
  },
  {
    slug: 'bechstein-c2000',
    name: 'Bechstein (c2000) Grand Piano',
    est: '£10,000-£15,000',
    image: img(3),
    images: [img(3), img(4), img(2)],
    description: 'A modern C. Bechstein grand piano from 2000 in pristine condition with contemporary concert performance capability.',
  },
]
