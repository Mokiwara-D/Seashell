import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function HolidayCardSkeleton() {
  return (
    <Card className="border-border bg-card overflow-hidden shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <CardContent className="flex flex-col justify-between pb-6">
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

          {/* TripAdvisor Badge */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-4 flex items-end">
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export { HolidayCardSkeleton }
