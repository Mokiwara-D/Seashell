import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { HolidayCard } from './HolidayCard'
import { HolidayCardSkeleton } from './HolidayCardSkeleton'
import { useHolidayData, filterOptions } from './holidayData'
import { useImagePreloader } from '@/lib/imagePreloader'
import { useState, useEffect } from 'react'

function Holidays() {
  const [activeTab, setActiveTab] = useState('Last Minute')
  const { holidays, isLoading } = useHolidayData(188) // Greek Islands destination ID
  const { preloadBatch } = useImagePreloader()

  // Preload holiday images when data is loaded
  useEffect(() => {
    if (holidays.length > 0) {
      const imageUrls = holidays.map((holiday) => holiday.image).filter(Boolean)
      preloadBatch(imageUrls).catch(console.warn)
    }
  }, [holidays, preloadBatch])

  // Hide component if no data and not loading
  if (!isLoading && holidays.length === 0) {
    return null
  }

  return (
    <Container
      wrapperClassName="py-8 md:py-12"
      contentClassName="flex flex-col gap-6 items-start"
    >
      {/* Header */}
      <div className="w-full">
        <h2 className="text-foreground mb-6 text-2xl font-bold md:text-3xl">
          Holidays to Spain
        </h2>

        {/* Filter Tabs */}
        <Tabs
          tabs={filterOptions}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Carousel */}
      <div className="relative w-full">
        <Carousel
          opts={{
            loop: true,
            align: 'start',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="my-2">
            {isLoading
              ? // Show skeleton cards while loading
                Array.from({ length: 4 }, (_, index) => (
                  <CarouselItem
                    key={`skeleton-${index}`}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <HolidayCardSkeleton />
                  </CarouselItem>
                ))
              : // Show actual holiday cards
                holidays.map((holiday) => (
                  <CarouselItem
                    key={holiday.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <HolidayCard holiday={holiday} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* View All Button */}
      <Button variant="outline" className="rounded-full px-6">
        View all {activeTab} holidays
      </Button>
    </Container>
  )
}

export { Holidays }
