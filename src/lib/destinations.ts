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

export const DESTINATIONS: Destination[] = [
  { id: 186, name: 'Balearics' },
  { id: 21, name: 'Bulgaria' },
  { id: 187, name: 'Canaries' },
  { id: 206, name: 'Channel Islands' },
  { id: 84, name: 'Croatia' },
  { id: 48, name: 'Cyprus' },
  { id: 192, name: 'Dominican Republic' },
  { id: 58, name: 'Egypt' },
  { id: 196, name: 'France' },
  { id: 195, name: 'Gambia' },
  { id: 78, name: 'Greece Mainland' },
  { id: 188, name: 'Greek Islands' },
  { id: 193, name: 'Italy' },
  { id: 126, name: 'Malta' },
  { id: 130, name: 'Mexico' },
  { id: 152, name: 'Portugal' },
  { id: 60, name: 'Spain' },
  { id: 172, name: 'Tunisia' },
  { id: 174, name: 'Turkey' },
  { id: 200, name: 'USA' },
]

export const getDestinationById = (id: number): Destination | undefined => {
  return DESTINATIONS.find((dest) => dest.id === id)
}

/**
 * Gets destinations with fallback logic - prioritizes GraphQL data over static data
 *
 * @param graphqlData - Raw destination data from GraphQL (optional)
 * @param hasError - Whether there was an error fetching GraphQL data
 * @returns Array of Destination objects from GraphQL or fallback to static data
 */
export const getDestinations = (
  graphqlData?: RawDestination[] | null,
  hasError?: boolean
): Destination[] => {
  // Priority 1: Use GraphQL data if available and no error occurred
  if (graphqlData && !hasError) {
    try {
      return parseDestinations(graphqlData)
    } catch (error) {
      console.warn(
        'Error parsing GraphQL destinations, falling back to static data:',
        error
      )
      // Fall through to static fallback
    }
  }

  // Priority 2: Fallback to static destinations array
  return DESTINATIONS
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

      // Special case: Convert 'Greece Mainland' to just 'Greece'
      if (name === 'Greece Mainland') {
        name = 'Greece'
      }

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
 *
 * @param destinations - Array of available destinations
 * @returns Default destination object
 */
export const getDefaultDestination = (
  destinations: Destination[]
): Destination => {
  // Handle edge case: empty destinations array
  if (!destinations || destinations.length === 0) {
    return { id: 60, name: 'Spain' }
  }

  // Priority 1: Spain (id: 60)
  const spain = destinations.find((dest) => dest.id === 60)
  if (spain) {
    return spain
  }

  // Priority 2: First available destination
  return destinations[0]
}
