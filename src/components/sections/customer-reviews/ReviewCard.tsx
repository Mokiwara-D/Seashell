import { Card, CardContent } from '@/components/ui/card'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { StarRating } from './StarRating'
import type { CustomerReview } from './customerReviewsData'

interface ReviewCardProps {
  review: CustomerReview
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="overflow-hidden border-none bg-white">
      <CardContent className="flex flex-col gap-3 p-4">
        {/* Stars and Verified Badge */}
        <div className="flex items-center justify-start gap-2">
          <StarRating rating={review.rating} size="sm" />
          {review.isVerified && (
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <IoCheckmarkCircle className="h-4 w-4" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Review Text */}
        <p className="line-clamp-3 text-sm leading-relaxed">{review.text}</p>

        {/* Customer Info */}
        <div className="text-muted-foreground mt-auto text-xs">
          <span className="font-medium">{review.customerName}</span>
          <span className="mx-1">•</span>
          <span>{review.timeAgo}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export { ReviewCard }
