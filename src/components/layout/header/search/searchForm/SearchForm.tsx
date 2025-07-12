import { memo, useMemo, useCallback } from 'react'
import type { SearchInput, SearchAction } from '../searchTypes'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { SearchFormInput } from './SearchFormInput'
import { GoSearch } from 'react-icons/go'

interface SearchFormProps {
  searchInput: SearchInput
  dispatch: React.Dispatch<SearchAction>
  onSubmit: (input: SearchInput) => void
  isExpanded: boolean
}

const SearchForm = memo(
  ({ searchInput, dispatch, onSubmit, isExpanded }: SearchFormProps) => {
    const { todayDate } = useMemo(() => {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      return {
        todayDate: today.toISOString().split('T')[0],
        tomorrowDate: tomorrow.toISOString().split('T')[0],
      }
    }, [])

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(searchInput)
      },
      [onSubmit, searchInput]
    )

    const handleAdultsChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(e.target.value) || 1)
        dispatch({ type: 'UPDATE_ADULTS', payload: value })
      },
      [dispatch]
    )

    const handleChildrenChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(e.target.value) || 0)
        dispatch({ type: 'UPDATE_CHILDREN', payload: value })
      },
      [dispatch]
    )

    return (
      <Container
        wrapperClassName={`bg-accent transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-96 py-3' : 'max-h-0 py-0'
        }`}
        contentClassName="justify-center"
      >
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-2 gap-3 lg:flex lg:items-end lg:gap-4">
            <SearchFormInput
              type="text"
              label="DEPARTURE"
              id="departure"
              value={searchInput.departure}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DEPARTURE',
                  payload: e.target.value,
                })
              }
              placeholder="Any Airport"
              required
            />

            <SearchFormInput
              type="text"
              label="DESTINATION"
              id="destination"
              value={searchInput.destination}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DESTINATION',
                  payload: e.target.value,
                })
              }
              placeholder="Any Destination"
              required
            />

            <SearchFormInput
              type="date"
              label="DATE"
              id="departure-date"
              value={searchInput.departureDate || todayDate}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DEPARTURE_DATE',
                  payload: e.target.value,
                })
              }
              min={todayDate}
              required
            />

            <SearchFormInput
              type="number"
              label="DURATION"
              id="duration"
              value={searchInput.duration}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DURATION',
                  payload: parseInt(e.target.value) || 1,
                })
              }
              placeholder="Nights"
              min={1}
              max={30}
              required
            />

            <SearchFormInput
              type="number"
              label="ADULTS"
              id="adults"
              value={searchInput.passengers.adults}
              onChange={handleAdultsChange}
              min={1}
              max={99}
              className="lg:max-w-20"
              required
            />

            <SearchFormInput
              type="number"
              label="CHILDREN"
              id="children"
              value={searchInput.passengers.children}
              onChange={handleChildrenChange}
              min={0}
              max={99}
              className="lg:max-w-20"
            />

            <Button
              type="submit"
              size="lg"
              className="bg-foreground hover:bg-foreground/90 col-span-2 flex h-12 w-full touch-manipulation items-center justify-center rounded-full px-6 text-lg font-semibold text-white lg:col-span-1 lg:w-auto lg:px-8 lg:whitespace-nowrap"
            >
              <GoSearch className="size-6" />
              SEARCH
            </Button>
          </div>
        </form>
      </Container>
    )
  }
)

SearchForm.displayName = 'SearchForm'

export default SearchForm
