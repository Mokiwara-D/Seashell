import placeholder from '../../assets/placeholder.jpg'
import { OuterContainer } from '../atoms/OuterContainer'
import { InnerContainer } from '../atoms/InnerContainer'
import { ListLink } from '../atoms/ListLink'
import { RoundButton } from '../atoms/RoundButton'

function Header() {
  return (
    <OuterContainer as="header" className="sticky top-0 bg-amber-700">
      <InnerContainer className="h-20 items-center justify-between gap-5 text-xs font-bold">
        <a id="header-logo" href="#" className="h-full">
          <img
            src={placeholder}
            alt="Seashell Holidays Logo"
            className="h-full w-auto object-contain"
          />
        </a>
        <nav id="header-nav">
          <ul className="flex gap-x-12 gap-y-2">
            <ListLink>Holidays</ListLink>
            <ListLink>Destinations</ListLink>
            <ListLink>Cruise</ListLink>
            <ListLink>Travel Money</ListLink>
            <ListLink>Support</ListLink>
            <ListLink>Careers</ListLink>
          </ul>
        </nav>
        <RoundButton
          name="my-booking-btn"
          icon={placeholder}
          text="My Booking"
          className="bg-secondary text-tertiary"
        />
      </InnerContainer>
    </OuterContainer>
  )
}

export { Header }
