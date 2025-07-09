import { Hero } from '../sections/Hero'
import { LocationInfo } from '../sections/LocationInfo'
import { lazy, Suspense } from 'react'

// Lazy load non-critical components
const Holidays = lazy(() =>
  import('../sections/holidays/Holidays').then((module) => ({
    default: module.Holidays,
  }))
)
const BookingReasons = lazy(() =>
  import('../sections/booking-reasons/BookingReasons').then((module) => ({
    default: module.BookingReasons,
  }))
)
const Destinations = lazy(() =>
  import('../sections/destinations/Destinations').then((module) => ({
    default: module.Destinations,
  }))
)
const CustomerReviews = lazy(() =>
  import('../sections/CustomerReviews').then((module) => ({
    default: module.CustomerReviews,
  }))
)
const SignUp = lazy(() =>
  import('../sections/SignUp').then((module) => ({ default: module.SignUp }))
)

// Loading component for better UX
function SectionSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-48 rounded-md bg-gray-200"></div>
    </div>
  )
}

function Main() {
  return (
    <main id="main-container" className="flex grow flex-col">
      <Hero />
      <LocationInfo />
      <Suspense fallback={<SectionSkeleton />}>
        <Holidays />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BookingReasons />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Destinations />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CustomerReviews />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <SignUp />
      </Suspense>
    </main>
  )
}

export { Main }
