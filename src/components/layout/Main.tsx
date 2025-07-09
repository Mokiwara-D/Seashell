import { Hero } from '../sections/Hero'
import { LocationInfo } from '../sections/LocationInfo'
import { Holidays } from '../sections/holidays/Holidays'
import { BookingReasons } from '../sections/booking-reasons/BookingReasons'
import { Destinations } from '../sections/destinations/Destinations'
import { CustomerReviews } from '../sections/CustomerReviews'
import { SignUp } from '../sections/SignUp'

function Main() {
  return (
    <main id="main-container" className="flex grow flex-col">
      <Hero />
      <LocationInfo />
      <Holidays />
      <BookingReasons />
      <Destinations />
      <CustomerReviews />
      <SignUp />
    </main>
  )
}

export { Main }
