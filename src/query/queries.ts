import { graphqlClient } from './client'
import type {
  GraphQLQuery,
  DestinationData,
  AvailableDestinationsResponse as DestinationsResponse,
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

// OFFERS_QUERY removed - replaced by holidays query in useHolidaysInfiniteQuery

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

// fetchOffers removed - replaced by holidays query in useHolidaysInfiniteQuery
