export interface Holiday {
  id: string // Changed to string to match API offer.id for uniqueness
  name: string
  image: string
  stars: number
  tripAdvisorRating: number
  tripAdvisorReviews: number
  price: number
  location: string
}
