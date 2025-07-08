import { ListLink } from "../atoms/ListLink";

function Header() {
  return (
    <header>
      <div id="header-container" className="bg-amber-50 flex justify-center">
        <div
          id="header-content"
          className="container flex justify-between items-center max-w-3/4 mx-auto w-full"
        >
          <a id="header-logo" href="#">
            <img src="/logo.png" alt="Seashell Holidays" />
          </a>
          <nav id="header-nav">
            <ul className="flex gap-4">
              <ListLink>Holidays</ListLink>
              <ListLink>Destinations</ListLink>
              <ListLink>Cruise</ListLink>
              <ListLink>Travel Money</ListLink>
              <ListLink>Support</ListLink>
              <ListLink>Careers</ListLink>
            </ul>
          </nav>
          <button id="my-booking-btn">
            <img src="ImagePlaceholder.jpg" alt="My Booking Icon" />
            My Booking
          </button>
        </div>
      </div>
    </header>
  );
}

export { Header };
