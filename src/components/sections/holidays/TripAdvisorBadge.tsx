import { SiTripadvisor } from 'react-icons/si'
import { Rating } from '@/components/ui/rating'

interface TripAdvisorBadgeProps {
  rating: number
  reviews: number
}

function TripAdvisorBadge({ rating, reviews }: TripAdvisorBadgeProps) {
  return (
    <div className="flex flex-wrap justify-end gap-1">
      <div className="flex items-center gap-1">
        <SiTripadvisor size={16} />
        <Rating rating={rating} variant="tripadvisor" size="xs" />
      </div>
      <span className="text-muted-foreground text-xs">
        {reviews.toLocaleString()} reviews
      </span>
    </div>
  )
}

export { TripAdvisorBadge }
