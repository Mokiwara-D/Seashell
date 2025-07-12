import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { TripAdvisorBadge } from './TripAdvisorBadge'
import type { Holiday } from './holidayData'

interface HolidayCardProps {
  holiday: Holiday
}

function HolidayCard({ holiday }: HolidayCardProps) {
  return (
    <Card className="overflow-hidden border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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
      <CardContent className="flex flex-col justify-between pb-2">
        <div>
          <h3 className="text-foreground mb-1 text-sm font-semibold">
            {holiday.name}
          </h3>
          <p className="text-muted-foreground mb-2 text-xs">
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

        <div className="py-2">
          <span className="text-foreground text-xl font-bold">
            £{holiday.price}
          </span>
          <span className="text-sm font-bold">pp</span>
        </div>
      </CardContent>
    </Card>
  )
}

export { HolidayCard }
