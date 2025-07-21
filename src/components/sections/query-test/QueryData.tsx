import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL, createOffersQuery } from '@/lib/graphql'
import { formatLocationText } from '@/lib/location-utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDestination } from '@/contexts'

// TypeScript interfaces for GraphQL response data
interface OfferAccommodation {
  id: number
  name: string
  resort: {
    regions: {
      name: string
    }[]
  }
}

interface OfferData {
  accommodation: OfferAccommodation
}

interface OffersResponse {
  offers: {
    result: OfferData[]
  }
}

const useOfferData = (destinationId: number) => {
  return useQuery<OffersResponse>({
    queryKey: ['offers', destinationId],
    queryFn: () => fetchGraphQL(createOffersQuery(destinationId)),
    staleTime: 1800000, // 30 minutes
  })
}

function QueryData() {
  const { destination } = useDestination()
  const { data, isLoading, error } = useOfferData(destination.id)

  const offers = data?.offers.result || []

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <h2 className="text-foreground mb-6 text-2xl font-bold md:text-3xl">
          Offers to {destination.name}
        </h2>
      </div>

      {/* Error Display */}
      {error && (
        <div className="w-full py-8 text-center">
          <p className="text-destructive">Error: {(error as Error).message}</p>
        </div>
      )}

      {/* Carousel */}
      {!error && (
        <div className="relative w-full">
          <Carousel
            opts={{
              loop: false,
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent className="my-2">
              {isLoading
                ? Array.from({ length: 6 }, (_, i) => (
                    <CarouselItem
                      key={`skeleton-${i}`}
                      className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <Card className="min-h-48 py-8">
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))
                : offers.map((offer) => (
                    <CarouselItem
                      key={offer.accommodation.id}
                      className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <Card className="min-h-48 py-8">
                        <CardHeader>
                          <CardTitle>{offer.accommodation.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">
                            {formatLocationText(
                              offer.accommodation,
                              destination.name
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </>
  )
}

export { QueryData }
