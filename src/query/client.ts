import { QueryClient } from '@tanstack/react-query'
import type { GraphQLQuery } from './types'

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  })
}

export class GraphQLClient {
  private endpoint: string
  private headers: Record<string, string>

  constructor(endpoint: string, defaultHeaders: Record<string, string> = {}) {
    this.endpoint = endpoint
    this.headers = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  async request<T = unknown>(query: GraphQLQuery): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(query),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()

    if (result.errors && result.errors.length > 0) {
      throw new Error(`GraphQL Error: ${result.errors[0].message}`)
    }

    if (!result.data) {
      throw new Error('No data returned from GraphQL query')
    }

    return result.data
  }
}

export const graphqlClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_ENDPOINT || '',
  {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN || ''}`,
  }
)
