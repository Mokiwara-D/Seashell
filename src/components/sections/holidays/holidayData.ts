import { placeholder } from '@/lib/imagePreloader'
import { useHolidaysInfiniteQuery } from '@/query/hooks/useHolidaysInfiniteQuery'
import type { HolidayOffer } from '@/query/hooks/useHolidaysInfiniteQuery'
import type { Holiday } from './types'
import { useMemo } from 'react'

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
  const queryResult = useHolidaysInfiniteQuery(
    destinationId,
    destinationName,
    filterVariables,
    activeFilters,
    { keepPreviousData: true }
  )

  // Use select-like transformation to derive holidays and stable destination name
  const transformedData = useMemo(() => {
    const rawHolidays = queryResult.holidays || []
    const currentDestination =
      queryResult.data?.pages?.[0]?.destinationName || destinationName

    return {
      holidays: rawHolidays.map((offer) =>
        transformOfferToHoliday(offer, currentDestination)
      ),
      displayDestinationName: currentDestination,
    }
  }, [queryResult.holidays, queryResult.data?.pages, destinationName])

  return {
    ...queryResult,
    holidays: transformedData.holidays,
    displayDestinationName: transformedData.displayDestinationName,
  }
}

// Filter options are now exported from useFilterManager hook
export { filterOptions } from '@/query/hooks/useFilterManager'
