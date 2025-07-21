import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL, createOffersQuery } from './graphql'

// TypeScript interfaces for GraphQL response data
interface OfferAccommodation {
  id: number
  name: string
  resort: {
    regions: {
      name: string
    }[]
  }
}

interface OfferData {
  accommodation: OfferAccommodation
}

interface OffersResponse {
  offers: {
    result: OfferData[]
  }
}

const useOfferData = (destinationId: number) => {
  return useQuery<OffersResponse>({
    queryKey: ['offers', destinationId],
    queryFn: () => fetchGraphQL(createOffersQuery(destinationId)),
    staleTime: 1800000, // 30 minutes
  })
}

export { useOfferData, type OfferAccommodation, type OfferData, type OffersResponse }