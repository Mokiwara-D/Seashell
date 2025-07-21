import { useQuery } from '@tanstack/react-query'
import { useEffect, useCallback } from 'react'
import { Container } from '@/components/ui/container'
import { Tabs } from '@/components/ui/tabs'
import { useDestination } from '@/contexts/useDestination'
import { fetchAvailableDestinations } from '@/queries/graphql'
import {
  getDestinations,
  getDefaultDestination,
} from '@/lib/destinations'
import { cn } from '@/lib/utils'

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

  // Get destinations with fallback logic using centralized function
  const destinations = getDestinations(
    destinationsQuery.data,
    !!destinationsQuery.error
  )
  const isLoading = destinationsQuery.isLoading
  const hasError = destinationsQuery.error && !destinationsQuery.data

  // Error handling for failed requests
  useEffect(() => {
    if (destinationsQuery.error) {
      console.error('Failed to fetch destinations:', destinationsQuery.error)
      // Could integrate with error tracking service here
    }
  }, [destinationsQuery.error])

  // Default destination selection logic - integrates with destination context initialization
  useEffect(() => {
    // Only run when we have fresh destination data, not on every destination change
    if (!isLoading && destinations.length > 0 && destinationsQuery.data) {
      const defaultDestination = getDefaultDestination(destinations)

      const currentDestinationExists = destinations.some(
        (dest) => dest.id === destination.id
      )

      const shouldSetDefault =
        !currentDestinationExists ||
        (destination.id === 60 &&
          destination.name === 'Spain' &&
          defaultDestination.id !== destination.id)

      if (shouldSetDefault) {
        setDestination(defaultDestination)
      }
    }
  }, [destinations, isLoading, destinationsQuery.data, destination.id, destination.name, setDestination])

  // Handle tab change
  const handleTabChange = useCallback(
    (tabName: string) => {
      const selectedDestination = destinations.find(
        (dest) => dest.name === tabName
      )
      if (selectedDestination) {
        setDestination(selectedDestination)
      }
    },
    [destinations, setDestination]
  )

  // Dynamic classes for height transition
  const wrapperClasses = cn(
    'overflow-hidden transition-all duration-300 ease-in-out bottom-0 sticky bg-accent',
    isLoading || (hasError && destinations.length === 0)
      ? 'py-0 h-0'
      : 'py-8 h-auto'
  )

  return (
    <Container
      wrapperClassName={wrapperClasses}
      contentClassName="flex flex-col bg-background -m-4 p-4 rounded-lg"
    >
      {!isLoading && destinations.length > 0 && (
        <>
          <h1 className="font-bold">TEMP Destination Picker</h1>
          <Tabs
            tabs={destinations.map((dest) => dest.name)}
            activeTab={destination.name}
            onTabChange={handleTabChange}
            className="w-full"
          />
        </>
      )}
    </Container>
  )
}

export { DestinationPicker }
