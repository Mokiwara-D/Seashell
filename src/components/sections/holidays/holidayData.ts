import { placeholder } from '@/lib/imagePreloader'
import { useHolidaysInfiniteQuery } from '@/query/hooks/useHolidaysInfiniteQuery'
import type { HolidayOffer } from '@/query/hooks/useHolidaysInfiniteQuery'
import type { Holiday } from './types'
import { useEffect, useRef } from 'react'

// Transform API offer data to Holiday format
export function transformOfferToHoliday(
  offer: HolidayOffer,
  destinationName: string
): Holiday {
  const { accommodation, price_per_person } = offer
  const {
    images,
    resort,
    rating,
    trip_advisor_rating,
    trip_advisor_num_reviews,
  } = accommodation

  // Get the first image URL and add base URL prefix, or fallback to placeholder
  const baseImageUrl = images && images.length > 0 ? images[0].url : null
  const imageUrl = baseImageUrl
    ? `https://assets.ncl.holidaywebtech.co.uk${baseImageUrl}`
    : placeholder

  // Format location from resort and region data using destination name from context
  const region =
    resort.regions && resort.regions.length > 0 ? resort.regions[0].name : ''

  // Avoid duplicate names when region and destination are the same
  let location = destinationName
  if (region && region.toLowerCase() !== destinationName.toLowerCase()) {
    location = `${region}, ${destinationName}`
  }

  return {
    id: accommodation.id,
    name: accommodation.name,
    image: imageUrl,
    stars: rating || 0,
    tripAdvisorRating: trip_advisor_rating || 0,
    tripAdvisorReviews: trip_advisor_num_reviews || 0,
    price: price_per_person || 0,
    location: location,
  }
}

// Hook to get holiday data from infinite query
export function useHolidayData(
  destinationId: number,
  destinationName: string,
  filterVariables: Record<string, unknown>,
  activeFilters: string[] = []
) {
  const {
    holidays: rawHolidays,
    totalCount,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useHolidaysInfiniteQuery(destinationId, filterVariables, activeFilters)

  // Track if we've done the automatic second page load
  const hasAutoLoaded = useRef(false)

  // Create a stable key for active filters to detect filter changes
  const activeFiltersKey = JSON.stringify(activeFilters.sort())

  // Reset auto-load flag when filters change
  useEffect(() => {
    hasAutoLoaded.current = false
  }, [activeFiltersKey])

  // Automatic load of second page after initial load
  useEffect(() => {
    if (
      !isLoading && // Initial load is complete
      !isFetching && // Not currently fetching
      rawHolidays.length > 0 && // We have some data
      hasNextPage && // More pages available
      !hasAutoLoaded.current && // Haven't auto-loaded yet
      !error // No error state
    ) {
      hasAutoLoaded.current = true
      fetchNextPage()
    }
  }, [isLoading, isFetching, rawHolidays.length, hasNextPage, fetchNextPage, error])

  // Transform all offers into Holiday format
  const holidays: Holiday[] = rawHolidays.map((offer) =>
    transformOfferToHoliday(offer, destinationName)
  )

  return {
    holidays,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    totalCount,
    error,
    refetch,
  }
}

// Filter options are now exported from useFilterManager hook
export { filterOptions } from '@/query/hooks/useFilterManager'
