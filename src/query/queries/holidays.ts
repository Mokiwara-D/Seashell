import type { GraphQLQuery } from '../types'

export const HOLIDAYS_QUERY = (): GraphQLQuery => ({
  query: `
      query holidays(
	$rooms: [String]
	$duration: Int
	$departure_points: [String]
	$boards: [Int]
	$ratings: [Int]
	$trip_ratings: [Float]
	$destinations: [Int]
	$regions: [Int]
	$resorts: [Int]
	$trip_type: Int
	$accommodation_id: Int
	$departure_date: String
	$departure_date_type: Int
	$client_list_id: Int
	$fav_accommodations: [Int]
	$start_index: Int
	$sort: Int
	$take: Int
	$max_price: Float
) {
	offers(
		rooms: $rooms
		duration: $duration
		departure_points: $departure_points
		destinations: $destinations
		regions: $regions
		resorts: $resorts
		ratings: $ratings
		trip_ratings: $trip_ratings
		boards: $boards
		departure_date: $departure_date
		departure_date_type: $departure_date_type
		client_sort_list_id: $client_list_id
		trip_type: $trip_type
		fav_accommodations: $fav_accommodations
		accommodation_id: $accommodation_id
		start_index: $start_index
		sort: $sort
		take: $take
		max_price: $max_price
	) {
		result {
			id
			price_per_person
			accommodation{
				id
				name
				rating
				trip_advisor_rating
				trip_advisor_num_reviews
                images{
					id
					url
				}
				resort{
					id
					name
					regions{
						id
						name
						destinations{
							id
							name
						}
					}
				}
			}
		}
        count
		min_price_per_person
		error {
			... on Unexpected_Error {
				message
			}
		}
	}
}

    `,
  variables: {
    rooms: ['2'],
    duration: 7,
    departure_points: [],
    boards: [],
    ratings: [],
    trip_ratings: [],
    departure_date: null,
    departure_date_type: 0,
    destinations: [],
    regions: [],
    resorts: [],
    trip_type: -1,
    start_index: 0,
    sort: 0,
    fav_accommodations: [],
    client_4ist_id: -1,
    max_price: -1,
    take: 4,
    accommodation_id: null,
  },
  operationName: 'GetHolidays',
})
