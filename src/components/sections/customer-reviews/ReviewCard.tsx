import { Card, CardContent } from '@/components/ui/card'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { Rating } from '@/components/ui/rating'
import { memo } from 'react'
import type { CustomerReview } from './customerReviewsData'

interface ReviewCardProps {
  review: CustomerReview
}

const ReviewCard = memo(function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="overflow-hidden border-none bg-transparent text-center md:text-left">
      <CardContent className="flex flex-col gap-1 px-2">
        {/* Stars and Verified Badge */}
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Rating rating={review.rating} size="sm" variant="trustpilot" />
          {review.isVerified && (
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <IoCheckmarkCircle className="h-4 w-4" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Review Title */}
        <h3 className="overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap">
          {review.title}
        </h3>

        {/* Review Text */}
        <p className="line-clamp-2 text-xs leading-snug tracking-tight">
          {review.text}
        </p>

        {/* Customer Info */}
        <div className="text-muted-foreground text-xs leading-snug tracking-tight">
          <span className="font-medium">{review.customerName}</span>
          <span>, </span>
          <span>{review.timeAgo}</span>
        </div>
      </CardContent>
    </Card>
  )
})

export { ReviewCard }
