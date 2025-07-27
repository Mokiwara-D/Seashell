import { useQuery } from '@tanstack/react-query'
import { fetchDestinations } from '../queries'
import type { DestinationData, QueryOptions } from '../types'

const useDestinationData = (options?: QueryOptions) => {
  return useQuery<DestinationData[]>({
    queryKey: ['available-destinations'],
    queryFn: fetchDestinations,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 35 * 60 * 1000, // 35 minutes
    retry: 1,
    throwOnError: false,
    ...options,
  })
}

export { useDestinationData, type DestinationData as RawDestination }
