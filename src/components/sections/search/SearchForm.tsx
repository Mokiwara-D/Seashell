import { memo, useMemo, useCallback } from 'react'
import type { SearchInput, SearchAction } from './searchTypes'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { SearchFormInput } from './SearchFormInput'

interface SearchFormProps {
  searchInput: SearchInput
  dispatch: React.Dispatch<SearchAction>
  onSubmit: (input: SearchInput) => void
}

const SearchForm = memo(
  ({ searchInput, dispatch, onSubmit }: SearchFormProps) => {
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
        wrapperClassName="bg-accent py-3 sm:py-4 lg:py-6"
        contentClassName="justify-center"
      >
        <form onSubmit={handleSubmit} className="w-full">
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="grid grid-cols-2 gap-3">
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
            </div>

            <div className="grid grid-cols-2 gap-3">
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
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SearchFormInput
                type="number"
                label="ADULTS"
                id="adults-mobile"
                value={searchInput.passengers.adults}
                onChange={handleAdultsChange}
                min={1}
                max={99}
                required
              />
              <SearchFormInput
                type="number"
                label="CHILDREN"
                id="children-mobile"
                value={searchInput.passengers.children}
                onChange={handleChildrenChange}
                min={0}
                max={99}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-lg bg-black px-6 font-semibold text-white hover:bg-gray-800"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              SEARCH
            </Button>
          </div>

          {/* Tablet and Desktop Layout - Horizontal */}
          <div className="hidden items-end gap-2 sm:flex lg:gap-4">
            <SearchFormInput
              type="text"
              label="DEPARTURE"
              id="departure-desktop"
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
              id="destination-desktop"
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
              id="departure-date-desktop"
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
              id="duration-desktop"
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
              id="adults-desktop"
              value={searchInput.passengers.adults}
              onChange={handleAdultsChange}
              min={1}
              max={99}
              className="max-w-20"
              required
            />

            <SearchFormInput
              type="number"
              label="CHILDREN"
              id="children-desktop"
              value={searchInput.passengers.children}
              onChange={handleChildrenChange}
              min={0}
              max={99}
              className="max-w-20"
            />

            <Button
              type="submit"
              size="lg"
              className="ml-2 flex h-12 items-center gap-2 rounded-lg bg-black px-6 font-semibold whitespace-nowrap text-white hover:bg-gray-800 lg:ml-4 lg:px-8"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
