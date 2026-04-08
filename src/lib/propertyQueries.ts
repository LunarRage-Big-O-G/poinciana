import { queryOptions } from '@tanstack/react-query'
import {
  PROPERTIES,
  getPropertyById,
  type Property,
} from '../data/properties'

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

/** Simulates an agency API; replace with fetch('/api/properties/:id') */
export async function fetchPropertyById(id: string): Promise<Property | null> {
  await delay(280)
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
      await delay(200)
      return PROPERTIES
    },
  })
}
