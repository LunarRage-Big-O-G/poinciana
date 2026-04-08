export type Experience = {
  id: string
  name: string
  summary: string
  priceUsd: number
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-snorkel',
    name: 'Reef snorkel charter',
    summary: 'Half-day boat trip with gear and guide.',
    priceUsd: 85,
  },
  {
    id: 'exp-dunns',
    name: "Dunn's River Falls",
    summary: 'Guided climb and park access with hotel pickup.',
    priceUsd: 65,
  },
  {
    id: 'exp-rum',
    name: 'Rum & culture tasting',
    summary: 'Local distillery visit and paired small plates.',
    priceUsd: 55,
  },
  {
    id: 'exp-spa',
    name: 'In-villa massage',
    summary: 'Sixty-minute treatment, scheduled around your stay.',
    priceUsd: 120,
  },
]
