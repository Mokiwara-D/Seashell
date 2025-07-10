import { Card, CardContent } from '@/components/ui/card'
import type { Destination } from './destinationData'

interface DestinationCardProps {
  destination: Destination
}

function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="gap-4 border-none bg-transparent not-even:overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>
      <CardContent className="flex grow flex-col justify-between gap-2">
        <h3 className="text-xl font-bold">{destination.name}</h3>

        <p className="text-sm leading-relaxed">{destination.description}</p>

        <div className="mt-auto font-bold">
          <span className="text-sm">from </span>
          <span className="text-xl">£{destination.priceFrom}</span>
          <span className="text-sm"> pp</span>
        </div>
      </CardContent>
    </Card>
  )
}

export { DestinationCard }
