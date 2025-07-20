interface LocationData {
  resort?: {
    name?: string
    regions?: {
      name?: string
      destinations?: {
        id?: number
        name?: string
      }[]
    }[]
  }
}

/**
 * Formats location text from nested accommodation data structure
 * Priority: "Region, Destination" > Region only > Destination only > Empty string
 */
export const formatLocationText = (accommodation: LocationData): string => {
  const region = accommodation.resort?.regions?.[0]
  const regionName = region?.name
  const destinationName = region?.destinations?.[0]?.name

  if (regionName && destinationName) {
    return `${regionName}, ${destinationName}`
  }
  
  if (regionName) {
    return regionName
  }
  
  if (destinationName) {
    return destinationName
  }
  
  return ''
}

/**
 * Extracts resort name from accommodation data
 */
export const getResortName = (accommodation: LocationData): string => {
  return accommodation.resort?.name || 'Unknown Resort'
}