import { useState, useCallback, useLayoutEffect } from 'react'

const STORAGE_KEY = 'searchBarExpanded'

const useSearchExpansion = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  useLayoutEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded))
    } catch {
      // Silently ignore localStorage errors
    }
  }, [isExpanded])

  const memoizedSetIsExpanded = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setIsExpanded(value)
    },
    []
  )

  return [isExpanded, memoizedSetIsExpanded] as const
}

export { useSearchExpansion }
