import { graphqlClient } from './client'
import type { 
  GraphQLQuery, 
  RawDestination, 
  AvailableDestinationsResponse,
  OffersResponse 
} from './types'

// GraphQL query definitions
export const AVAILABLE_DESTINATIONS_QUERY: GraphQLQuery = {
  query: `
    query GetAvailableDestinations {
      available_destinations {
        result {
          title
          result
        }
      }
    }
  `,
  operationName: 'GetAvailableDestinations',
}

export const createOffersQuery = (destinationId: number): GraphQLQuery => ({
  query: `
    query GetOffers($destinations: [Int]) {
      offers(destinations: $destinations) {
        result {
          accommodation {
            id
            name
            resort {
              regions {
                name
              }
            }
          }
        }
      }
    }
  `,
  variables: {
    destinations: [destinationId],
  },
  operationName: 'GetOffers',
})

// Enhanced GraphQL fetch functions using the centralized client
export async function fetchGraphQL<T = unknown>(query: GraphQLQuery): Promise<T> {
  return graphqlClient.request<T>(query)
}

export async function fetchAvailableDestinations(): Promise<RawDestination[]> {
  const data = await fetchGraphQL<AvailableDestinationsResponse>(
    AVAILABLE_DESTINATIONS_QUERY
  )
  return data.available_destinations.result
}

export async function fetchOffers(destinationId: number): Promise<OffersResponse> {
  return fetchGraphQL<OffersResponse>(createOffersQuery(destinationId))
}