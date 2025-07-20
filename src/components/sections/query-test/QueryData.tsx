import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL, createOffersQuery } from '@/lib/graphql'
import { formatLocationText, getResortName } from '@/lib/location-utils'
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

const QueryData = () => {
  const { destination } = useDestination()
  const destinationId = destination.id

  const { data, isLoading, error } = useQuery({
    queryKey: ['offers', destinationId],
    queryFn: () => fetchGraphQL(createOffersQuery(destinationId)),
    staleTime: 1800000, // 30 minutes
  })

  if (error) return <>Error: {(error as Error).message}</>

  const offers = isLoading
    ? Array.from({ length: 6 }, (_, i) => ({
        accommodation: {
          name: `loading-${i}`,
          resort: { regions: [{ destinations: [{ name: 'Loading...' }] }] },
        },
      }))
    : data!.offers.result

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        align: 'start',
        dragFree: true,
      }}
    >
      <CarouselContent>
        {offers.map(
          (
            offer: {
              accommodation: {
                id: number
                name: string
                resort: {
                  name: string
                  regions: {
                    name: string
                    destinations: { id: number; name: string }[]
                  }[]
                }
              }
            },
            index: number
          ) => {
            // Extract resort name for card header and format location text
            const resortName = isLoading
              ? 'Loading...'
              : getResortName(offer.accommodation)
            const locationText = isLoading
              ? 'Loading...'
              : formatLocationText(offer.accommodation)

            return (
              <CarouselItem
                key={isLoading ? `skeleton-${index}` : offer.accommodation.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="min-h-48 py-8">
                  <CardHeader>
                    {isLoading ? (
                      <Skeleton className="h-6 w-3/4" />
                    ) : (
                      <CardTitle>{resortName}</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-4 w-1/2" />
                    ) : (
                      locationText && (
                        <p className="text-muted-foreground text-sm">
                          {locationText}
                        </p>
                      )
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          }
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { QueryData }
