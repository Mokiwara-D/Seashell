import { placeholder } from '@/lib/imagePreloader'
import { useHolidaysInfiniteQuery } from '@/query/hooks/useHolidaysInfiniteQuery'
import type { HolidayOffer } from '@/query/hooks/useHolidaysInfiniteQuery'
import type { Holiday } from './types'

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
    id: offer.id, // Use offer ID instead of accommodation.id for uniqueness
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
    totalCount, // This is now the adjusted total count
    originalTotalCount,
    loadedCount,
    lostResults,
    canLoadMore,
    allItemsLoaded,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useHolidaysInfiniteQuery(
    destinationId,
    filterVariables,
    activeFilters,
    { keepPreviousData: true } // Keep previous data during filter changes
  )

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
    totalCount, // Adjusted total count that accounts for API discrepancies
    originalTotalCount, // Original API-reported count for debugging
    loadedCount,
    lostResults, // Number of results lost due to API issues
    canLoadMore,
    allItemsLoaded,
    error,
    refetch,
  }
}

// Filter options are now exported from useFilterManager hook
export { filterOptions } from '@/query/hooks/useFilterManager'
