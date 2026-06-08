import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p001',
    sku: 'MOF-ROS-001',
    name: 'Blanc de Blanc',
    tagline: 'A whisper of white roses',
    description:
      'An opulent arrangement of pure white garden roses, ranunculus, and sweet pea, gathered in a cloud of silk ribbon. The embodiment of refined simplicity.',
    price: 105,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Warm White', 'Blush Pink', 'Black'],
    featured: true,
    aspectClass: 'tall',
  },
  {
    id: 'p002',
    sku: 'MOF-PEO-002',
    name: 'Jardin Secret',
    tagline: 'Garden peonies in full bloom',
    description:
      'Lush coral and blush peonies paired with garden roses and eucalyptus in a sculptural arrangement that radiates abundance and romance.',
    price: 125,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1487530811015-780d8174f23e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Blush Pink', 'Warm White'],
    featured: true,
    aspectClass: 'standard',
  },
  {
    id: 'p003',
    sku: 'MOF-ORC-003',
    name: 'Orchidée Noire',
    tagline: 'Dramatic, dark, unforgettable',
    description:
      'A theatrical cascade of deep burgundy and violet orchids set against charcoal foliage. For those who appreciate the extraordinary.',
    price: 169,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1490750967868-88df5691cc4e?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous'],
    boxColors: ['Black', 'Warm White'],
    aspectClass: 'tall',
  },
  {
    id: 'p004',
    sku: 'MOF-MIX-004',
    name: "L'Aube Dorée",
    tagline: 'The golden hour in bloom',
    description:
      'Champagne spray roses, peach ranunculus, and gilded foliage compose this sun-kissed arrangement — morning light made eternal.',
    price: 85,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1510832198440-a52376950479?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Warm White', 'Blush Pink'],
    aspectClass: 'standard',
  },
  {
    id: 'p005',
    sku: 'MOF-LAV-005',
    name: 'Brume Violette',
    tagline: 'A haze of lavender and lilac',
    description:
      'Wisteria, lilac, and lavender lisianthus drift together in an ethereal arrangement that carries the scent of Provence.',
    price: 109,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196184-84e35138cf62?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Blush Pink', 'Warm White', 'Black'],
    aspectClass: 'wide',
  },
  {
    id: 'p006',
    sku: 'MOF-RED-006',
    name: 'Éclat Cramoisi',
    tagline: 'Passion, distilled',
    description:
      'A bold statement of long-stemmed premium red roses from Ecuador, gathered tightly to create maximum visual impact and depth of colour.',
    price: 149,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1548460562-c8aff87c8b9a?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Black', 'Warm White'],
    featured: true,
    aspectClass: 'tall',
  },
  {
    id: 'p007',
    sku: 'MOF-WIL-007',
    name: 'Sauvage Douce',
    tagline: 'Wildflower dreams',
    description:
      'A free-spirited collection of anemones, sweet William, and foraged greenery — arranged to look as though gathered from a meadow at dawn.',
    price: 75,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1455793148-40401ec7eb3a?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous'],
    boxColors: ['Warm White', 'Blush Pink'],
    aspectClass: 'standard',
  },
  {
    id: 'p008',
    sku: 'MOF-SUN-008',
    name: 'Soleil de Minuit',
    tagline: 'Midnight sun in full glory',
    description:
      'Dramatic sunflowers at their peak, complemented by rust-toned dahlias and copper foliage. A warm, enveloping presence in any room.',
    price: 89,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=900&auto=format&fit=crop&q=80',
    ],
    sizes: ['Classic', 'Voluminous', 'Large'],
    boxColors: ['Warm White', 'Black'],
    aspectClass: 'standard',
  },
];

export const featuredProducts = products.filter((p) => p.featured);
