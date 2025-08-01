import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { placeholder } from '@/lib/imagePreloader'

function DestinationCardSkeleton() {
  return (
    <Card className="h-full gap-4 border-none bg-transparent not-even:overflow-hidden">
      {/* Image - Use placeholder instead of skeleton */}
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
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
      <CardContent className="flex grow flex-col justify-between">
        {/* Destination Name */}
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* Description */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Price Section */}
        <div className="mt-auto flex items-end">
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export { DestinationCardSkeleton }
