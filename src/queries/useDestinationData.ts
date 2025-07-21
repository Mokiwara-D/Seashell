import { useQuery } from '@tanstack/react-query'
import { fetchAvailableDestinations } from './graphql'
import type { RawDestination, QueryOptions } from './types'

const useDestinationData = (options?: QueryOptions) => {
  return useQuery<RawDestination[]>({
    queryKey: ['available-destinations'],
    queryFn: fetchAvailableDestinations,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 35 * 60 * 1000, // 35 minutes
    retry: 1,
    throwOnError: false,
    ...options,
  })
}

export { useDestinationData, type RawDestination }