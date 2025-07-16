import { Container } from '@/components/ui/container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { ReviewCard } from './ReviewCard'
import { TrustpilotBadge } from './TrustpilotBadge'
import { customerReviewsData, trustpilotData } from './customerReviewsData'

function CustomerReviews() {
  return (
    <Container
      wrapperClassName="py-12 md:py-16 bg-white"
      contentClassName="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="w-full text-center">
        <h2 className="text-foreground text-2xl font-bold md:text-3xl">
          What our customers are saying about us
        </h2>
      </div>

      {/* Content Layout */}
      <div className="flex max-w-full flex-col items-start gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between xl:gap-4">
        {/* Trustpilot Badge - Left Side */}
        <div className="flex w-full justify-center lg:w-fit lg:justify-start">
          <TrustpilotBadge data={trustpilotData} />
        </div>

        {/* Reviews Carousel - Right Side */}
        <div className="flex w-full flex-1 flex-col px-6 md:items-start lg:max-w-5/6 xl:ml-12">
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="">
              {customerReviewsData.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="w-fit basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </Carousel>
          {/* Additional Info */}
          <p className="text-center text-xs sm:ml-4">
            Showing our 4 and 5 star reviews
          </p>
        </div>
      </div>
    </Container>
  )
}

export { CustomerReviews }
