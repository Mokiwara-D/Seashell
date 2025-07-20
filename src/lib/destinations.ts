/*
 * Testing purposes only
 */

export interface Destination {
  id: number
  name: string
}

// Interface for raw GraphQL destination data
export interface RawDestination {
  title: string  // Format: "ID-name" (e.g., "188-greek islands")
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
 * Parses raw GraphQL destination data into the standard Destination format
 * Handles title parsing from "ID-name" format and capitalizes names properly
 * 
 * @param rawDestinations - Array of raw destination data from GraphQL
 * @returns Array of parsed Destination objects
 */
export const parseDestinations = (rawDestinations: RawDestination[]): Destination[] => {
  return rawDestinations.map(raw => {
    try {
      // Handle edge case: empty or invalid title
      if (!raw.title || typeof raw.title !== 'string') {
        return {
          id: raw.result || 0,
          name: `Destination ${raw.result || 'Unknown'}`
        }
      }

      // Split title on dash to separate ID and name parts
      const titleParts = raw.title.split('-')
      
      // Handle edge case: no dash in title
      if (titleParts.length < 2) {
        return {
          id: raw.result || 0,
          name: raw.title.trim() || `Destination ${raw.result || 'Unknown'}`
        }
      }

      // Extract name parts (everything after the first dash)
      const nameParts = titleParts.slice(1)
      
      // Join name parts and capitalize each word
      const name = nameParts
        .join(' ')
        .trim()
        .split(' ')
        .filter(word => word.length > 0) // Remove empty strings
        .map(word => {
          // Capitalize first letter and make rest lowercase
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')

      // Handle edge case: empty name after processing
      if (!name) {
        return {
          id: raw.result || 0,
          name: `Destination ${raw.result || 'Unknown'}`
        }
      }

      return {
        id: raw.result || 0,
        name
      }
    } catch (error) {
      // Handle any unexpected errors during parsing
      console.warn('Error parsing destination:', raw, error)
      return {
        id: raw.result || 0,
        name: `Destination ${raw.result || 'Unknown'}`
      }
    }
  })
}
