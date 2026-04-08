export type Property = {
  id: string
  name: string
  tagline: string
  description: string
  location: string
  nightlyRate: number
  bedrooms: number
  baths: number
  /** Lead image (detail page hero); must match galleryUrls[0] */
  imageUrl: string
  /** Additional angles for home cards (swipe / dots); first should match imageUrl */
  galleryUrls: string[]
}

/** Max secondary cards on home after the featured listing; see /properties for the rest */
export const HOME_PREVIEW_SECONDARY_PROPERTY_COUNT = 2

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
    galleryUrls: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
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
    galleryUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80',
    ],
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
    galleryUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80',
    ],
  },
  {
    id: 'villa-bayview',
    name: 'Bayview Retreat',
    tagline: 'Terraces facing the bay and morning coffee with sea air',
    description:
      'Two master suites, plunge pool, and a short walk to a quiet cove beach.',
    location: 'Port Antonio',
    nightlyRate: 380,
    bedrooms: 4,
    baths: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753083-00f18fb6b3ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    ],
  },
]

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id)
}
