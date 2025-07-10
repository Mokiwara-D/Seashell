import { TiStarFullOutline } from 'react-icons/ti'
import { SiTrustpilot } from 'react-icons/si'
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
          {[...Array(5)].map((_, i) => (
            <TiStarFullOutline
              key={i}
              className={`h-6 w-6 ${
                i < data.stars ? 'text-green-500' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Review Count */}
        <p className="text-xs">
          Based on{' '}
          <span className="underline">{data.totalReviews} reviews</span>
        </p>
      </div>

      {/* Trustpilot Logo */}
      <div className="flex items-center">
        <SiTrustpilot className="h-5 w-5 text-green-500" />
        <span className="font-bold">Trustpilot</span>
      </div>
    </div>
  )
}

export { TrustpilotBadge }
