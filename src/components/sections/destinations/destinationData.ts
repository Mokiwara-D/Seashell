export interface Destination {
  id: number
  name: string
  image: string
  description: string
  priceFrom: number
}

export const destinationData: Destination[] = [
  {
    id: 1,
    name: 'Costa Blanca',
    image: '/src/assets/placeholder.jpg',
    description:
      'Budget beach breaks and family fun await on a holiday to the Costa Blanca',
    priceFrom: 209,
  },
  {
    id: 2,
    name: 'Costa Brava',
    image: '/src/assets/placeholder.jpg',
    description:
      'Calm coasts and culture-packed cities await on a holiday to Costa Brava',
    priceFrom: 219,
  },
  {
    id: 3,
    name: 'Costa del Sol',
    image: '/src/assets/placeholder.jpg',
    description: 'Sunshine coastlines await on a holiday to Costa Del Sol',
    priceFrom: 225,
  },
  {
    id: 4,
    name: 'Costa Almeria',
    image: '/src/assets/placeholder.jpg',
    description:
      'Golden shores and beaches galore await on a holiday to Costa Almeria',
    priceFrom: 240,
  },
]
