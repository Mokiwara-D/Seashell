import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { memo, useCallback } from 'react'
import type { SearchAction } from '../searchTypes'
import { searchOptionTabs } from './searchOptionsData'

interface SearchOptionsProps {
  selectedOption?: string
  dispatch: React.Dispatch<SearchAction>
  isExpanded?: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchOptions = memo(function SearchOptions({
  selectedOption = 'flightHotel',
  dispatch,
  isExpanded = false,
  setIsExpanded,
}: SearchOptionsProps) {
  // Memoize the label parsing function
  const parseLabel = useCallback((label: string) => {
    const parts = label.split('|')
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
          </>
        )}
      </span>
    ))
  }, [])

  // Memoize the button click handler
  const handleTabClick = useCallback(
    (tabId: string) => {
      dispatch({ type: 'UPDATE_OPTION', payload: tabId })
      if (!isExpanded) {
        setIsExpanded(true)
      }
    },
    [dispatch, isExpanded, setIsExpanded]
  )
  return (
    <Container wrapperClassName="pt-2" contentClassName="justify-center py-0">
      <div className="flex justify-center gap-2">
        {searchOptionTabs.map((tab) => (
          <Button
            key={tab.id}
            className={`max-w-24 flex-1 touch-manipulation overflow-hidden rounded-br-none rounded-bl-none px-4 py-8 text-center text-xs font-bold transition-all sm:max-w-none sm:min-w-fit sm:py-6 sm:text-sm ${
              isExpanded && selectedOption === tab.id
                ? 'bg-accent text-foreground'
                : 'bg-primary hover:bg-accent/50 hover:text-foreground text-muted-foreground'
            } `}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
              <img
                src={tab.icon}
                alt={`${tab.label.replace('|', ' ')} icon`}
                className="size-5 flex-shrink-0 sm:block md:size-6"
              />
              <span className="text-center leading-tight">
                {parseLabel(tab.label)}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </Container>
  )
})

export default SearchOptions
