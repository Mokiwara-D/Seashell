import { SiTrustpilot } from 'react-icons/si'
import { TiStarFullOutline } from 'react-icons/ti'
import { cn } from '@/lib/utils'

interface RatingProps {
  rating: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'trustpilot' | 'tripadvisor'
  mode?: 'integer' | 'half' | 'decimal'
  className?: string
}

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
}

function Rating({
  rating,
  size = 'sm',
  variant = 'default',
  mode = 'half',
  className = '',
}: RatingProps) {
  const normalizedRating = Math.max(0, Math.min(5, rating))
  const processedRating =
    mode === 'integer'
      ? Math.round(normalizedRating)
      : mode === 'half'
        ? Math.round(normalizedRating * 2) / 2
        : Math.round(normalizedRating * 10) / 10

  const renderTripAdvisorCircle = (index: number) => {
    const position = index + 1

    if (position <= Math.floor(processedRating)) {
      return (
        <div
          className={cn(
            sizeClasses[size],
            'bg-green flex-shrink-0 rounded-full'
          )}
        />
      )
    } else if (
      position === Math.ceil(processedRating) &&
      processedRating % 1 !== 0
    ) {
      const percentage = (processedRating % 1) * 100
      return (
        <div
          className={cn(
            sizeClasses[size],
            'border-green bg-muted-foreground/20 relative flex-shrink-0 overflow-hidden rounded-full border'
          )}
        >
          <div
            className={cn(
              sizeClasses[size],
              'bg-green absolute top-0 left-0 rounded-tl-full rounded-bl-full'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )
    } else {
      return (
        <div
          className={cn(
            sizeClasses[size],
            'border-green bg-muted-foreground/20 flex-shrink-0 rounded-full border'
          )}
        />
      )
    }
  }

  if (variant === 'tripadvisor') {
    return (
      <div className={cn('flex items-center gap-0.5', className)}>
        {[...Array(5)].map((_, i) => (
          <div key={i}>{renderTripAdvisorCircle(i)}</div>
        ))}
      </div>
    )
  }

  const Icon = variant === 'trustpilot' ? SiTrustpilot : TiStarFullOutline

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(5)].map((_, i) => {
        const position = i + 1
        const isFullStar = position <= Math.floor(processedRating)
        const isHalfStar =
          position === Math.ceil(processedRating) && processedRating % 1 !== 0

        if (variant === 'trustpilot') {
          const baseClasses = cn(
            sizeClasses[size],
            'rounded-xs p-0.5 text-white bg-muted-foreground/20'
          )

          let starClasses = baseClasses

          if (isFullStar) {
            starClasses = cn(baseClasses, 'bg-green')
          } else if (isHalfStar) {
            starClasses = cn(
              baseClasses,
              'bg-gradient-to-r from-green from-50% to-muted-foreground/20 to-50%'
            )
          }

          return <Icon key={i} className={starClasses} />
        } else {
          // Default variant - foreground stars with muted background
          const baseClasses = cn(sizeClasses[size], 'text-muted-foreground')

          let starClasses = baseClasses

          if (isFullStar) {
            starClasses = cn(sizeClasses[size], 'text-foreground')
          } else if (isHalfStar) {
            // For half stars in default variant, we'll use a simpler approach
            starClasses = cn(sizeClasses[size], 'text-foreground')
          }

          return <Icon key={i} className={starClasses} />
        }
      })}
    </div>
  )
}

export { Rating }
