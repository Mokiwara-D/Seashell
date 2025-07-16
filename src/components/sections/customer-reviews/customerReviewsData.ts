export interface CustomerReview {
  id: number
  rating: number
  title: string
  text: string
  customerName: string
  timeAgo: string
  isVerified: boolean
}

export const customerReviewsData: CustomerReview[] = [
  {
    id: 1,
    rating: 5,
    title: 'Very friendly staff and extremely helpful',
    text: 'Very friendly staff and extremely helpful. Nothing is too much trouble.',
    customerName: 'Samantha',
    timeAgo: '23 minutes ago',
    isVerified: true,
  },
  {
    id: 2,
    rating: 5,
    title: 'Staff are really helpful',
    text: 'Staff are really helpful. They have great knowledge. A pleasant experience.',
    customerName: 'Sandra',
    timeAgo: '24 minutes ago',
    isVerified: true,
  },
  {
    id: 3,
    rating: 5,
    title: 'Friendly',
    text: 'Friendly, helpful',
    customerName: 'Ann',
    timeAgo: '30 minutes ago',
    isVerified: true,
  },
  {
    id: 4,
    rating: 5,
    title: 'Fantastic service',
    text: 'Fantastic service, will book again ❤️',
    customerName: 'Emma',
    timeAgo: '30 minutes ago',
    isVerified: true,
  },
]

export const trustpilotData = {
  overallRating: 'Excellent',
  totalReviews: 324,
  averageRating: 5,
}
