import { useInfiniteQuery } from '@tanstack/react-query'
import { graphqlClient } from '../client'
import type { GraphQLQuery } from '../types'
import { useMemo } from 'react'

// Response types for holidays query
export interface HolidayOffer {
  id: string
  price_per_person: number
  accommodation: {
    id: number
    name: string
    rating: number
    trip_advisor_rating: number
    trip_advisor_num_reviews: number
    images: {
      id: string
      url: string
    }[]
    resort: {
      id: number
      name: string
      regions: {
        id: number
        name: string
        destinations: {
          id: number
          name: string
        }[]
      }[]
    }
  }
}

export interface HolidaysResponse {
  offers: {
    result: HolidayOffer[]
    count: number
    min_price_per_person: number
    error?: {
      message: string
    }
  }
}

// Holiday query variables interface
interface HolidayQueryVariables extends Record<string, unknown> {
  rooms?: string[]
  duration?: number
  departure_points?: string[]
  boards?: number[]
  ratings?: number[]
  trip_ratings?: number[]
  destinations?: number[]
  regions?: number[]
  resorts?: number[]
  trip_type?: number
  accommodation_id?: number | null
  departure_date?: string | null
  departure_date_type?: number
  client_list_id?: number
  fav_accommodations?: number[]
  start_index?: number
  sort?: number
  take?: number
  max_price?: number
}

const ITEMS_PER_PAGE = 8

// Build holidays query with variables
const buildHolidaysQuery = (
  variables: HolidayQueryVariables
): GraphQLQuery => ({
  query: `
    query holidays(
      $rooms: [String]
      $duration: Int
      $departure_points: [String]
      $boards: [Int]
      $ratings: [Int]
      $trip_ratings: [Float]
      $destinations: [Int]
      $regions: [Int]
      $resorts: [Int]
      $trip_type: Int
      $accommodation_id: Int
      $departure_date: String
      $departure_date_type: Int
      $client_list_id: Int
      $fav_accommodations: [Int]
      $start_index: Int
      $sort: Int
      $take: Int
      $max_price: Float
    ) {
      offers(
        rooms: $rooms
        duration: $duration
        departure_points: $departure_points
        destinations: $destinations
        regions: $regions
        resorts: $resorts
        ratings: $ratings
        trip_ratings: $trip_ratings
        boards: $boards
        departure_date: $departure_date
        departure_date_type: $departure_date_type
        client_sort_list_id: $client_list_id
        trip_type: $trip_type
        fav_accommodations: $fav_accommodations
        accommodation_id: $accommodation_id
        start_index: $start_index
        sort: $sort
        take: $take
        max_price: $max_price
      ) {
        result {
          id
          price_per_person
          accommodation{
            id
            name
            rating
            trip_advisor_rating
            trip_advisor_num_reviews
            images{
              id
              url
            }
            resort{
              id
              name
              regions{
                id
                name
                destinations{
                  id
                  name
                }
              }
            }
          }
        }
        count
        min_price_per_person
        error {
          ... on Unexpected_Error {
            message
          }
        }
      }
    }
  `,
  variables,
  operationName: 'holidays',
})

// Fetch function for infinite query
async function fetchHolidaysPage(
  destinationId: number,
  filterVariables: HolidayQueryVariables,
  pageParam: number = 0
): Promise<HolidaysResponse> {
  const variables = {
    ...filterVariables,
    destinations: [destinationId],
    start_index: pageParam,
    take: ITEMS_PER_PAGE,
  }

  const result = await graphqlClient.request<HolidaysResponse>(
    buildHolidaysQuery(variables)
  )

  return result
}

export interface UseHolidaysInfiniteQueryOptions {
  enabled?: boolean
  staleTime?: number
  gcTime?: number
  keepPreviousData?: boolean
}

export function useHolidaysInfiniteQuery(
  destinationId: number,
  filterVariables: HolidayQueryVariables,
  activeFilters: string[] = [],
  options: UseHolidaysInfiniteQueryOptions = {}
) {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000,
    gcTime = 10 * 60 * 1000,
    keepPreviousData = false,
  } = options

  // Create stable query key - use object structure for better cache management
  const queryKey = useMemo(
    () => [
      'holidays',
      {
        destinationId,
        filters: activeFilters.sort().join(','), // Simpler string join
        variables: filterVariables,
      },
    ],
    [destinationId, activeFilters, filterVariables]
  )

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      fetchHolidaysPage(destinationId, filterVariables, pageParam),
    enabled: enabled && destinationId > 0,
    staleTime,
    gcTime,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    initialPageParam: 0,
    placeholderData: keepPreviousData ? (prev) => prev : undefined,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalFetched = allPages.reduce(
        (total, page) => total + (page.offers.result?.length || 0),
        0
      )
      const totalAvailable = lastPage.offers.count || 0

      // Stop if we've fetched all available items
      if (totalFetched >= totalAvailable) {
        return undefined
      }

      // Calculate next page start index
      return lastPageParam + ITEMS_PER_PAGE
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      return firstPageParam > 0
        ? Math.max(0, firstPageParam - ITEMS_PER_PAGE)
        : undefined
    },
  })

  // Flatten data for easier consumption
  const holidays = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.offers.result || []) || []
  }, [query.data])

  const totalCount = query.data?.pages[0]?.offers.count || 0
  const loadedCount = holidays.length

  // Check if more items can be loaded
  const canLoadMore = loadedCount < totalCount && totalCount > 0

  // Check if all items are loaded for carousel loop
  const allItemsLoaded = loadedCount >= totalCount && totalCount > 0

  return {
    ...query,
    holidays,
    totalCount,
    loadedCount,
    canLoadMore,
    allItemsLoaded,
  }
}
