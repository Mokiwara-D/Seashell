import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Container } from '../../ui/container'
import { Tabs } from '../../ui/tabs'
import { useDestination } from '../../../contexts/useDestination'
import { fetchAvailableDestinations } from '../../../lib/graphql'
import {
  parseDestinations,
  DESTINATIONS,
  type Destination,
} from '../../../lib/destinations'

const DestinationPicker = () => {
  const { destination, setDestination } = useDestination()

  // React Query configuration for fetching destinations
  const destinationsQuery = useQuery({
    queryKey: ['available-destinations'],
    queryFn: fetchAvailableDestinations,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 35 * 60 * 1000, // 35 minutes (slightly longer than stale time)
    retry: 1, // Retry once on failure
    throwOnError: false, // Handle errors manually
  })

  // Get destinations with fallback logic
  const getDestinations = (): Destination[] => {
    if (destinationsQuery.data && !destinationsQuery.error) {
      return parseDestinations(destinationsQuery.data)
    }

    // Fallback to static destinations when GraphQL fails
    return DESTINATIONS
  }

  const destinations = getDestinations()
  const isLoading = destinationsQuery.isLoading
  const hasError = destinationsQuery.error && !destinationsQuery.data

  // Error handling with console.log for failed requests
  useEffect(() => {
    if (destinationsQuery.error) {
      console.log('Failed to fetch destinations:', destinationsQuery.error)
    }
  }, [destinationsQuery.error])

  // Handle tab change
  const handleTabChange = (tabName: string) => {
    const selectedDestination = destinations.find(
      (dest) => dest.name === tabName
    )
    if (selectedDestination) {
      setDestination(selectedDestination)
    }
  }

  // Dynamic classes for height transition
  const wrapperClasses =
    isLoading || (hasError && destinations.length === 0)
      ? 'py-0 h-0 overflow-hidden transition-all duration-300 ease-in-out bottom-0 sticky bg-background'
      : 'py-12 h-auto overflow-hidden transition-all duration-300 ease-in-out bottom-0 sticky bg-background'

  return (
    <Container
      wrapperClassName={wrapperClasses}
      contentClassName="flex flex-col gap-4"
    >
      {!isLoading && destinations.length > 0 && (
        <Tabs
          tabs={destinations.map((dest) => dest.name)}
          activeTab={destination.name}
          onTabChange={handleTabChange}
          className="w-full"
        />
      )}
    </Container>
  )
}

export { DestinationPicker }
