import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { PiUmbrellaBold } from 'react-icons/pi'
import { placeholder } from '@/lib/imagePreloader'
import type { DesktopNavigationProps } from '../types'

function DesktopNavigation({
  activeTab,
  navigationItems,
  onTabChange,
}: DesktopNavigationProps) {
  return (
    <div className="hidden h-full w-full items-center justify-between gap-4 lg:flex">
      {/* Logo - Left */}
      <div className="h-full">
        <img
          src={placeholder}
          alt="Seashell Holidays logo"
          className="aspect-ratio-maintain h-full object-contain"
        />
      </div>

      {/* Desktop Navigation Tabs - Center */}
      <Tabs
        className="extra-bold max-w-2/3 grow items-center justify-between space-x-0 text-lg"
        tabs={navigationItems.map((item) => item.label)}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* My Booking Button - Right */}
      <div className="flex">
        <Button
          size="lg"
          className="hover:bg-accent hover:text-foreground gap-2 rounded-full px-4 lg:px-6"
        >
          <PiUmbrellaBold className="size-4 -rotate-45" />
          <span className="text-sm whitespace-nowrap">My Booking</span>
        </Button>
      </div>
    </div>
  )
}

export { DesktopNavigation }
