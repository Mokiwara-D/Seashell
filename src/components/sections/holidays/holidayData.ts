import { placeholderUrl } from '@/lib/imagePreloader'
import { useOfferData } from '@/queries/hooks/useOfferData'
import type { OfferData } from '@/queries/types'

export interface Holiday {
  id: number
  name: string
  image: string
  stars: number
  tripAdvisorRating: number
  tripAdvisorReviews: number
  price: number
  location: string
}

// Transform API offer data to Holiday format
export function transformOfferToHoliday(offer: OfferData): Holiday {
  const { accommodation, price_per_person } = offer
  const {
    images,
    resort,
    rating,
    trip_advisor_rating,
    trip_advisor_num_reviews,
  } = accommodation

  // Get the first image URL or fallback to placeholder
  const imageUrl = images && images.length > 0 ? images[0].url : placeholderUrl

  // Format location from resort and region data
  const region =
    resort.regions && resort.regions.length > 0 ? resort.regions[0].name : ''
  const location = region ? `${region}, Spain` : 'Spain'

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
export function useHolidayData(destinationId: number = 188) {
  const { data, isLoading, error } = useOfferData(destinationId)

  const holidays: Holiday[] =
    data?.offers?.result?.map(transformOfferToHoliday) || []

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
