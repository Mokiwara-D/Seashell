import { Hero } from '../sections/Hero'
import { LocationInfo } from '../sections/LocationInfo'
import { Holidays } from '../sections/Holidays'
import { BookingReasons } from '../sections/BookingReasons'
import { Destinations } from '../sections/Destinations'
import { CustomerReviews } from '../sections/CustomerReviews'
import { SignUp } from '../sections/SignUp'

function Main() {
  return (
    <main id="main-container" className="flex min-h-screen grow">
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
