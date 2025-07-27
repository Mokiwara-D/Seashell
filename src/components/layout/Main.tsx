import {
  Hero,
  LocationInfo,
  Holidays,
  BookingReasons,
  Destinations,
  CustomerReviews,
  SignUp,
} from '../sections'

function Main() {
  return (
    <main id="main-container" className="flex grow flex-col">
      <Hero />
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
