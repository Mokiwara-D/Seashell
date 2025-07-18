interface GraphQLQuery {
  query: string
  variables?: Record<string, unknown>
}

export const OFFERS_QUERY: GraphQLQuery = {
  query: `
    query offers($destinations: [Int]) {
      offers(destinations: $destinations) {
        result {
          accommodation {
						id
            name
            resort {
              regions{
                destinations{
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {
    destinations: [193],
  },
}

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
