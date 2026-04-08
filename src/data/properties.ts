export type Property = {
  id: string
  name: string
  tagline: string
  description: string
  location: string
  nightlyRate: number
  bedrooms: number
  baths: number
  /** Hero / detail image (replace with your CMS or CDN URLs) */
  imageUrl: string
}

export const PROPERTIES: Property[] = [
  {
    id: 'loft-aurora',
    name: 'Aurora Loft',
    tagline: 'Open plan living with skyline views',
    description:
      'Floor-to-ceiling windows, a full kitchen, and a quiet workspace nook. Walking distance to dining and music venues.',
    location: 'Austin, TX',
    nightlyRate: 189,
    bedrooms: 2,
    baths: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  },
  {
    id: 'cabin-ridge',
    name: 'Ridge Cabin',
    tagline: 'Quiet wood retreat, floor-to-ceiling glass',
    description:
      'Wrapped in cedar with a wide deck and mountain light all day. Ideal for small groups who want nature without roughing it.',
    location: 'Asheville, NC',
    nightlyRate: 245,
    bedrooms: 3,
    baths: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
  },
  {
    id: 'studio-harbor',
    name: 'Harbor Studio',
    tagline: 'Compact waterfront stay',
    description:
      'Efficient studio layout with harbor views, in-unit laundry, and fast Wi‑Fi for remote work between sails.',
    location: 'Portland, ME',
    nightlyRate: 132,
    bedrooms: 1,
    baths: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
  },
]

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id)
}
