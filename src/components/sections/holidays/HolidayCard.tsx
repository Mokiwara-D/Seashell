import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { TripAdvisorBadge } from './TripAdvisorBadge'
import { placeholder } from '@/lib/imagePreloader'
import { useState, useEffect, useCallback, memo, useRef } from 'react'
import type { Holiday } from './types'

interface HolidayCardProps {
  holiday: Holiday
  isPlaceholderData?: boolean
}

// Global image cache to prevent re-loading same images during transitions
const imageCache = new Map<string, string>()

const HolidayCard = memo(function HolidayCard({
  holiday,
  isPlaceholderData = false,
}: HolidayCardProps) {
  // Use cached image if available, otherwise start with placeholder
  const [imageSrc, setImageSrc] = useState(() => {
    return imageCache.get(holiday.image) || placeholder
  })
  
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true)
  
  // Memoize the image loading callback
  const handleImageLoad = useCallback(() => {
    if (isMountedRef.current) {
      imageCache.set(holiday.image, holiday.image)
      setImageSrc(holiday.image)
    }
  }, [holiday.image])

  const handleImageError = useCallback(() => {
    if (isMountedRef.current) {
      imageCache.set(holiday.image, placeholder)
    }
  }, [holiday.image])

  // Load image, but prevent unnecessary loading during placeholder data transitions
  useEffect(() => {
    // Don't reload images during placeholder data transitions
    if (isPlaceholderData) {
      return
    }
    
    // Check cache first
    if (imageCache.has(holiday.image)) {
      const cachedSrc = imageCache.get(holiday.image)!
      if (isMountedRef.current) {
        setImageSrc(cachedSrc)
      }
      return
    }

    // Only try to load if we have a different image URL than placeholder
    if (holiday.image && holiday.image !== placeholder) {
      const img = new Image()

      img.onload = handleImageLoad
      img.onerror = handleImageError
      img.src = holiday.image

      // Cleanup function
      return () => {
        img.onload = null
        img.onerror = null
      }
    }
  }, [holiday.image, handleImageLoad, handleImageError, isPlaceholderData])
  
  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <Card className="border-border bg-card -mb-2 h-full gap-4 overflow-hidden shadow-sm transition-all hover:scale-102 hover:shadow-md">
      <div className="h-54 shrink-0">
        <img
          src={imageSrc}
          alt={holiday.name}
          className="size-full object-cover"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>
      <CardContent className="flex shrink-0 grow flex-col justify-between gap-1 pb-8">
        <h3 className="text-foreground mb-1 truncate text-sm font-semibold">
          {holiday.name}
        </h3>
        <p className="text-muted-foreground mb-2 text-xs">{holiday.location}</p>
        <div className="flex grow items-start justify-between gap-2">
          {holiday.stars > 0 && (
            <Rating rating={holiday.stars} variant="default" />
          )}
          {holiday.tripAdvisorReviews > 0 && (
            <TripAdvisorBadge
              rating={holiday.tripAdvisorRating}
              reviews={holiday.tripAdvisorReviews}
            />
          )}
        </div>
        <div className="mt-5 flex items-end">
          <h3 className="text-foreground text-3xl leading-none font-bold">
            £{Math.round(holiday.price)}
          </h3>
          <h3 className="text-md font-bold">pp</h3>
        </div>
      </CardContent>
    </Card>
  )
}, (prevProps, nextProps) => {
  // Custom comparison to prevent re-renders during placeholder data transitions
  // Only re-render if the holiday data actually changes
  return (
    prevProps.holiday.id === nextProps.holiday.id &&
    prevProps.holiday.image === nextProps.holiday.image &&
    prevProps.holiday.name === nextProps.holiday.name &&
    prevProps.holiday.price === nextProps.holiday.price &&
    prevProps.holiday.location === nextProps.holiday.location &&
    prevProps.holiday.stars === nextProps.holiday.stars &&
    prevProps.holiday.tripAdvisorRating === nextProps.holiday.tripAdvisorRating &&
    prevProps.holiday.tripAdvisorReviews === nextProps.holiday.tripAdvisorReviews &&
    // Only re-render when transitioning from/to placeholder data state if the data is different
    (prevProps.isPlaceholderData === nextProps.isPlaceholderData || 
     prevProps.holiday.id === nextProps.holiday.id)
  )
})

export { HolidayCard }
