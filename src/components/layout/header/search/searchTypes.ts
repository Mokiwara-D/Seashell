export interface SearchInput {
  option: string
  departure: string
  destination: string
  departureDate: string
  duration: number
  passengers: {
    adults: number
    children: number
  }
}

export type SearchAction =
  | { type: 'UPDATE_OPTION'; payload: string }
  | { type: 'UPDATE_DEPARTURE'; payload: string }
  | { type: 'UPDATE_DESTINATION'; payload: string }
  | { type: 'UPDATE_DEPARTURE_DATE'; payload: string }
  | { type: 'UPDATE_DURATION'; payload: number }
  | { type: 'UPDATE_ADULTS'; payload: number }
  | { type: 'UPDATE_CHILDREN'; payload: number }
  | { type: 'RESET_FORM' }
