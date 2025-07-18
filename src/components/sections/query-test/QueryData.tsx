import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL, OFFERS_QUERY } from '@/lib/react-query/graphql'
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

  const names = isLoading
    ? Array.from({ length: 6 }, (_, i) => `loading-${i}`)
    : data!.offers.result.map(
        (offer: { accommodation: { name: string } }) => offer.accommodation.name
      )

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        align: 'start',
      }}
    >
      <CarouselContent>
        {names.map((name: string, index: number) => (
          <CarouselItem
            key={isLoading ? `skeleton-${index}` : index}
            className="md:basis-1/2 lg:basis-1/4"
          >
            <Card className="min-h-48 py-8">
              <CardHeader>
                {isLoading ? (
                  <Skeleton className="h-6 w-3/4" />
                ) : (
                  <CardTitle>{name}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-4 w-1/2" />
                ) : (
                  <p className="text-muted-foreground text-sm">TEMP</p>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { QueryData }
