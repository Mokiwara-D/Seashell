import { placeholder } from '@/lib/imagePreloader'
// Temporary: useOfferData removed - destinations system will be reworked
// import { useOfferData } from '@/query/hooks/useOfferData'
// import type { OfferData } from '@/query/types'
import type { Destination } from './types'

// Temporary stub interface until destinations system is reworked
interface OfferData {
  price_per_person: number
  accommodation: {
    images?: { url: string }[]
    resort: {
      regions?: {
        id: number
        name: string
        detail?: string
      }[]
    }
  }
}

// Temporary stub hook until destinations system is reworked
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useOfferData(_destinationId: number) {
  return {
    data: {
      offers: {
        result: [] as OfferData[],
      },
    },
    isLoading: false,
    error: null,
  }
}

// Transform API offer data to extract unique regions
export function transformOffersToRegions(offers: OfferData[]): Destination[] {
  const regionMap = new Map<
    string,
    {
      id: number
      name: string
      detail?: string
      prices: number[]
      images: string[]
    }
  >()

  // Process all offers to collect region data
  offers.forEach((offer) => {
    const { accommodation, price_per_person } = offer
    const { images, resort } = accommodation

    resort.regions?.forEach((region) => {
      const existingRegion = regionMap.get(region.name)
      const baseImageUrl = images && images.length > 0 ? images[0].url : null
      const imageUrl = baseImageUrl
        ? `https://assets.ncl.holidaywebtech.co.uk${baseImageUrl}`
        : null

      if (existingRegion) {
        // Add price and image to existing region
        existingRegion.prices.push(price_per_person)
        if (imageUrl) {
          existingRegion.images.push(imageUrl)
        }
      } else {
        // Create new region entry
        regionMap.set(region.name, {
          id: region.id,
          name: region.name,
          detail: region.detail,
          prices: [price_per_person],
          images: imageUrl ? [imageUrl] : [],
        })
      }
    })
  })

  // Convert map to Destination array
  return Array.from(regionMap.values()).map((data) => ({
    id: data.id,
    name: data.name,
    image: data.images.length > 0 ? data.images[0] : placeholder,
    description: data.detail ?? '',
    priceFrom: Math.min(...data.prices),
  }))
}

// Hook to get region data from API
export function useRegionData(destinationId: number) {
  const { data, isLoading, error } = useOfferData(destinationId)

  const regions: Destination[] = data?.offers?.result
    ? transformOffersToRegions(data.offers.result)
    : []

  return {
    regions,
    isLoading,
    error,
  }
}
