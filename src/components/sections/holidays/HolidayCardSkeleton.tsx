import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { placeholder } from '@/lib/imagePreloader'
import { memo } from 'react'

const HolidayCardSkeleton = memo(function HolidayCardSkeleton() {
  return (
    <Card className="border-border bg-card h-full overflow-hidden shadow-sm">
      {/* Image - Use placeholder instead of skeleton */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={placeholder}
          alt="Loading..."
          className="h-full w-full object-cover"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>

      {/* Content Skeleton */}
      <CardContent className="-mb-1 flex h-full grow flex-col justify-between pt-2 pb-6">
        <div>
          {/* Hotel Name */}
          <Skeleton className="mb-1 h-4 w-3/4" />
          {/* Location */}
          <Skeleton className="mb-2 h-3 w-1/2" />
        </div>

        {/* Ratings Section */}
        <div className="flex flex-wrap items-start justify-between gap-1">
          {/* Stars */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-8 flex items-end">
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  )
})

export { HolidayCardSkeleton }
