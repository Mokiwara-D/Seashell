import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { DestinationCard } from './DestinationCard'
import { DestinationCardSkeleton } from './DestinationCardSkeleton'
import { useRegionData } from './destinationData'
import { useImagePreloader } from '@/lib/imagePreloader'
import { useDestination } from '@/contexts'
import { useEffect } from 'react'

function Destinations() {
  const { destination } = useDestination()
  const { regions, isLoading } = useRegionData(destination.id)
  const { preloadBatch } = useImagePreloader()

  // Preload region images when data is loaded
  useEffect(() => {
    if (regions.length > 0) {
      const imageUrls = regions.map((region) => region.image).filter(Boolean)
      preloadBatch(imageUrls).catch(console.warn)
    }
  }, [regions, preloadBatch])

  // Hide component if no data and not loading
  if (!isLoading && regions.length === 0) {
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
          {destination.name} Destinations
        </h2>
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
          <CarouselContent>
            {isLoading
              ? // Show skeleton cards while loading
                Array.from({ length: 4 }, (_, index) => (
                  <CarouselItem
                    key={`skeleton-${index}`}
                    className="flex basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <DestinationCardSkeleton />
                  </CarouselItem>
                ))
              : // Show actual destination cards
                regions.map((region) => (
                  <CarouselItem
                    key={region.id}
                    className="flex basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <DestinationCard destination={region} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Container>
  )
}

export { Destinations }
