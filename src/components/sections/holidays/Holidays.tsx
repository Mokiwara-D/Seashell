import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/fadeCarousel/fadeCarousel'
import { Button } from '@/components/ui/button'
import { HolidayCard } from './HolidayCard'
import { HolidayCardSkeleton } from './HolidayCardSkeleton'
import { useHolidayData, filterOptions } from './holidayData'
import { useFilterManager } from '@/query/hooks/useFilterManager'
import { useDestination } from '@/contexts'

import { useMemo, useEffect, useState, useRef } from 'react'
import { NoResults } from '@/components/ui/errors/noResults'
import { ResultsError } from '@/components/ui/errors/resultsError'
import { Loading } from '@/components/ui/loading'
import { cn } from '@/lib/utils'

function Holidays() {
  const { destination } = useDestination()
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  // Filter management
  const {
    activeFilters,
    combinedVariables,
    toggleFilter,
    isFilterActive,
    hasActiveFilters,
    clearFilters,
  } = useFilterManager()

  // Holiday data with infinite query - destination name is managed automatically
  const {
    holidays,
    displayDestinationName,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    totalCount,
    canLoadMore,
    allItemsLoaded,
    error,
    refetch,
    isPlaceholderData,
  } = useHolidayData(
    destination.id,
    destination.name,
    combinedVariables,
    activeFilters
  )

  // Simple loading states
  const isInitialLoading = isLoading && holidays.length === 0
  const isLoadingNewFilter =
    isFetching && !isFetchingNextPage && holidays.length > 0

  // Track previous destination and filters to detect actual changes
  const previousQueryRef = useRef<{
    destinationId: number
    filters: string[]
  }>({ destinationId: destination.id, filters: activeFilters })

  // Reset carousel scroll position ONLY when destination or filters change
  useEffect(() => {
    const currentQuery = {
      destinationId: destination.id,
      filters: activeFilters,
    }

    // Check if destination or filters actually changed
    const destinationChanged =
      previousQueryRef.current.destinationId !== currentQuery.destinationId
    const filtersChanged =
      JSON.stringify(previousQueryRef.current.filters.sort()) !==
      JSON.stringify(currentQuery.filters.sort())

    if (
      (destinationChanged || filtersChanged) &&
      carouselApi &&
      !isPlaceholderData &&
      holidays.length > 0
    ) {
      // Update the previous query ref
      previousQueryRef.current = currentQuery

      // Small delay to ensure new content has rendered
      const timer = setTimeout(() => {
        carouselApi.scrollTo(0)
      }, 150)
      return () => clearTimeout(timer)
    }

    // Always update the ref for next comparison
    previousQueryRef.current = currentQuery
  }, [
    destination.id,
    activeFilters,
    carouselApi,
    isPlaceholderData,
    holidays.length,
  ])

  // Memoize skeleton items (reduced to 4 for initial load)
  const skeletonItems = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => (
        <CarouselItem
          key={`skeleton-${index}`}
          className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
        >
          <HolidayCardSkeleton />
        </CarouselItem>
      )),
    []
  )

  // Stable key prefix that doesn't change during placeholder data
  const stableQueryPrefix = useMemo(() => {
    // Only update the prefix when we have real data (not placeholder)
    if (!isPlaceholderData) {
      return `${destination.id}-${activeFilters.sort().join(',')}`
    }
    // During placeholder data, return a stable prefix to prevent re-renders
    return 'stable-placeholder'
  }, [destination.id, activeFilters, isPlaceholderData])

  // Memoize holiday items with stable references during transitions
  const holidayItems = useMemo(() => {
    // Don't regenerate items during placeholder data transitions
    if (isPlaceholderData && holidays.length === 0) {
      return []
    }

    const items = holidays.map((holiday, index) => (
      <CarouselItem
        key={`${stableQueryPrefix}-${holiday.id}-${index}`}
        className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      >
        <HolidayCard holiday={holiday} isPlaceholderData={isPlaceholderData} />
      </CarouselItem>
    ))

    return items
  }, [holidays, stableQueryPrefix, isPlaceholderData])

  // Determine carousel content
  const renderCarouselContent = () => {
    // Handle error state
    if (error && holidays.length === 0) {
      return <ResultsError onRetry={() => refetch()} />
    }

    // Handle no results
    if (!isInitialLoading && holidays.length === 0 && !error) {
      return <NoResults />
    }

    // Render carousel
    return (
      <Carousel
        opts={{
          align: 'start' as const,
          dragFree: true,
          loop: !isPlaceholderData && allItemsLoaded && holidays.length > 4,
          watchSlides: true, // Enable automatic slide detection for pagination
          watchResize: true, // Keep resize watching for responsive behavior
        }}
        isFullHeight={true}
        setApi={setCarouselApi}
      >
        <CarouselContent className="h-full">
          {isInitialLoading ? skeletonItems : holidayItems}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext
          hasNextPage={canLoadMore}
          onLoadMore={fetchNextPage}
          isLoadingMore={isFetchingNextPage}
        />
      </Carousel>
    )
  }

  return (
    <Container
      wrapperClassName="py-8 md:py-12 overflow-hidden"
      contentClassName="flex flex-col items-start"
    >
      {/* Header */}
      <div className="w-full">
        <div className="mb-4 flex items-end justify-between">
          {/* Title and Filters */}
          <div className="w-full md:w-auto">
            <h2 className="text-foreground mb-4 text-center text-2xl font-bold md:mb-6 md:text-left md:text-3xl">
              Holidays to {displayDestinationName}
            </h2>

            {/* Filter Buttons */}
            <div className="flex w-full flex-wrap justify-center gap-2 gap-x-2 md:justify-start md:gap-x-4">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={isFilterActive(filter) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className={cn(
                    'rounded-full text-sm transition-all',
                    isFilterActive(filter)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-secondary'
                  )}
                >
                  {filter}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="text-muted-foreground hover:text-foreground rounded-full text-sm"
              >
                Clear all
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mb-4 h-108 w-full">
        {/* Loading - show during any loading state, but respect smooth transitions */}
        {(isInitialLoading ||
          isLoadingNewFilter ||
          isFetchingNextPage ||
          (isLoading && holidays.length === 0)) && <Loading />}

        {renderCarouselContent()}
      </div>

      {/* Footer */}
      <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row md:items-start">
        <div className="text-muted-foreground text-center text-sm md:text-left">
          Viewing {holidays.length} of {totalCount}
          <span className="font-bold"> Discounted</span>
          {activeFilters.length > 0 && (
            <span className="font-bold">
              {', '}
              {activeFilters.join(', ')}
            </span>
          )}
          <span> holidays to </span>
          <span className="font-bold">{displayDestinationName}</span>
        </div>
        <div className="grow" />
        <Button variant="outline" className="rounded-full px-6" disabled={true}>
          View all holidays
        </Button>
      </div>
    </Container>
  )
}

export { Holidays }
