export type Experience = {
  id: string
  name: string
  summary: string
  /** Short line for image cards (scannable, ~60 chars) */
  teaser: string
  /** Hero image for marketing surfaces */
  imageUrl: string
  /** Optional short clip (MP4/WebM) — plays on card hover; host your own in production */
  hoverVideoUrl?: string
  /** Short alt for the card image (scene, not redundant with title) */
  imageAlt: string
  /** Emotional one-liner; modal / secondary use */
  moodLine: string
  /** Short label shown on cards, e.g. "Boat tour" */
  category: string
  /** Human-readable duration for planning */
  duration: string
  priceUsd: number
  /** How the price applies, e.g. "per guest" or "per villa" */
  priceBasis: string
  included: string[]
  goodToKnow: string[]
  cancellationNote: string
}

/** Shown on the home horizontal strip; rest on /experiences */
export const HOME_PREVIEW_EXPERIENCE_COUNT = 3

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-snorkel',
    name: 'Reef snorkel charter',
    teaser: 'Half-day on the water with crew, gear, and calm reef time.',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=85',
    hoverVideoUrl:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    imageAlt: 'Snorkeler floating above a coral reef in clear turquoise water',
    moodLine: 'Morning light on the water—nothing on the agenda.',
    summary:
      'Private half-day charter with captain, snorkel gear, and safety briefing—ideal for calm mornings on the north coast.',
    category: 'On the water',
    duration: 'About 4 hours (morning or afternoon)',
    priceUsd: 85,
    priceBasis: 'per guest (min. 2)',
    included: [
      'Licensed captain and crew',
      'Mask, snorkel, fins, and flotation aids',
      'Cooler with bottled water',
      'Pickup from agreed pier or beach access near your stay',
    ],
    goodToKnow: [
      'Weather-dependent; the operator may reschedule for safety.',
      'Basic swimming ability required. Not suitable for children under 6.',
      'Marine park or mooring fees (if any) are paid locally and shown before you confirm.',
    ],
    cancellationNote:
      'Free cancellation up to 48 hours before the scheduled departure, subject to the operator’s policy at checkout.',
  },
  {
    id: 'exp-spa',
    name: 'In-villa massage',
    teaser: 'A full hour of quiet—therapist, table, and oils at your door.',
    imageUrl:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85',
    hoverVideoUrl:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    imageAlt: 'Spa treatment room with massage table, soft towels, and warm light',
    moodLine: 'Stillness that meets you without leaving the villa.',
    summary:
      'Licensed therapist comes to your residence—sixty-minute treatment with linens and oils supplied.',
    category: 'Wellness',
    duration: '60 minutes treatment (+ setup time)',
    priceUsd: 120,
    priceBasis: 'per session (1 guest)',
    included: [
      'Licensed massage therapist',
      'Portable table, linens, and professional-grade oils',
      'Scheduling coordinated with your check-in details',
    ],
    goodToKnow: [
      'Please provide a quiet, private space with room for the table.',
      'Disclose health conditions or pregnancy when booking.',
      'Additional sessions or couples bookings are quoted separately.',
    ],
    cancellationNote:
      'Cancel or reschedule before 6:00 PM the day prior for no charge, where the partner allows—final terms appear at checkout.',
  },
  {
    id: 'exp-dunns',
    name: "Dunn's River Falls",
    teaser: 'Guided climb, park entry, and rides from your stay.',
    imageUrl:
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=85',
    hoverVideoUrl:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    imageAlt: 'Tropical waterfall cascading over mossy rocks in lush forest',
    moodLine: 'Cool stone underfoot, green canopy overhead.',
    summary:
      'Guided climb with park entry and round-trip transport—one of Jamaica’s most visited natural landmarks.',
    category: 'Landmarks & nature',
    duration: 'Half day (typically 5–6 hours including travel)',
    priceUsd: 65,
    priceBasis: 'per guest',
    included: [
      'Park admission',
      'Certified guide for the falls climb',
      'Hotel or villa pickup and drop-off in zone covered by the operator',
      'Locker access where available',
    ],
    goodToKnow: [
      'Wear water shoes; surfaces are wet and uneven.',
      'Expect crowds in peak season; early slots are usually quieter.',
      'Some add-ons (photos, food) are optional and paid on site.',
    ],
    cancellationNote:
      'Cancel at least 24 hours before pickup for a full refund of the Poinciana package fee, unless otherwise stated at checkout.',
  },
  {
    id: 'exp-rum',
    name: 'Rum & culture tasting',
    teaser: 'Distillery visit, tasting flight, and island stories.',
    imageUrl:
      'https://images.unsplash.com/photo-1514362540857-3bc16c3d6c61?w=1600&q=85',
    hoverVideoUrl:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    imageAlt: 'Amber rum in glasses on a wooden bar in warm light',
    moodLine: 'Slow pours, laughter, and the island’s story in a glass.',
    summary:
      'Small-group distillery visit with tasting flight and light pairing—great introduction to Jamaican rum heritage.',
    category: 'Food & culture',
    duration: 'About 3 hours',
    priceUsd: 55,
    priceBasis: 'per guest',
    included: [
      'Hosted tasting with staff explanation',
      'Flight of curated rums',
      'Small plates paired to the tasting',
      'Round-trip transport from standard pickup zones',
    ],
    goodToKnow: [
      'Guests must be 18+ with valid ID.',
      'Menu may vary; disclose allergies when you book.',
      'Schedule is fixed; late arrivals may miss part of the experience.',
    ],
    cancellationNote:
      '48-hour notice for a full refund on experiences booked through Poinciana, per partner terms shown before payment.',
  },
]

export function getExperienceById(id: string): Experience | undefined {
  return EXPERIENCES.find((e) => e.id === id)
}
