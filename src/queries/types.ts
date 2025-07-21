// Core GraphQL types and interfaces

// Base GraphQL query structure
export interface GraphQLQuery {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

// Error handling types
export interface GraphQLError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: string[]
  extensions?: Record<string, unknown>
}

export interface GraphQLResponse<T = unknown> {
  data?: T
  errors?: GraphQLError[]
}

// Available destinations types
export interface DestinationData {
  title: string
  result: number
}

export interface AvailableDestinationsResponse {
  available_destinations: {
    result: DestinationData[]
  }
}

// Offers types
export interface OfferAccommodation {
  id: number
  name: string
  resort: {
    regions: {
      name: string
    }[]
  }
}

export interface OfferData {
  accommodation: OfferAccommodation
}

export interface OffersResponse {
  offers: {
    result: OfferData[]
  }
}

// Query key types for better type safety
export type QueryKeys =
  | ['destinations']
  | ['offers', number]
  | ['offer', number]

// Query options type
export interface QueryOptions {
  enabled?: boolean
  staleTime?: number
  gcTime?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
}
