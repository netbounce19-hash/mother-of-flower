import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p001',
    sku: 'MOF-RED-OBS',
    name: 'Red Obsession',
    tagline: 'Vibrant red roses in a signature white box',
    description:
      'A dramatic statement of passion. Dozens of premium, velvety red roses gathered tightly in our signature white cylindrical box, accented with a rich red satin ribbon.',
    price: 100,
    currency: 'USD',
    images: [
      '/images/red_obsession.png',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Warm White', 'Blush Pink', 'Black'],
    featured: true,
    aspectClass: 'tall',
  },
  {
    id: 'p002',
    sku: 'MOF-VAN-BLU',
    name: 'Vanilla Blush',
    tagline: 'Blush pink peonies and vanilla cream roses',
    description:
      'Lush pink peonies, soft cream garden roses, and delicate hydrangeas compose this romantic arrangement. Nestled in a premium lavender suede round box with a satin bow.',
    price: 100,
    currency: 'USD',
    images: [
      '/images/vanilla_blush.png',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Blush Pink', 'Warm White'],
    featured: true,
    aspectClass: 'standard',
  },
  {
    id: 'p003',
    sku: 'MOF-PIN-SYM',
    name: 'Pink Symphony',
    tagline: 'A harmony of pink roses and white alstroemerias',
    description:
      'A vibrant wrapped bouquet of delicate pink garden roses, white alstroemerias, and deep red carnations wrapped in soft pink textured paper.',
    price: 100,
    currency: 'USD',
    images: [
      '/images/pink_symphony.png',
    ],
    sizes: ['Classic', 'Voluminous'],
    boxColors: ['Warm White', 'Blush Pink'],
    aspectClass: 'tall',
  },
  {
    id: 'p004',
    sku: 'MOF-CRE-CLO',
    name: 'Cream Cloud',
    tagline: "White hydrangeas and baby's breath basket",
    description:
      "An ethereal and airy arrangement of pure white hydrangeas and clouds of delicate baby's breath, presented in a hand-woven wicker basket with satin ribbons.",
    price: 100,
    currency: 'USD',
    images: [
      '/images/cream_cloud.png',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Warm White', 'Blush Pink'],
    aspectClass: 'standard',
  },
  {
    id: 'p005',
    sku: 'MOF-PRO-005',
    name: 'Promise',
    tagline: 'Pure white roses in clean white wrapping',
    description:
      "The absolute classic. High-end long-stemmed white garden roses, accented with fresh baby's breath and eucalyptus, elegantly wrapped in crisp white paper with a gold ribbon.",
    price: 200,
    currency: 'USD',
    images: [
      '/images/promise.png',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Blush Pink', 'Warm White', 'Black'],
    featured: true,
    aspectClass: 'wide',
  },
  {
    id: 'p006',
    sku: 'MOF-LAV-SYM',
    name: 'Lavender Symphony',
    tagline: 'Lilac wisteria and yellow garden blooms',
    description:
      'An abundance of spring color. Purple lavender, lilac wisteria, pink carnations, and bright yellow garden ranunculus in a lavender velvet round box.',
    price: 100,
    currency: 'USD',
    images: [
      '/images/lavender_symphony.png',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Black', 'Warm White'],
    aspectClass: 'tall',
  },
  {
    id: 'p007',
    sku: 'MOF-BLU-HAR',
    name: 'Blush Harmony',
    tagline: 'Peach ranunculus and white roses wrapped in pink',
    description:
      'A soft, peaceful collection of peach ranunculus, garden white roses, and lilac blossoms wrapped in textured pink wrapping paper.',
    price: 100,
    currency: 'USD',
    images: [
      '/images/blush_harmony.png',
    ],
    sizes: ['Classic', 'Voluminous'],
    boxColors: ['Warm White', 'Blush Pink'],
    aspectClass: 'standard',
  },
  {
    id: 'p008',
    sku: 'MOF-CHA-DRE',
    name: 'Champagne Dream',
    tagline: 'Champagne spray roses and gold roses',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    price: 100,
    currency: 'USD',
    images: [
      '/images/champagne_dream.png',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Warm White', 'Black'],
    aspectClass: 'standard',
  },
];

export const featuredProducts = products.filter((p) => p.featured);
