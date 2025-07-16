/**
 * React Query Configuration
 *
 * Central configuration file for all React Query settings, including
 * cache times, retry logic, and query-specific configurations.
 */

import { QueryClient } from '@tanstack/react-query'
import { shouldRetry, retryConfig } from './errorHandling'

// Cache time constants (in milliseconds)
export const CACHE_TIMES = {
  // Short cache for dynamic data
  SHORT: 2 * 60 * 1000, // 2 minutes
  // Medium cache for semi-static data
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  // Long cache for static data
  LONG: 30 * 60 * 1000, // 30 minutes
  // Extra long cache for rarely changing data
  EXTRA_LONG: 60 * 60 * 1000, // 1 hour
} as const

// Garbage collection times (in milliseconds)
export const GC_TIMES = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 10 * 60 * 1000, // 10 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  EXTRA_LONG: 60 * 60 * 1000, // 1 hour
} as const

// Query-specific configurations
export const QUERY_CONFIGS = {
  // Holiday packages - dynamic pricing, shorter cache
  holidays: {
    staleTime: CACHE_TIMES.SHORT,
    gcTime: GC_TIMES.SHORT,
    retry: (failureCount: number, error: Error) =>
      shouldRetry(error, failureCount),
    retryDelay: retryConfig.default.retryDelay,
  },

  // Destinations - relatively static, longer cache
  destinations: {
    staleTime: CACHE_TIMES.LONG,
    gcTime: GC_TIMES.LONG,
    retry: (failureCount: number, error: Error) =>
      shouldRetry(error, failureCount),
    retryDelay: retryConfig.default.retryDelay,
  },

  // Search results - short cache for real-time results
  search: {
    staleTime: CACHE_TIMES.SHORT,
    gcTime: GC_TIMES.SHORT,
    retry: (failureCount: number, error: Error) =>
      shouldRetry(error, failureCount),
    retryDelay: retryConfig.search.retryDelay,
  },

  // User data - medium cache
  user: {
    staleTime: CACHE_TIMES.MEDIUM,
    gcTime: GC_TIMES.MEDIUM,
    retry: (failureCount: number, error: Error) =>
      shouldRetry(error, failureCount),
    retryDelay: retryConfig.default.retryDelay,
  },
} as const

// Default React Query configuration
export const DEFAULT_QUERY_CONFIG = {
  staleTime: CACHE_TIMES.MEDIUM,
  gcTime: GC_TIMES.MEDIUM,
  retry: (failureCount: number, error: Error) =>
    shouldRetry(error, failureCount),
  retryDelay: retryConfig.default.retryDelay,
  refetchOnWindowFocus: true,
  refetchOnReconnect: false,
} as const

// Default mutation configuration
export const DEFAULT_MUTATION_CONFIG = {
  retry: (failureCount: number, error: Error) =>
    shouldRetry(error, failureCount),
  retryDelay: retryConfig.critical.retryDelay,
} as const

// Query client factory with all configurations applied
export const createConfiguredQueryClient = (): QueryClient => {
  const client = new QueryClient({
    defaultOptions: {
      queries: DEFAULT_QUERY_CONFIG,
      mutations: DEFAULT_MUTATION_CONFIG,
    },
  })

  // Apply query-specific defaults
  Object.entries(QUERY_CONFIGS).forEach(([queryType, config]) => {
    client.setQueryDefaults([queryType], config)
  })

  return client
}

// Export configured query client instance
export const queryClient = createConfiguredQueryClient()

// Utility functions for common query operations
export const queryUtils = {
  /**
   * Invalidate all queries of a specific type
   */
  invalidateQueries: (queryType: keyof typeof QUERY_CONFIGS) => {
    return queryClient.invalidateQueries({ queryKey: [queryType] })
  },

  /**
   * Prefetch data for improved performance
   */
  prefetchQuery: async (
    queryKey: unknown[],
    queryFn: () => Promise<unknown>
  ) => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: CACHE_TIMES.MEDIUM,
    })
  },

  /**
   * Get cached data without triggering a fetch
   */
  getCachedData: <T>(queryKey: unknown[]): T | undefined => {
    return queryClient.getQueryData<T>(queryKey)
  },

  /**
   * Set data in cache manually
   */
  setCachedData: <T>(queryKey: unknown[], data: T) => {
    queryClient.setQueryData(queryKey, data)
  },

  /**
   * Remove specific query from cache
   */
  removeQuery: (queryKey: unknown[]) => {
    queryClient.removeQueries({ queryKey })
  },

  /**
   * Clear all cached data
   */
  clearCache: () => {
    queryClient.clear()
  },
}

// Development utilities
export const devUtils = {
  /**
   * Log current cache state (development only)
   */
  logCacheState: () => {
    if (import.meta.env.DEV) {
      console.log(
        'React Query Cache State:',
        queryClient.getQueryCache().getAll()
      )
    }
  },

  /**
   * Get cache statistics (development only)
   */
  getCacheStats: () => {
    if (import.meta.env.DEV) {
      const cache = queryClient.getQueryCache()
      const queries = cache.getAll()

      return {
        totalQueries: queries.length,
        staleQueries: queries.filter((q) => q.isStale()).length,
        fetchingQueries: queries.filter(
          (q) => q.state.fetchStatus === 'fetching'
        ).length,
        errorQueries: queries.filter((q) => q.state.status === 'error').length,
      }
    }
    return null
  },
}
