import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL, OFFERS_QUERY } from '@/lib/graphql'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const QueryData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['offers'],
    queryFn: () => fetchGraphQL(OFFERS_QUERY),
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
                  regions: { destinations: { id: number; name: string }[] }[]
                }
              }
            },
            index: number
          ) => {
            // Extract destination name from the nested structure
            const destinationName =
              offer.accommodation.resort?.regions?.[0]?.destinations?.[0]
                ?.name || 'Unknown Destination'

            return (
              <CarouselItem
                key={isLoading ? `skeleton-${index}` : offer.accommodation.id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <Card className="min-h-48 py-8">
                  <CardHeader>
                    {isLoading ? (
                      <Skeleton className="h-6 w-3/4" />
                    ) : (
                      <CardTitle>{offer.accommodation.name}</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-4 w-1/2" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {destinationName}
                      </p>
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
