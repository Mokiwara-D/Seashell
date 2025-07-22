/*
 * Testing purposes only
 */

export interface Destination {
  id: number
  name: string
}

// Interface for raw GraphQL destination data
export interface RawDestination {
  title: string // Format: "ID-name" (e.g., "188-greek islands")
  result: number // The destination ID
}

/**
 * Gets destinations from GraphQL data only - no hardcoded fallback
 *
 * @param graphqlData - Raw destination data from GraphQL (optional)
 * @param hasError - Whether there was an error fetching GraphQL data
 * @returns Array of Destination objects from GraphQL or empty array
 */
export const getDestinations = (
  graphqlData?: RawDestination[] | null,
  hasError?: boolean
): Destination[] => {
  // Return empty array if there was an error or no data
  if (hasError || !graphqlData) {
    return []
  }

  try {
    return parseDestinations(graphqlData)
  } catch (error) {
    console.warn('Error parsing GraphQL destinations:', error)
    return []
  }
}

/**
 * Parses raw GraphQL destination data into the standard Destination format
 * Handles title parsing from "ID-name" format and capitalizes names properly
 *
 * @param rawDestinations - Array of raw destination data from GraphQL
 * @returns Array of parsed Destination objects
 */
export const parseDestinations = (
  rawDestinations: RawDestination[]
): Destination[] => {
  return rawDestinations.map((raw) => {
    try {
      // Handle edge case: empty or invalid title
      if (!raw.title || typeof raw.title !== 'string') {
        return {
          id: raw.result || 0,
          name: `Destination ${raw.result || 'Unknown'}`,
        }
      }

      // Split title on dash to separate ID and name parts
      const titleParts = raw.title.split('-')

      // Handle edge case: no dash in title
      if (titleParts.length < 2) {
        return {
          id: raw.result || 0,
          name: raw.title.trim() || `Destination ${raw.result || 'Unknown'}`,
        }
      }

      // Extract name parts (everything after the first dash)
      const nameParts = titleParts.slice(1)

      // Join name parts and capitalize each word
      let name = nameParts
        .join(' ')
        .trim()
        .split(' ')
        .filter((word) => word.length > 0) // Remove empty strings
        .map((word) => {
          // Capitalize first letter and make rest lowercase
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')

      name = name === 'Greece Mainland' ? 'Greece' : name
      name = name === 'Usa' ? name.toUpperCase() : name

      // Handle edge case: empty name after processing
      if (!name) {
        return {
          id: raw.result || 0,
          name: `Destination ${raw.result || 'Unknown'}`,
        }
      }

      return {
        id: raw.result || 0,
        name,
      }
    } catch (error) {
      // Handle any unexpected errors during parsing
      console.warn('Error parsing destination:', raw, error)
      return {
        id: raw.result || 0,
        name: `Destination ${raw.result || 'Unknown'}`,
      }
    }
  })
}

/**
 * Gets the default destination with Spain (id: 60) priority
 * Falls back to first available destination if Spain not found
 * Returns null if no destinations available
 *
 * @param destinations - Array of available destinations
 * @returns Default destination object or null if none available
 */
export const getDefaultDestination = (
  destinations: Destination[]
): Destination | null => {
  // Handle edge case: empty destinations array
  if (!destinations || destinations.length === 0) {
    return null
  }

  // Priority 1: Spain (id: 60)
  const spain = destinations.find((dest) => dest.id === 60)
  if (spain) {
    return spain
  }

  // Priority 2: First available destination
  return destinations[0]
}
