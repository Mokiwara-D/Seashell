import SearchOptions from './SearchOptions'
import SearchForm from './SearchForm'
import { useReducer } from 'react'
import type { SearchInput, SearchAction } from './searchTypes'

const searchReducer = (
  state: SearchInput,
  action: SearchAction
): SearchInput => {
  switch (action.type) {
    case 'UPDATE_OPTION':
      return { ...state, option: action.payload }
    case 'UPDATE_DEPARTURE':
      return { ...state, departure: action.payload }
    case 'UPDATE_DESTINATION':
      return { ...state, destination: action.payload }
    case 'UPDATE_DEPARTURE_DATE':
      return { ...state, departureDate: action.payload }
    case 'UPDATE_DURATION':
      return { ...state, duration: action.payload }
    case 'UPDATE_ADULTS':
      return {
        ...state,
        passengers: { ...state.passengers, adults: action.payload },
      }
    case 'UPDATE_CHILDREN':
      return {
        ...state,
        passengers: { ...state.passengers, children: action.payload },
      }
    case 'RESET_FORM':
      return initialState
    default:
      return state
  }
}

const initialState: SearchInput = {
  option: 'flightHotel',
  departure: '',
  destination: '',
  departureDate: '',
  duration: 7,
  passengers: {
    adults: 2,
    children: 0,
  },
}

function Search() {
  const [searchInput, dispatch] = useReducer(searchReducer, initialState)

  const handleSubmit = (input: SearchInput) => {
    console.log('Search submitted:', input)
  }

  return (
    <>
      <SearchOptions selectedOption={searchInput.option} dispatch={dispatch} />
      <SearchForm
        searchInput={searchInput}
        dispatch={dispatch}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export { Search }
