import { SiTrustpilot } from 'react-icons/si'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function StarRating({ rating, size = 'sm', className = '' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(5)].map((_, i) => {
        const position = i + 1
        const isFullStar = position <= Math.floor(rating)
        const isHalfStar = position === Math.ceil(rating) && rating % 1 !== 0

        let starClasses = `${sizeClasses[size]} rounded-xs p-0.5 text-white `

        if (isFullStar) {
          starClasses += 'bg-trustpilot-green'
        } else if (isHalfStar) {
          starClasses +=
            'bg-gradient-to-r from-trustpilot-green from-50% to-muted-foreground/20 to-50%'
        } else {
          starClasses += 'bg-muted-foreground/20'
        }

        return <SiTrustpilot key={i} className={starClasses} />
      })}
    </div>
  )
}

export { StarRating }
