import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import type { SearchAction } from './searchTypes'

const SearchOptions = ({
  selectedOption = 'flightHotel',
  dispatch,
}: {
  selectedOption?: string
  dispatch: React.Dispatch<SearchAction>
}) => {
  const tabs = [
    {
      id: 'flightHotel',
      label: 'FLIGHT & HOTEL',
      icon: '✈️',
    },
    {
      id: 'city',
      label: 'CITY BREAKS',
      icon: '🏢',
    },
    {
      id: 'package',
      label: 'PACKAGE HOLIDAYS',
      icon: '📦',
    },
  ]

  return (
    <Container
      wrapperClassName="pt-4"
      contentClassName="justify-center py-0 gap-2"
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          className={`hover:bg-accent hover:text-foreground rounded-br-none rounded-bl-none p-5 text-sm font-bold transition-all ${
            selectedOption === tab.id
              ? 'bg-accent text-foreground'
              : 'bg-primary text-gray-700'
          } `}
          onClick={() => dispatch({ type: 'UPDATE_OPTION', payload: tab.id })}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </div>
        </Button>
      ))}
    </Container>
  )
}

export default SearchOptions
