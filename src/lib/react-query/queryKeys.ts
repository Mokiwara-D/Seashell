/**
 * Query Keys Factory
 * 
 * Provides a hierarchical structure for React Query keys to ensure consistency
 * and enable efficient cache invalidation and management.
 */

// Base query key types for type safety
export const queryKeys = {
  // Holiday-related queries
  holidays: ['holidays'] as const,
  holidaysList: (filters?: HolidayFilters) => ['holidays', 'list', filters] as const,
  holidaysDetail: (id: string | number) => ['holidays', 'detail', id] as const,
  holidaysSearch: (searchParams: SearchParams) => ['holidays', 'search', searchParams] as const,

  // Destination-related queries
  destinations: ['destinations'] as const,
  destinationsList: () => ['destinations', 'list'] as const,
  destinationsDetail: (id: string | number) => ['destinations', 'detail', id] as const,
  destinationsByRegion: (region: string) => ['destinations', 'region', region] as const,

  // Search-related queries
  search: ['search'] as const,
  searchResults: (params: SearchParams) => ['search', 'results', params] as const,
  searchSuggestions: (query: string) => ['search', 'suggestions', query] as const,

  // User-related queries (for future use)
  user: ['user'] as const,
  userProfile: (userId: string) => ['user', 'profile', userId] as const,
  userBookings: (userId: string) => ['user', 'bookings', userId] as const,
} as const

// Type definitions for query parameters
export interface HolidayFilters {
  category?: 'lastMinute' | 'under400' | 'allInclusive' | 'fiveStar' | 'cityBreaks'
  priceRange?: {
    min: number
    max: number
  }
  starRating?: number[]
  location?: string
  sortBy?: 'price' | 'rating' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  option: 'flight' | 'hotel' | 'flightHotel'
  departure: string
  destination: string
  departureDate: string
  duration: number
  passengers: {
    adults: number
    children: number
  }
}

// Utility functions for query key management
export const queryKeyUtils = {
  /**
   * Get all holiday-related query keys for cache invalidation
   */
  getAllHolidayKeys: () => queryKeys.holidays,

  /**
   * Get all destination-related query keys for cache invalidation
   */
  getAllDestinationKeys: () => queryKeys.destinations,

  /**
   * Get all search-related query keys for cache invalidation
   */
  getAllSearchKeys: () => queryKeys.search,

  /**
   * Create a query key for holiday list with optional filters
   */
  createHolidayListKey: (filters?: HolidayFilters) => queryKeys.holidaysList(filters),

  /**
   * Create a query key for search results
   */
  createSearchKey: (params: SearchParams) => queryKeys.searchResults(params),

  /**
   * Check if a query key matches a specific pattern
   */
  isHolidayKey: (queryKey: unknown[]): boolean => {
    return Array.isArray(queryKey) && queryKey[0] === 'holidays'
  },

  isDestinationKey: (queryKey: unknown[]): boolean => {
    return Array.isArray(queryKey) && queryKey[0] === 'destinations'
  },

  isSearchKey: (queryKey: unknown[]): boolean => {
    return Array.isArray(queryKey) && queryKey[0] === 'search'
  },
}

// Export types for use in components
export type QueryKey = typeof queryKeys
export type HolidayQueryKey = ReturnType<typeof queryKeys.holidaysList>
export type DestinationQueryKey = ReturnType<typeof queryKeys.destinationsList>
export type SearchQueryKey = ReturnType<typeof queryKeys.searchResults>