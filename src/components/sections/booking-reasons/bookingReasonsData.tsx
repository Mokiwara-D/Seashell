import type { ReactNode } from 'react'
import { BsFillHandIndexThumbFill } from 'react-icons/bs'

export interface BookingReason {
  id: number
  icon: ReactNode
  title: string
  description: ReactNode
}

const iconSize = 'h-24 w-24'

export const bookingReasonsData: BookingReason[] = [
  {
    id: 1,
    icon: (
      <div
        className={`flex ${iconSize} items-center justify-center rounded-full bg-gray-100`}
      >
        <span className="text-foreground text-3xl font-bold">0%</span>
      </div>
    ),
    title: 'Spread the cost',
    description: <>Interest free monthly payment options available</>,
  },
  {
    id: 2,
    icon: (
      <div
        className={`flex ${iconSize} items-center justify-center rounded-full bg-gray-100`}
      >
        <span className="text-foreground text-4xl font-extrabold">£</span>
      </div>
    ),
    title: 'Low deposits',
    description: (
      <>
        Book now, pay later.
        <br />
        Deposits from only £49pp
      </>
    ),
  },
  {
    id: 3,
    icon: (
      <div
        className={`flex ${iconSize} items-center justify-center rounded-full bg-gray-100`}
      >
        <img
          src="/src/assets/TOL.svg"
          alt="Holiday Protection"
          className="h-14 w-14"
          width="56"
          height="56"
          loading="lazy"
        />
      </div>
    ),
    title: 'Holiday protection',
    description: (
      <>
        You're in safe hands.
        <br />
        We're ATOL & ABTA protected
      </>
    ),
  },
  {
    id: 4,
    icon: (
      <div
        className={`flex ${iconSize} items-center justify-center rounded-full bg-gray-100`}
      >
        <BsFillHandIndexThumbFill className="h-10 w-10 rotate-45" />
      </div>
    ),
    title: 'Book with ease',
    description: <>Secure your dream holiday in a few easy taps</>,
  },
]
