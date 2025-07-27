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
    query availableDestinations {
      available_destinations {
        result {
          title
          result
        }
      }
    }
  `,
  operationName: 'availableDestinations',
}

export const OFFERS_QUERY = (destinationId: number): GraphQLQuery => ({
  query: `
    query offers($destinations: [Int]) {
      offers(destinations: $destinations) {
        result {
          price_per_person
          accommodation {
            id
            name
            rating
            trip_advisor_rating
            trip_advisor_num_reviews
            images{
              id
              url
            }
            resort {
              id
              name
              regions {
                id
                name
                detail
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
  operationName: 'offers',
})

export const REGIONS_QUERY = (destinationId: number): GraphQLQuery => ({
  query: `
    query regions($destinations: [Int]) {
      available_regions(destinations: $destinations){
        result{
          result
        }
      }
    }
  `,
  variables: {
    destinations: [destinationId],
  },
  operationName: 'regions',
})

export const REGION_QUERY = (regionId: number): GraphQLQuery => ({
  query: `
    query region($region_id: Int!) {
      region(region_id: $region_id){
        result{
          name
          detail
        }
      }
    }
  `,
  variables: {
    region_id: regionId,
  },
  operationName: 'region',
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
