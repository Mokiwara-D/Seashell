import { graphqlClient } from './client'
import type {
  GraphQLQuery,
  DestinationData,
  AvailableDestinationsResponse as DestinationsResponse,
  OffersResponse,
} from './types'

// GraphQL query definitions
export const DESTINATIONS_QUERY: GraphQLQuery = {
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

export const OFFERS_QUERY = (destinationId: number): GraphQLQuery => ({
  query: `
    query GetOffers($destinations: [Int]) {
      offers(destinations: $destinations) {
        result {
          price_per_person
          accommodation {
            id
            name
            rating
            trip_advisor_rating
            trip_advisor_num_reviews
            images {
              id
              accommodation_id
              url
            }
            resort {
              id
              name
              regions {
                id
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
export async function fetchGraphQL<T = unknown>(
  query: GraphQLQuery
): Promise<T> {
  return graphqlClient.request<T>(query)
}

export async function fetchDestinations(): Promise<DestinationData[]> {
  const data = await fetchGraphQL<DestinationsResponse>(DESTINATIONS_QUERY)
  return data.available_destinations.result
}

export async function fetchOffers(
  destinationId: number
): Promise<OffersResponse> {
  return fetchGraphQL<OffersResponse>(OFFERS_QUERY(destinationId))
}
