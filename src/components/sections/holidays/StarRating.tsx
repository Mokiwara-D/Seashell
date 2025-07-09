import { TiStarFullOutline } from 'react-icons/ti'

interface StarRatingProps {
  stars: number
}

function StarRating({ stars }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < stars ? 'text-foreground' : 'text-gray-300'}`}
        >
          <TiStarFullOutline className="h-4 w-4" />
        </span>
      ))}
    </div>
  )
}

export { StarRating }
