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
import { holidayData, filterOptions } from './holidayData'
import { useState } from 'react'

function Holidays() {
  const [activeTab, setActiveTab] = useState('Last Minute')
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
            align: 'start',
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {holidayData.map((holiday) => (
              <CarouselItem
                key={holiday.id}
                className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
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

      <Button
        variant="outline"
        className="border-border bg-background text-foreground hover:bg-muted rounded-full px-6"
      >
        View all Last Minute holidays
      </Button>
    </Container>
  )
}

export { Holidays }
