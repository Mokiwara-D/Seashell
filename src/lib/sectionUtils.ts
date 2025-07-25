import type { RefObject } from 'react'

/**
 * Gets the background color class of the closest parent section element
 * @param ref - React ref to the element to start searching from
 * @returns The appropriate background color class for gradients
 */
export function getSectionBackgroundColor(
  ref: RefObject<HTMLElement | null>
): string {
  if (!ref.current) {
    return 'from-background' // default fallback
  }

  // Traverse up the DOM to find the closest section element
  let element = ref.current.parentElement

  while (element && element !== document.body) {
    if (element.tagName.toLowerCase() === 'section') {
      // Check if the section has bg-secondary class (even sections in Main.tsx)
      const hasSecondaryBg =
        element.classList.contains('bg-secondary') ||
        (getComputedStyle(element).backgroundColor !== 'rgba(0, 0, 0, 0)' &&
          getComputedStyle(element).backgroundColor !== 'transparent')

      return hasSecondaryBg ? 'from-secondary' : 'from-background'
    }
    element = element.parentElement
  }

  // If no section found, check if we're in a secondary background context
  // by looking for the bg-secondary class anywhere in the parent chain
  element = ref.current.parentElement
  while (element && element !== document.body) {
    if (element.classList.contains('bg-secondary')) {
      return 'from-secondary'
    }
    element = element.parentElement
  }

  return 'from-background' // default fallback
}
