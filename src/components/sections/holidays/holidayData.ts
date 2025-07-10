import placeholder from '@/assets/placeholder.jpg'

export interface Holiday {
  id: number
  name: string
  image: string
  stars: number
  tripAdvisorRating: number
  tripAdvisorReviews: number
  price: number
  location: string
}

export const holidayData: Holiday[] = [
  {
    id: 1,
    name: 'Sol Costa Dorada',
    image: placeholder,
    stars: 4,
    tripAdvisorRating: 4.5,
    tripAdvisorReviews: 2991,
    price: 296,
    location: 'Costa Dorada, Spain',
  },
  {
    id: 2,
    name: 'Golden Costa Salou',
    image: placeholder,
    stars: 4,
    tripAdvisorRating: 4.0,
    tripAdvisorReviews: 339,
    price: 338,
    location: 'Salou, Spain',
  },
  {
    id: 3,
    name: 'Hotel Porta Coeli',
    image: placeholder,
    stars: 3,
    tripAdvisorRating: 4.5,
    tripAdvisorReviews: 715,
    price: 345,
    location: 'Valencia, Spain',
  },
  {
    id: 4,
    name: 'Sh Villa Gadea',
    image: placeholder,
    stars: 5,
    tripAdvisorRating: 4.5,
    tripAdvisorReviews: 2036,
    price: 390,
    location: 'Altea, Spain',
  },
  {
    id: 5,
    name: 'Costa del Sol Resort',
    image: placeholder,
    stars: 4,
    tripAdvisorRating: 4.2,
    tripAdvisorReviews: 1000,
    price: 425,
    location: 'Costa del Sol, Spain',
  },
]

export const filterOptions = [
  'Last Minute',
  'Under £400pp',
  'All Inclusive',
  '5-Star',
  'City Breaks',
]
