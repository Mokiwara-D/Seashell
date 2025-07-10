export interface CustomerReview {
  id: number
  rating: number
  text: string
  customerName: string
  timeAgo: string
  isVerified: boolean
}

export const customerReviewsData: CustomerReview[] = [
  {
    id: 1,
    rating: 5,
    text: 'Very friendly staff and extremely helpful. Nothing is too much trouble. Stacey so...',
    customerName: 'Samantha',
    timeAgo: '23 minutes ago',
    isVerified: true,
  },
  {
    id: 2,
    rating: 5,
    text: 'Staff are really helpful. Staff are really helpful. They have great knowledge. A pleasant experience.',
    customerName: 'Sandra',
    timeAgo: '24 minutes ago',
    isVerified: true,
  },
  {
    id: 3,
    rating: 5,
    text: 'Friendly. Friendly, helpful.',
    customerName: 'Ann',
    timeAgo: '30 minutes ago',
    isVerified: true,
  },
  {
    id: 4,
    rating: 5,
    text: 'Fantastic service. Fantastic service, will book again.',
    customerName: 'Emma',
    timeAgo: '30 minutes ago',
    isVerified: true,
  },
]

export const trustpilotData = {
  overallRating: 'Excellent',
  stars: 5,
  totalReviews: 224,
  averageRating: 4.5,
}
