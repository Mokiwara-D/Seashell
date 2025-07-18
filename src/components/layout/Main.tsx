import { Hero } from '../sections/Hero'
import { LocationInfo } from '../sections/LocationInfo'
import { Holidays } from '../sections/holidays/Holidays'
import { BookingReasons } from '../sections/booking-reasons/BookingReasons'
import { Destinations } from '../sections/destinations/Destinations'
import { CustomerReviews } from '../sections/customer-reviews/CustomerReviews'
import { SignUp } from '../sections/SignUp'
import { QueryTest } from '../sections/query-test/QueryTest'

function Main() {
  return (
    <main id="main-container" className="flex grow flex-col">
      <Hero />
      <div className="[&>section:nth-child(even)]:bg-secondary flex grow flex-col">
        <QueryTest />
        <LocationInfo />
        <Holidays />
        <BookingReasons />
        <Destinations />
        <CustomerReviews />
      </div>
      <SignUp />
    </main>
  )
}

export { Main }
