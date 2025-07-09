import { SiTripadvisor } from 'react-icons/si'

interface TripAdvisorBadgeProps {
  rating: number
  reviews: number
}

function TripAdvisorBadge({ rating, reviews }: TripAdvisorBadgeProps) {
  const renderCircle = (index: number) => {
    const position = index + 1

    if (position <= Math.floor(rating)) {
      // Fully filled circle
      return <div className="h-3 w-3 flex-shrink-0 rounded-full bg-green-500" />
    } else if (position === Math.ceil(rating) && rating % 1 !== 0) {
      // Partially filled circle
      const percentage = (rating % 1) * 100
      return (
        <div className="relative h-3 w-3 flex-shrink-0 overflow-hidden rounded-full border-1 border-green-500 bg-gray-300">
          <div
            className="absolute top-0 left-0 h-3 w-3 rounded-tl-full rounded-bl-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )
    } else {
      // Empty circle
      return (
        <div className="h-3 w-3 flex-shrink-0 rounded-full border-1 border-green-500 bg-gray-300" />
      )
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1">
        <SiTripadvisor className="h-4 w-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i}>{renderCircle(i)}</div>
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {reviews.toLocaleString()} reviews
      </span>
    </div>
  )
}

export { TripAdvisorBadge }
