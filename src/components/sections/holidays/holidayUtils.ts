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

export const formatLocationText = (
  accommodation: LocationData,
  destinationName?: string
): string => {
  const region = accommodation.resort?.regions?.[0]
  const regionName = region?.name

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

export const getResortName = (accommodation: LocationData): string => {
  return accommodation.resort?.name || 'Unknown Resort'
}
