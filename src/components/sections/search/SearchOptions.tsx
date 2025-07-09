import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import type { SearchAction } from './searchTypes'
import flightHotelIcon from '@/assets/flightHotel.svg'
import cityIcon from '@/assets/city.svg'
import packageIcon from '@/assets/pkg.svg'

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
      label: (
        <>
          FLIGHT &<br className="sm:hidden" /> HOTEL
        </>
      ),
      icon: flightHotelIcon,
    },
    {
      id: 'city',
      label: (
        <>
          CITY
          <br className="sm:hidden" /> BREAKS
        </>
      ),
      icon: cityIcon,
    },
    {
      id: 'package',
      label: (
        <>
          PACKAGE
          <br className="sm:hidden" /> HOLIDAYS
        </>
      ),
      icon: packageIcon,
    },
  ]

  return (
    <Container wrapperClassName="pt-2" contentClassName="justify-center py-0">
      <div className="flex justify-center gap-1 sm:gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            className={`max-w-24 flex-1 touch-manipulation rounded-br-none rounded-bl-none px-4 py-6 text-center text-xs font-bold transition-all sm:max-w-none sm:min-w-fit sm:text-sm ${
              selectedOption === tab.id
                ? 'bg-accent text-foreground'
                : 'bg-primary hover:bg-accent hover:text-foreground text-gray-700'
            } `}
            onClick={() => dispatch({ type: 'UPDATE_OPTION', payload: tab.id })}
          >
            <div className="flex flex-row items-center gap-1 sm:gap-2">
              <img
                src={tab.icon}
                alt={`${typeof tab.label === 'string' ? tab.label : 'Tab'} icon`}
                className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
              />
              <span className="text-center leading-tight">{tab.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </Container>
  )
}

export default SearchOptions
