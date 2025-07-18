export const OFFERS_QUERY = `
query offers {
	offers {
		result {
			accommodation{
				name
				
			}
		}
	}
}
`

export async function fetchGraphQL(query: string) {
  const res = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}
