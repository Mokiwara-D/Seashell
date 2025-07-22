import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'searchBarExpanded'

function useSearchExpansion() {
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded))
    } catch {
      // Silently ignore localStorage errors
    }
  }, [isExpanded])

  // Memoize the setter to prevent unnecessary re-renders in consuming components
  const memoizedSetIsExpanded = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setIsExpanded(value)
  }, [])

  return [isExpanded, memoizedSetIsExpanded] as const
}

export { useSearchExpansion }
