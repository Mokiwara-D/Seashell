import { useState, useCallback, useMemo } from 'react'
import { getDatePlus28Days } from '@/lib/utils'

export interface FilterState {
  activeFilters: string[]
  filterVariables: Record<string, unknown>
  combinedVariables: Record<string, unknown>
}

// Define filter variable mappings
const FILTER_MAPPINGS: Record<string, Record<string, unknown>> = {
  'Under £400pp': { max_price: 399 },
  '5-Star': { ratings: [5] },
  'Last Minute': {
    departure_date: getDatePlus28Days(),
    departure_date_type: 1, // 1 = Cheapest Month
  },
  'All Inclusive': { boards: [5] },
  'City Breaks': { trip_type: 1 },
}

export const filterOptions = [
  'Last Minute',
  'Under £400pp',
  'All Inclusive',
  '5-Star',
  'City Breaks',
]

export function useFilterManager(defaultFilters: string[] = []) {
  const [activeFilters, setActiveFilters] = useState<string[]>(defaultFilters)

  // Toggle filter on/off
  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter)
      } else {
        return [...prev, filter]
      }
    })
  }, [])

  // Add filter if not already active
  const addFilter = useCallback((filter: string) => {
    setActiveFilters((prev) => {
      if (!prev.includes(filter)) {
        return [...prev, filter]
      }
      return prev
    })
  }, [])

  // Remove filter if active
  const removeFilter = useCallback((filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveFilters([])
  }, [])

  // Get variables for active filters
  const filterVariables = useMemo(() => {
    const variables: Record<string, unknown> = {}

    activeFilters.forEach((filter) => {
      const filterVars = FILTER_MAPPINGS[filter]
      if (filterVars) {
        Object.assign(variables, filterVars)
      }
    })

    return variables
  }, [activeFilters])

  // Base variables for holidays query with index signature
  const baseVariables = useMemo(
    (): Record<string, unknown> => ({
      rooms: ['2'],
      duration: 7,
      departure_points: [],
      boards: [],
      ratings: [],
      trip_ratings: [],
      departure_date: null,
      departure_date_type: 0,
      destinations: [], // Will be set by the query hook
      regions: [],
      resorts: [],
      trip_type: -1,
      start_index: 0,
      sort: 0,
      fav_accommodations: [],
      client_list_id: -1,
      max_price: -1,
      take: 4,
      accommodation_id: null,
    }),
    []
  )

  // Combine base variables with filter variables
  const combinedVariables = useMemo(() => {
    const combined: Record<string, unknown> = { ...baseVariables }

    // Merge filter variables, handling arrays specially
    Object.entries(filterVariables).forEach(([key, value]) => {
      if (Array.isArray(value) && Array.isArray(combined[key])) {
        // For arrays, merge unique values
        combined[key] = [...new Set([...combined[key], ...value])]
      } else {
        // For other types, override
        combined[key] = value
      }
    })

    return combined
  }, [baseVariables, filterVariables])

  // Check if filter is active
  const isFilterActive = useCallback(
    (filter: string) => {
      return activeFilters.includes(filter)
    },
    [activeFilters]
  )

  // Get filter count
  const filterCount = activeFilters.length

  // Check if any filters are active
  const hasActiveFilters = filterCount > 0

  return {
    activeFilters,
    filterVariables,
    combinedVariables,
    toggleFilter,
    addFilter,
    removeFilter,
    clearFilters,
    isFilterActive,
    filterCount,
    hasActiveFilters,
  }
}
