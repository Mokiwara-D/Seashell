import SearchOptions from './searchOptions/SearchOptions'
import SearchForm from './searchForm/SearchForm'
import { useReducer, useCallback, useMemo } from 'react'
import type { SearchInput, SearchAction } from './searchTypes'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { useSearchExpansion, useScrollBehavior } from '@/hooks'

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
  const [isExpanded, setIsExpanded] = useSearchExpansion()

  // Memoize the scroll behavior props to prevent unnecessary hook re-runs
  const scrollBehaviorProps = useMemo(
    () => ({
      isExpanded,
      setIsExpanded,
    }),
    [isExpanded, setIsExpanded]
  )

  useScrollBehavior(scrollBehaviorProps)

  // Memoize the submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback((input: SearchInput) => {
    console.log('Search submitted:', input)
  }, [])

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleExpansion = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded, setIsExpanded])

  return (
    <div role="search" aria-label="Holiday search">
      <SearchOptions
        selectedOption={searchInput.option}
        dispatch={dispatch}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <SearchForm
        searchInput={searchInput}
        dispatch={dispatch}
        onSubmit={handleSubmit}
        isExpanded={isExpanded}
      />
      <Container
        wrapperElement="div"
        wrapperClassName="absolute bottom-0 translate-y-12 pointer-events-none px-2 sm:px-8 xl:mx-4"
        contentClassName="flex justify-end"
      >
        <Button
          size="icon"
          variant="outline"
          className="pointer-events-auto size-8 rounded-full"
          onClick={toggleExpansion}
          aria-label={
            isExpanded ? 'Collapse search form' : 'Expand search form'
          }
          aria-expanded={isExpanded}
          aria-controls="search-form"
        >
          <ChevronDown
            className={`size-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </Button>
      </Container>
    </div>
  )
}

export { Search }
