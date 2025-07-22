import { placeholder } from '@/lib/imagePreloader'
import { useOfferData } from '@/queries/hooks/useOfferData'
import type { OfferData } from '@/queries/types'
import type { Holiday } from './types'

// Transform API offer data to Holiday format
export function transformOfferToHoliday(
  offer: OfferData,
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

// Hook to get holiday data from API
export function useHolidayData(destinationId: number, destinationName: string) {
  const { data, isLoading, error } = useOfferData(destinationId)

  const holidays: Holiday[] =
    data?.offers?.result?.map((offer) =>
      transformOfferToHoliday(offer, destinationName)
    ) || []

  return {
    holidays,
    isLoading,
    error,
  }
}

export const filterOptions = [
  'Last Minute',
  'Under £400pp',
  'All Inclusive',
  '5-Star',
  'City Breaks',
]
