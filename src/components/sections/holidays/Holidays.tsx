import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/fadeCarousel/fadeCarousel'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { HolidayCard } from './HolidayCard'
import { HolidayCardSkeleton } from './HolidayCardSkeleton'
import { useHolidayData, filterOptions } from './holidayData'
import { useDestination } from '@/contexts'
import { useState, useCallback, useMemo } from 'react'
import type { Holiday } from './types'

function Holidays() {
  const [activeTab, setActiveTab] = useState('Last Minute')
  const { destination } = useDestination()
  const { holidays, isLoading } = useHolidayData(
    destination.id,
    destination.name
  )

  // Memoize the tab change handler
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  // Filter logic for each tab
  const getFilteredHolidays = useCallback(
    (holidays: Holiday[], filter: string) => {
      const filters: Record<string, (holiday: Holiday) => boolean> = {
        'Under £400pp': (holiday) => holiday.price <= 400,
        '5-Star': (holiday) => holiday.stars === 5,
        'Last Minute': (holiday) => holiday.stars >= 3,
        'All Inclusive': (holiday) => holiday.stars >= 3,
        'City Breaks': (holiday) => holiday.stars >= 3,
      }

      const filterFn = filters[filter]
      return filterFn ? holidays.filter(filterFn) : holidays
    },
    []
  )

  // Apply filtering and memoize results
  const filteredHolidays = useMemo(() => {
    return getFilteredHolidays(holidays, activeTab)
  }, [holidays, activeTab, getFilteredHolidays])

  // Memoize the skeleton items
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

  // Memoize the holiday items to prevent recreation when holidays array reference changes
  const holidayItems = useMemo(
    () =>
      filteredHolidays.map((holiday) => (
        <CarouselItem
          key={holiday.id}
          className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          <HolidayCard holiday={holiday} />
        </CarouselItem>
      )),
    [filteredHolidays]
  )

  // Hide component if no data and not loading
  if (!isLoading && holidays.length === 0) {
    return null
  }

  return (
    <Container
      wrapperClassName="py-8 md:py-12 overflow-hidden"
      contentClassName="flex flex-col gap-6 items-start"
    >
      {/* Header */}
      <div className="w-full">
        <h2 className="text-foreground mb-6 text-2xl font-bold md:text-3xl">
          Holidays to {destination.name}
        </h2>

        {/* Filter Tabs */}
        <Tabs
          tabs={filterOptions}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Carousel */}
      <div className="relative h-108 w-full">
        <Carousel
          opts={{
            loop: true,
            align: 'start',
            dragFree: true,
          }}
          className="size-full"
        >
          <CarouselContent className="mt-2 h-full pb-4 pl-4">
            {isLoading ? skeletonItems : holidayItems}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </Carousel>
      </div>

      {/* View All Button */}
      <Button
        variant="outline"
        className="rounded-full px-6"
        disabled={filteredHolidays.length <= 4}
      >
        View all {activeTab} holidays
      </Button>
    </Container>
  )
}

export { Holidays }
