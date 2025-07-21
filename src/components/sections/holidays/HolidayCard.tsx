import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { TripAdvisorBadge } from './TripAdvisorBadge'
import { placeholder } from '@/lib/imagePreloader'
import { useState, useEffect } from 'react'
import type { Holiday } from './types'

interface HolidayCardProps {
  holiday: Holiday
}

function HolidayCard({ holiday }: HolidayCardProps) {
  // Start with placeholder by default
  const [imageSrc, setImageSrc] = useState(placeholder)

  // Try to load the API image in the background
  useEffect(() => {
    // Only try to load if we have a different image URL than placeholder
    if (holiday.image && holiday.image !== placeholder) {
      const img = new Image()

      img.onload = () => {
        // Only replace placeholder if API image loads successfully
        setImageSrc(holiday.image)
      }

      img.onerror = () => {
        // Keep placeholder on error (no action needed)
      }

      img.src = holiday.image
    }
  }, [holiday.image])

  return (
    <Card className="border-border bg-card h-full overflow-hidden shadow-sm transition-all hover:scale-102 hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={holiday.name}
          className="h-full w-full object-cover"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>
      <CardContent className="flex grow flex-col justify-between pb-6">
        <div>
          <h3 className="text-foreground mb-1 truncate text-sm font-semibold">
            {holiday.name}
          </h3>
          <p className="text-muted-foreground mb-2 text-xs">
            {holiday.location}
          </p>
          <div className="flex flex-wrap items-start justify-between gap-1">
            {holiday.stars > 0 && (
              <Rating rating={holiday.stars} variant="default" />
            )}
            {holiday.tripAdvisorReviews > 0 && (
              <TripAdvisorBadge
                rating={holiday.tripAdvisorRating}
                reviews={holiday.tripAdvisorReviews}
              />
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end">
          <h3 className="text-foreground text-3xl leading-none font-bold">
            £{Math.round(holiday.price)}
          </h3>
          <h3 className="text-md font-bold">pp</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export { HolidayCard }
