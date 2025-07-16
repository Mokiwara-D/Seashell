import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { TripAdvisorBadge } from './TripAdvisorBadge'
import type { Holiday } from './holidayData'

interface HolidayCardProps {
  holiday: Holiday
}

function HolidayCard({ holiday }: HolidayCardProps) {
  return (
    <Card className="border-border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={holiday.image}
          alt={holiday.name}
          className="h-full w-full object-cover"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>
      <CardContent className="flex flex-col justify-between pb-6">
        <div>
          <h3 className="text-foreground mb-1 text-sm font-semibold">
            {holiday.name}
          </h3>
          <p className="text-muted-foreground mb-4 text-xs">
            {holiday.location}
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-2">
          <Rating rating={holiday.stars} variant="default" mode="integer" />
          <TripAdvisorBadge
            rating={holiday.tripAdvisorRating}
            reviews={holiday.tripAdvisorReviews}
          />
        </div>

        <div className="mt-4 flex items-end">
          <h3 className="text-foreground text-2xl leading-none font-bold">
            £{holiday.price}
          </h3>
          <h3 className="text-sm font-bold">pp</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export { HolidayCard }
