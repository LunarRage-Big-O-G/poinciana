export type Property = {
  id: string
  name: string
  tagline: string
  description: string
  location: string
  nightlyRate: number
  bedrooms: number
  baths: number
  imageUrl: string
}

export const PROPERTIES: Property[] = [
  {
    id: 'villa-cove',
    name: 'Cove House',
    tagline: 'Cliffside pool and sunset views',
    description:
      'Three suites, outdoor kitchen, and direct water access. Housekeeping every other day.',
    location: 'Ocho Rios',
    nightlyRate: 420,
    bedrooms: 3,
    baths: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  },
  {
    id: 'estate-garden',
    name: 'Garden Estate',
    tagline: 'Wide lawns and a quiet guest cottage',
    description:
      'Main house plus cottage, ideal for two families. Full kitchen and shaded terraces.',
    location: 'Montego Bay',
    nightlyRate: 510,
    bedrooms: 5,
    baths: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  },
  {
    id: 'bungalow-lagoon',
    name: 'Lagoon Bungalow',
    tagline: 'Dock and glass walls over the water',
    description:
      'One-level layout with kayaks included. Perfect for a longer stay with remote work.',
    location: 'Negril',
    nightlyRate: 295,
    bedrooms: 2,
    baths: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  },
]

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id)
}
