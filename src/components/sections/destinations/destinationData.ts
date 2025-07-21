import { placeholder } from '@/lib/imagePreloader'
import { useOfferData } from '@/queries/hooks/useOfferData'
import type { OfferData } from '@/queries/types'
import type { Destination } from './types'

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
      const imageUrl = images && images.length > 0 ? images[0].url : null

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
