import { useEffect, useCallback } from 'react'
import { Container } from '@/components/ui/container'
import { Tabs } from '@/components/ui/tabs'
import { useDestination } from '@/contexts/useDestination'
import { useDestinationData } from '@/queries'
import { getDestinations, getDefaultDestination } from '@/queries/destinations'
import { cn } from '@/lib/utils'

const DestinationPicker = () => {
  const { destination, setDestination } = useDestination()
  const { data, isLoading, error } = useDestinationData()

  // Get destinations with fallback logic using centralized function
  const destinations = getDestinations(data, !!error)
  const hasError = error && !data

  // Error handling for failed requests
  useEffect(() => {
    if (error) {
      console.error('Failed to fetch destinations:', error)
      // Could integrate with error tracking service here
    }
  }, [error])

  // Default destination selection logic - integrates with destination context initialization
  useEffect(() => {
    // Only run when we have fresh destination data, not on every destination change
    if (!isLoading && destinations.length > 0 && data) {
      const defaultDestination = getDefaultDestination(destinations)

      // Only proceed if we have a valid default destination
      if (!defaultDestination) {
        console.warn('No default destination available')
        return
      }

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
  }, [
    destinations,
    isLoading,
    data,
    destination.id,
    destination.name,
    setDestination,
  ])

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
    'overflow-hidden transition-all duration-300 ease-in-out bottom-0 sticky bg-accent z-20',
    isLoading ||
      (hasError && destinations.length === 0) ||
      destinations.length === 0
      ? 'py-0 h-0'
      : 'py-8 h-auto'
  )

  // Don't render anything if no destinations are available (after loading completes)
  if (!isLoading && destinations.length === 0) {
    if (hasError) {
      console.warn('Failed to load destinations and no fallback available')
    }
    return null
  }

  return (
    <Container
      wrapperClassName={wrapperClasses}
      contentClassName="flex flex-col bg-background -m-4 p-4 rounded-lg"
    >
      {!isLoading && destinations.length > 0 && (
        <>
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
