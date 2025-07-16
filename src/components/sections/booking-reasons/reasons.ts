import type { ReactNode } from 'react'
import { createElement } from 'react'
import { BsFillHandIndexThumbFill } from 'react-icons/bs'
import ATOL from '@/assets/TOL.svg'

export interface BookingReason {
  id: number
  icon: ReactNode
  title: string
  description: ReactNode
}

export const bookingReasonsData: BookingReason[] = [
  {
    id: 1,
    icon: createElement(
      'h2',
      {
        className: 'text-foreground text-3xl font-bold',
      },
      '0%'
    ),
    title: 'Spread the cost',
    description: 'Interest free monthly payment options available',
  },
  {
    id: 2,
    icon: createElement(
      'h2',
      {
        className: 'text-foreground text-4xl font-extrabold',
      },
      '£'
    ),
    title: 'Low deposits',
    description: createElement(
      'div',
      null,
      'Book now, pay later.',
      createElement('br'),
      'Deposits from only £49pp'
    ),
  },
  {
    id: 3,
    icon: createElement('img', {
      src: ATOL,
      alt: 'Holiday Protection',
      className: 'h-14 w-14',
      width: '56',
      height: '56',
      loading: 'lazy',
    }),
    title: 'Holiday protection',
    description: createElement(
      'div',
      null,
      "You're in safe hands.",
      createElement('br'),
      "We're ATOL & ABTA protected"
    ),
  },
  {
    id: 4,
    icon: createElement(BsFillHandIndexThumbFill, {
      className: 'h-10 w-10 rotate-45',
    }),
    title: 'Book with ease',
    description: 'Secure your dream holiday in a few easy taps',
  },
]
