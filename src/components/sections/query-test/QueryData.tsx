import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
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

// Types - Single Responsibility Principle
interface OfferData {
  accommodation: {
    id: number
    name: string
    resort: {
      regions: { name: string }[]
    }
  }
}

interface CardData {
  id: string | number
  name: string
  location: string
  isLoading: boolean
}

// Constants - DRY Principle
const LOADING_SKELETON_COUNT = 6
const LOADING_TEXT = 'Loading...'

// Pure functions - Single Responsibility & DRY
const createLoadingCards = (count: number): CardData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `skeleton-${i}`,
    name: LOADING_TEXT,
    location: LOADING_TEXT,
    isLoading: true,
  }))

const transformOfferToCard = (
  offer: OfferData,
  destinationName: string
): CardData => ({
  id: offer.accommodation.id,
  name: offer.accommodation.name,
  location: formatLocationText(offer.accommodation, destinationName),
  isLoading: false,
})

// Main transformation function - Open/Closed Principle
const createCardData = (
  offers: OfferData[],
  destinationName: string,
  isLoading: boolean
): CardData[] => {
  if (isLoading) {
    return createLoadingCards(LOADING_SKELETON_COUNT)
  }

  return offers.map((offer) => transformOfferToCard(offer, destinationName))
}

// Component for individual card rendering - Single Responsibility
const OfferCard = ({ card }: { card: CardData }) => (
  <Card className="min-h-48 py-8">
    <CardHeader>
      {card.isLoading ? (
        <Skeleton className="h-6 w-3/4" />
      ) : (
        <CardTitle>{card.name}</CardTitle>
      )}
    </CardHeader>
    <CardContent>
      {card.isLoading ? (
        <Skeleton className="h-4 w-1/2" />
      ) : (
        card.location && (
          <p className="text-muted-foreground text-sm">{card.location}</p>
        )
      )}
    </CardContent>
  </Card>
)

// Custom hook for data fetching - Separation of Concerns
const useOfferData = (destinationId: number) => {
  return useQuery({
    queryKey: ['offers', destinationId],
    queryFn: () => fetchGraphQL(createOffersQuery(destinationId)),
    staleTime: 1800000, // 30 minutes
  })
}

const QueryData = () => {
  const { destination } = useDestination()
  const { data, isLoading, error } = useOfferData(destination.id)

  // Memoize card data transformation - Performance optimization
  const cardData = useMemo(
    () =>
      createCardData(data?.offers.result || [], destination.name, isLoading),
    [data?.offers.result, destination.name, isLoading]
  )

  if (error) return <>Error: {(error as Error).message}</>

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
        {cardData.map((card) => (
          <CarouselItem
            key={card.id}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <OfferCard card={card} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { QueryData }
