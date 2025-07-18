import { useEffect, useRef } from 'react'

interface UseScrollBehaviorProps {
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

function useScrollBehavior({
  isExpanded,
  setIsExpanded,
}: UseScrollBehaviorProps) {
  const isScrollingRef = useRef(false)

  // Restore scroll position immediately on component mount
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem('scrollPosition')
    if (savedScrollY) {
      const scrollY = parseInt(savedScrollY, 10)
      if (scrollY > 0) {
        // Restore immediately - no delay, no animation
        window.scrollTo(0, scrollY)
      }
    }
  }, [])

  useEffect(() => {
    // Disable browser scroll restoration completely
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only collapse if user scrolls down from the top after initial load
      if (
        isExpanded &&
        lastScrollY === 0 &&
        currentScrollY > 10 &&
        !isScrollingRef.current
      ) {
        setIsExpanded(false)
      }

      lastScrollY = currentScrollY
    }

    // Delay to avoid immediate collapse on restoration
    const timeoutId = setTimeout(() => {
      isScrollingRef.current = false
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isExpanded, setIsExpanded])

  // Mark as scrolling during restoration
  useEffect(() => {
    isScrollingRef.current = true
    const timeoutId = setTimeout(() => {
      isScrollingRef.current = false
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [])
}

export { useScrollBehavior }
