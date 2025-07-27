import {
  Hero,
  LocationInfo,
  Holidays,
  BookingReasons,
  Destinations,
  CustomerReviews,
  SignUp,
} from '../sections'
import { QueryTest2 } from '../sections/query-test-2/QueryTest2'

function Main() {
  return (
    <main id="main-container" className="flex grow flex-col">
      <Hero />
      <QueryTest2 />
      <div className="[&>section:nth-child(even)]:bg-secondary flex grow flex-col">
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
