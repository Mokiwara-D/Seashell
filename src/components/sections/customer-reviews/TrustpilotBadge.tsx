import { SiTrustpilot } from 'react-icons/si'
import { StarRating } from './StarRating'
import type { trustpilotData } from './customerReviewsData'

interface TrustpilotBadgeProps {
  data: typeof trustpilotData
}

function TrustpilotBadge({ data }: TrustpilotBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Excellent Rating */}
      <div className="text-center">
        <h3 className="text-xl text-gray-900">{data.overallRating}</h3>

        {/* Stars */}
        <div className="my-2 flex justify-center">
          <StarRating rating={data.averageRating} size="lg" />
        </div>

        {/* Review Count */}
        <p className="text-xs">
          Based on{' '}
          <span className="underline">{data.totalReviews} reviews</span>
        </p>
      </div>

      {/* Trustpilot Logo */}
      <div className="flex items-center">
        <SiTrustpilot className="text-trustpilot-green h-5 w-5" />
        <span className="font-bold">Trustpilot</span>
      </div>
    </div>
  )
}

export { TrustpilotBadge }
