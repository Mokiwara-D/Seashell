interface GraphQLQuery {
  query: string
  variables?: Record<string, unknown>
}

// TypeScript interfaces for available destinations GraphQL response
interface RawDestination {
  title: string
  result: number
}

interface AvailableDestinationsResponse {
  available_destinations: {
    result: RawDestination[]
  }
}

export const AVAILABLE_DESTINATIONS_QUERY: GraphQLQuery = {
  query: `
    query offers {
      available_destinations {
        result {
          title
          result
        }
      }
    }
  `,
}

export const createOffersQuery = (destinationId: number): GraphQLQuery => ({
  query: `
    query offers($destinations: [Int]) {
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
})

export async function fetchGraphQL(query: GraphQLQuery) {
  const res = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    },
    body: JSON.stringify(query),
  })
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}

export async function fetchAvailableDestinations(): Promise<RawDestination[]> {
  const data: AvailableDestinationsResponse = await fetchGraphQL(
    AVAILABLE_DESTINATIONS_QUERY
  )
  return data.available_destinations.result
}