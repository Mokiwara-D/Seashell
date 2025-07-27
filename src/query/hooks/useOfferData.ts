import { useQuery } from '@tanstack/react-query'
import { fetchOffers } from '../queries'
import type {
  OffersResponse,
  OfferAccommodation,
  OfferData,
  QueryOptions,
} from '../types'

const useOfferData = (destinationId: number, options?: QueryOptions) => {
  return useQuery<OffersResponse>({
    queryKey: ['offers', destinationId],
    queryFn: () => fetchOffers(destinationId),
    staleTime: 1800000, // 30 minutes
    ...options,
  })
}

export {
  useOfferData,
  type OfferAccommodation,
  type OfferData,
  type OffersResponse,
}
