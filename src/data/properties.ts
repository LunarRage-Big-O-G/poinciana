export type Property = {
  id: string
  name: string
  tagline: string
  location: string
  nightlyRate: number
  bedrooms: number
  baths: number
  /** Spline "React" export URL (ends in .splinecode) — replace with your hosted scenes */
  splineSceneUrl: string
}

/**
 * Demo scenes from Spline public examples. Swap each listing's `splineSceneUrl`
 * in the Spline editor: Export → Code → React → copy the prod URL.
 */
export const PROPERTIES: Property[] = [
  {
    id: 'loft-aurora',
    name: 'Aurora Loft',
    tagline: 'Open plan living with skyline views',
    location: 'Austin, TX',
    nightlyRate: 189,
    bedrooms: 2,
    baths: 2,
    splineSceneUrl:
      'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  },
  {
    id: 'cabin-ridge',
    name: 'Ridge Cabin',
    tagline: 'Quiet wood retreat, floor-to-ceiling glass',
    location: 'Asheville, NC',
    nightlyRate: 245,
    bedrooms: 3,
    baths: 2,
    splineSceneUrl:
      'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  },
  {
    id: 'studio-harbor',
    name: 'Harbor Studio',
    tagline: 'Compact waterfront stay',
    location: 'Portland, ME',
    nightlyRate: 132,
    bedrooms: 1,
    baths: 1,
    splineSceneUrl:
      'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  },
]

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id)
}
