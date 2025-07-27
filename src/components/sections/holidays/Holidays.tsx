import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/fadeCarousel/fadeCarousel'
import { Button } from '@/components/ui/button'
import { HolidayCard } from './HolidayCard'
import { HolidayCardSkeleton } from './HolidayCardSkeleton'
import { useHolidayData, filterOptions } from './holidayData'
import { useFilterManager } from '@/query/hooks/useFilterManager'
import { useDestination } from '@/contexts'

import { useMemo } from 'react'
import { NoResults } from '@/components/ui/errors/noResults'
import { ResultsError } from '@/components/ui/errors/resultsError'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

function Holidays() {
  const { destination } = useDestination()

  // Filter management
  const {
    activeFilters,
    combinedVariables,
    toggleFilter,
    isFilterActive,
    hasActiveFilters,
    clearFilters,
  } = useFilterManager()

  // Holiday data with infinite query
  const {
    holidays,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    totalCount, // This is now the adjusted total count
    canLoadMore,
    allItemsLoaded,
    error,
    refetch,
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

  // Memoize holiday items
  const holidayItems = useMemo(() => {
    // Create a unique key prefix based on current query to prevent duplicates during filter changes
    const queryPrefix = `${destination.id}-${activeFilters.sort().join(',')}`

    const items = holidays.map((holiday, index) => (
      <CarouselItem
        key={`${queryPrefix}-${holiday.id}-${index}`}
        className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      >
        <HolidayCard holiday={holiday} />
      </CarouselItem>
    ))

    // Add loading items if fetching next page
    if (isFetchingNextPage) {
      const loadingItems = Array.from({ length: 8 }, (_, index) => (
        <CarouselItem
          key={`${queryPrefix}-loading-${index}`}
          className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
        >
          <HolidayCardSkeleton />
        </CarouselItem>
      ))
      items.push(...loadingItems)
    }

    return items
  }, [holidays, isFetchingNextPage, destination.id, activeFilters])

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
          align: 'start',
          dragFree: true,
          loop: allItemsLoaded && holidays.length > 4, // Enable loop when all items are loaded and more than 4 items
        }}
        isFullHeight={true}
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
              Holidays to {destination.name}
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

          {/* Loading indicator for larger screens */}
          {(isLoadingNewFilter || isFetchingNextPage || isInitialLoading) && (
            <div className="hidden items-center gap-2 md:flex">
              <Loader2
                className="text-muted-foreground animate-spin"
                size={32}
              />
              <span className="text-muted-foreground text-lg">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mb-4 h-108 w-full">
        {/* Loading overlay for mobile */}
        {isLoadingNewFilter && (
          <div className="bg-background/10 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-xs md:hidden">
            <div className="flex items-center gap-2">
              <Loader2
                className="text-muted-foreground animate-spin"
                size={32}
              />
              <span className="text-muted-foreground text-lg">Loading...</span>
            </div>
          </div>
        )}

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
          <span className="font-bold">{destination.name}</span>
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
