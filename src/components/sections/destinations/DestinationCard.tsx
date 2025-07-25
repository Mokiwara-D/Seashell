import { Card, CardContent } from '@/components/ui/card'
import { placeholder } from '@/lib/imagePreloader'
import { useState, useEffect, useCallback, memo } from 'react'
import type { Destination } from './types'

interface DestinationCardProps {
  destination: Destination
}

const DestinationCard = memo(function DestinationCard({
  destination,
}: DestinationCardProps) {
  // Start with placeholder by default
  const [imageSrc, setImageSrc] = useState(placeholder)

  // Memoize the image loading callbacks
  const handleImageLoad = useCallback(() => {
    setImageSrc(destination.image)
  }, [destination.image])

  const handleImageError = useCallback(() => {
    // Keep placeholder on error (no action needed)
  }, [])

  // Try to load the API image in the background
  useEffect(() => {
    // Only try to load if we have a different image URL than placeholder
    if (destination.image && destination.image !== placeholder) {
      const img = new Image()

      img.onload = handleImageLoad
      img.onerror = handleImageError
      img.src = destination.image

      // Cleanup function
      return () => {
        img.onload = null
        img.onerror = null
      }
    }
  }, [destination.image, handleImageLoad, handleImageError])

  return (
    <Card className="h-fit max-h-108 gap-4 border-none bg-transparent not-even:overflow-hidden">
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
      <CardContent className="flex grow flex-col justify-start">
        <h3 className="text-xl font-bold">{destination.name}</h3>

        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {destination.description}
        </p>

        <div className="flex items-end pt-4">
          <span className="mr-1.5 text-sm">from</span>
          <h3 className="text-2xl leading-none font-bold">
            £{Math.round(destination.priceFrom)}
          </h3>
          <h3 className="text-sm font-bold"> pp</h3>
        </div>
      </CardContent>
    </Card>
  )
})

export { DestinationCard }
