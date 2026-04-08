import { queryOptions } from '@tanstack/react-query'
import { EXPERIENCES } from '../data/experiences'
import {
  PROPERTIES,
  getPropertyById,
  type Property,
} from '../data/properties'

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  await delay(200)
  const found = getPropertyById(id)
  return found ?? null
}

export function propertyByIdQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id),
  })
}

export function propertyListQueryOptions() {
  return queryOptions({
    queryKey: ['properties'],
    queryFn: async () => {
      await delay(160)
      return PROPERTIES
    },
  })
}

export function experienceListQueryOptions() {
  return queryOptions({
    queryKey: ['experiences'],
    queryFn: async () => {
      await delay(120)
      return EXPERIENCES
    },
  })
}
