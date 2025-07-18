import { useState, useEffect } from 'react'

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

  return [isExpanded, setIsExpanded] as const
}

export { useSearchExpansion }
