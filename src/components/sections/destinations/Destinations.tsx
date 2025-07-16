import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { DestinationCard } from './DestinationCard'
import { destinationData } from './destinationData'

function Destinations() {
  return (
    <Container
      wrapperClassName="py-8 md:py-12 bg-secondary"
      contentClassName="flex flex-col gap-6 items-start"
    >
      {/* Header */}
      <div className="w-full">
        <h2 className="text-foreground mb-6 text-2xl font-bold md:text-3xl">
          Spain Destinations
        </h2>
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
            {destinationData.map((destination) => (
              <CarouselItem
                key={destination.id}
                className="flex basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
              >
                <DestinationCard destination={destination} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-1/3" />
          <CarouselNext className="top-1/3" />
        </Carousel>
      </div>
    </Container>
  )
}

export { Destinations }
