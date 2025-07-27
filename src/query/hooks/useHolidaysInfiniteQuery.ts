import {
  useInfiniteQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { graphqlClient } from '../client'
import type { GraphQLQuery } from '../types'
import { useMemo, useEffect } from 'react'

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
  _metadata?: {
    originalShortfall: number
    compensated: boolean
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

// Fetch function for infinite query with gap-filling logic
async function fetchHolidaysPage(
  destinationId: number,
  destinationName: string,
  filterVariables: HolidayQueryVariables,
  pageParam: number = 0
): Promise<HolidaysResponse & { destinationName: string }> {
  const variables = {
    ...filterVariables,
    destinations: [destinationId],
    start_index: pageParam,
    take: ITEMS_PER_PAGE,
  }

  // Make initial request
  const result = await graphqlClient.request<HolidaysResponse>(
    buildHolidaysQuery(variables)
  )

  const initialResults = result.offers.result || []
  const totalAvailable = result.offers.count || 0
  const receivedCount = initialResults.length
  const requestedCount = ITEMS_PER_PAGE

  // Check if we got fewer results than requested AND there are more results available
  const shortfall = requestedCount - receivedCount
  const nextAvailablePosition = pageParam + requestedCount // Skip ahead to avoid duplicates
  const remainingAfterSkip = Math.max(0, totalAvailable - nextAvailablePosition)

  // Only attempt compensation if total is larger than our page size AND there are results to compensate with
  const shouldFetchMore =
    shortfall > 0 && remainingAfterSkip > 0 && totalAvailable > ITEMS_PER_PAGE

  if (shouldFetchMore) {
    // Calculate how many additional results to request from the next clean position
    const additionalToRequest = Math.min(shortfall, remainingAfterSkip)

    console.info('Detected page shortfall, fetching compensation results:', {
      requested: requestedCount,
      received: receivedCount,
      shortfall: shortfall,
      compensationRequesting: additionalToRequest,
      compensationStartIndex: nextAvailablePosition,
      totalAvailable: totalAvailable,
    })

    try {
      // Make follow-up request for compensation results from further ahead
      const additionalVariables = {
        ...filterVariables,
        destinations: [destinationId],
        start_index: nextAvailablePosition,
        take: additionalToRequest,
      }

      const additionalResult = await graphqlClient.request<HolidaysResponse>(
        buildHolidaysQuery(additionalVariables)
      )

      const additionalResults = additionalResult.offers.result || []

      // Combine initial and additional results (no duplicates since we fetched from ahead)
      const combinedResults = [...initialResults, ...additionalResults]

      console.info('Successfully fetched compensation results:', {
        initialCount: initialResults.length,
        compensationCount: additionalResults.length,
        finalCount: combinedResults.length,
        originalShortfall: shortfall,
        compensated: additionalResults.length,
      })

      // Return combined response
      return {
        offers: {
          ...result.offers,
          result: combinedResults,
        },
        // Add metadata about the shortfall for accurate tracking
        _metadata: {
          originalShortfall: shortfall,
          compensated: additionalResults.length > 0,
        },
        destinationName,
      }
    } catch (error) {
      console.warn(
        'Failed to fetch compensation results, using original response:',
        error
      )
      // Return original result with shortfall metadata if follow-up fails
      return {
        ...result,
        _metadata: {
          originalShortfall: shortfall,
          compensated: false,
        },
        destinationName,
      }
    }
  }

  // For small datasets or uncompensatable shortfalls, calculate realistic shortfall
  let actualShortfall = shortfall
  if (totalAvailable <= ITEMS_PER_PAGE) {
    // For small datasets, shortfall should be based on realistic expectations
    const maxPossibleForThisPage = Math.min(
      ITEMS_PER_PAGE,
      totalAvailable - pageParam
    )
    actualShortfall = Math.max(0, maxPossibleForThisPage - receivedCount)

    if (actualShortfall > 0) {
      console.info('Small dataset shortfall detected:', {
        totalAvailable: totalAvailable,
        pageParam: pageParam,
        maxPossible: maxPossibleForThisPage,
        received: receivedCount,
        actualShortfall: actualShortfall,
      })
    }
  }

  // Return result with proper shortfall metadata
  return {
    ...result,
    _metadata: {
      originalShortfall: actualShortfall,
      compensated: false,
    },
    destinationName,
  }
}

export interface UseHolidaysInfiniteQueryOptions {
  enabled?: boolean
  staleTime?: number
  gcTime?: number
  keepPreviousData?: boolean
}

export function useHolidaysInfiniteQuery(
  destinationId: number,
  destinationName: string,
  filterVariables: HolidayQueryVariables,
  activeFilters: string[] = [],
  options: UseHolidaysInfiniteQueryOptions = {}
) {
  const queryClient = useQueryClient()

  const {
    enabled = true,
    staleTime = 5 * 60 * 1000,
    gcTime = 10 * 60 * 1000,
    keepPreviousData: shouldKeepPreviousData = false,
  } = options

  // Create stable query key - use object structure for better cache management
  const queryKey = useMemo(
    () => [
      'holidays',
      destinationId,
      activeFilters.sort().join(','),
      // Hash the variables for stability
      JSON.stringify(filterVariables),
    ],
    [destinationId, activeFilters, filterVariables]
  )

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      fetchHolidaysPage(
        destinationId,
        destinationName,
        filterVariables,
        pageParam
      ),
    enabled: enabled && destinationId > 0,
    staleTime,
    gcTime,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    initialPageParam: 0,
    placeholderData: shouldKeepPreviousData ? keepPreviousData : undefined, // Keep previous data visible during transitions
    // Prevent unnecessary re-renders during data transitions
    notifyOnChangeProps: [
      'data',
      'error',
      'isLoading',
      'isFetchingNextPage',
      'isPlaceholderData',
    ],
    // Use structural sharing to maintain stable references
    structuralSharing: (oldData, newData) => {
      // If the data is the same, return the old reference to prevent re-renders
      if (
        oldData &&
        newData &&
        JSON.stringify(oldData) === JSON.stringify(newData)
      ) {
        return oldData
      }
      return newData
    },

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalFetched = allPages.reduce(
        (total, page) => total + (page.offers.result?.length || 0),
        0
      )
      const originalTotal = lastPage.offers.count || 0

      // Calculate lost results to get adjusted total
      const lostFromSequence = allPages.reduce((totalLost, page) => {
        const pageShortfall = page._metadata?.originalShortfall || 0
        return totalLost + pageShortfall
      }, 0)

      const adjustedTotal = Math.max(0, originalTotal - lostFromSequence)

      // Stop if we've fetched enough items based on adjusted total
      if (totalFetched >= adjustedTotal) {
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

  // Trim cache AFTER successful data load using useEffect (v5 pattern)
  useEffect(() => {
    // Only trim when we have successfully loaded data
    if (query.isSuccess && query.data) {
      // Find all other holiday queries in cache
      const allHolidayQueries = queryClient.getQueriesData({
        queryKey: ['holidays'],
        exact: false,
      })

      // Trim each query (except current one) to max 16 results (2 pages)
      allHolidayQueries.forEach(([otherQueryKey, otherData]) => {
        // Skip current query
        if (JSON.stringify(otherQueryKey) === JSON.stringify(queryKey)) return

        // Type guard and trim if it has more than 2 pages (16 results)
        if (
          otherData &&
          typeof otherData === 'object' &&
          'pages' in otherData &&
          'pageParams' in otherData &&
          Array.isArray(otherData.pages) &&
          otherData.pages.length > 2
        ) {
          queryClient.setQueryData(otherQueryKey, {
            pages: otherData.pages.slice(0, 2),
            pageParams: Array.isArray(otherData.pageParams)
              ? otherData.pageParams.slice(0, 2)
              : [],
          })
        }
      })
    }
  }, [query.isSuccess, query.data, queryClient, queryKey])

  // Flatten data for easier consumption and cap at adjusted total
  // Use select to minimize re-renders by only extracting the data we need
  const allHolidays = useMemo(() => {
    const pages = query.data?.pages || []
    return pages.flatMap((page) => page.offers.result || [])
  }, [query.data])

  const totalCount = query.data?.pages[0]?.offers.count || 0

  // Calculate lost results using metadata from each page (always count shortfalls)
  const lostResults = useMemo(() => {
    if (!query.data?.pages) return 0

    return query.data.pages.reduce((totalLost, page) => {
      // Always count shortfalls as "lost" regardless of compensation
      // Compensation fills the page but doesn't restore the missing sequence position
      const pageShortfall = page._metadata?.originalShortfall || 0
      return totalLost + pageShortfall
    }, 0)
  }, [query.data])

  // Adjust total count based on lost results to reflect actual available results
  const adjustedTotalCount = Math.max(0, totalCount - lostResults)

  // Cap holidays array at adjusted total count
  const holidays = useMemo(() => {
    return allHolidays.slice(0, adjustedTotalCount)
  }, [allHolidays, adjustedTotalCount])

  const loadedCount = holidays.length

  // Log when we detect API discrepancies for debugging
  if (lostResults > 0 && totalCount > 0) {
    console.info('API Discrepancy - Total Adjusted:', {
      original: totalCount,
      adjusted: adjustedTotalCount,
      lost: lostResults,
    })
  }

  // Use adjusted total for load more and completion logic
  const canLoadMore = loadedCount < adjustedTotalCount && adjustedTotalCount > 0
  const allItemsLoaded =
    loadedCount >= adjustedTotalCount && adjustedTotalCount > 0

  return {
    ...query,
    holidays,
    totalCount: adjustedTotalCount, // Return adjusted count instead of original
    originalTotalCount: totalCount, // Keep original for debugging if needed
    loadedCount,
    lostResults, // For debugging purposes
    canLoadMore,
    allItemsLoaded,
    isPlaceholderData: query.isPlaceholderData, // Indicates if showing previous data
  }
}
