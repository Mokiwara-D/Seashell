import flightHotelIcon from '@/assets/flightHotel.svg'
import cityIcon from '@/assets/city.svg'
import packageIcon from '@/assets/pkg.svg'

export interface SearchOptionTab {
  id: string
  label: string
  icon: string
}

export const searchOptionTabs: SearchOptionTab[] = [
  {
    id: 'flightHotel',
    label: 'FLIGHT &|HOTEL',
    icon: flightHotelIcon,
  },
  {
    id: 'city',
    label: 'CITY|BREAKS',
    icon: cityIcon,
  },
  {
    id: 'package',
    label: 'PACKAGE|HOLIDAYS',
    icon: packageIcon,
  },
]
