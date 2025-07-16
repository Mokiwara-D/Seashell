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
      <CardContent className="flex grow flex-col justify-between">
        <h3 className="text-xl font-bold">{destination.name}</h3>

        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {destination.description}
        </p>

        <div className="mt-auto flex items-end pt-4">
          <span className="mr-1.5 text-sm">from</span>
          <h3 className="text-2xl leading-none font-bold">
            £{destination.priceFrom}
          </h3>
          <h3 className="text-sm font-bold"> pp</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export { DestinationCard }
