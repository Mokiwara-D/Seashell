import { Card, CardContent } from '@/components/ui/card'
import { placeholder } from '@/lib/imagePreloader'
import { useState, useEffect } from 'react'
import type { Destination } from './types'

interface DestinationCardProps {
  destination: Destination
}

function DestinationCard({ destination }: DestinationCardProps) {
  // Start with placeholder by default
  const [imageSrc, setImageSrc] = useState(placeholder)

  // Try to load the API image in the background
  useEffect(() => {
    // Only try to load if we have a different image URL than placeholder
    if (destination.image && destination.image !== placeholder) {
      const img = new Image()

      img.onload = () => {
        // Only replace placeholder if API image loads successfully
        setImageSrc(destination.image)
      }

      img.onerror = () => {
        // Keep placeholder on error (no action needed)
      }

      img.src = destination.image
    }
  }, [destination.image])

  return (
    <Card className="h-full gap-4 border-none bg-transparent not-even:overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={destination.name}
          className="h-full w-full object-cover"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>
      <CardContent className="flex grow flex-col justify-between">
        <h3 className="text-xl font-bold">{destination.name}</h3>

        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {destination.description}
        </p>

        <div className="mt-auto flex items-end pt-4">
          <span className="mr-1.5 text-sm">from</span>
          <h3 className="text-2xl leading-none font-bold">
            £{Math.round(destination.priceFrom)}
          </h3>
          <h3 className="text-sm font-bold"> pp</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export { DestinationCard }
