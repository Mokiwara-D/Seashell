import SearchOptions from './searchOptions/SearchOptions'
import SearchForm from './searchForm/SearchForm'
import { useReducer, useState, useEffect } from 'react'
import type { SearchInput, SearchAction } from './searchTypes'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/container'

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
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if search is expanded, user was at top, and is now scrolling down
      if (isExpanded && lastScrollY === 0 && currentScrollY > 0) {
        setIsExpanded(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isExpanded])

  const handleSubmit = (input: SearchInput) => {
    console.log('Search submitted:', input)
  }

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
        wrapperClassName="absolute bottom-0 translate-y-12 pointer-events-none"
        contentClassName="flex justify-end"
      >
        <Button
          size="icon"
          className="text-foreground bg-primary/80 pointer-events-auto rounded-full"
          onClick={() => setIsExpanded(!isExpanded)}
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
