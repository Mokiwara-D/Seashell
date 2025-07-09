import { Container } from '@/components/ui/container'
import { bookingReasonsData } from './bookingReasonsData'

function BookingReasons() {
  return (
    <Container
      wrapperClassName="py-8 md:py-12 bg-white"
      contentClassName="flex flex-col gap-12"
    >
      <h2 className="text-foreground text-center text-2xl font-bold md:text-3xl">
        Reasons to book with us
      </h2>

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {bookingReasonsData.map((reason) => (
          <div
            key={reason.id}
            className="flex flex-col items-center space-y-4 text-center"
          >
            {reason.icon}
            <div className="max-w-56 space-y-2">
              <h3 className="text-foreground text-xl font-semibold">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export { BookingReasons }
