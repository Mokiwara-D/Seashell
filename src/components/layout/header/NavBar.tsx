import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { PiUmbrellaBold } from 'react-icons/pi'
import { Content, Wrapper } from '@/components/ui/container'
import placeholder from '@/assets/placeholder.jpg'
import { useState } from 'react'

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Holidays')

  const navigationItems = [
    'Holidays',
    'Destinations',
    'Cruise',
    'Travel Money',
    'Support',
    'Careers',
  ]

  return (
    <>
      <Wrapper className="bg-background relative overflow-visible">
        <Content className="h-16 gap-2 font-bold sm:h-20 sm:gap-4 md:h-24">
          {/* Mobile Layout: Hamburger - Logo - My Booking */}
          <div className="flex w-full items-center justify-between gap-2 lg:hidden">
            {/* Mobile Menu Button - Left */}
            <Button
              size={'lg'}
              className="hover:text-foreground flex-shrink-0 gap-1 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              <span className="hidden text-xs sm:block">Menu</span>
            </Button>

            {/* Logo - Center */}
            <img
              src={placeholder}
              alt="Seashell Holidays logo"
              className="h-16 w-auto max-w-32 object-contain"
            />

            {/* My Booking Button - Right */}
            <Button
              size="lg"
              className="hover:text-foreground flex-shrink-0 gap-1 rounded-full px-2"
              aria-label="My Booking"
            >
              <PiUmbrellaBold className="size-4 -rotate-45" />
              <span className="hidden text-xs sm:block">Booking</span>
            </Button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden w-full items-center justify-between gap-8 lg:flex">
            {/* Logo - Left */}
            <div className="min-w-32">
              <img
                src={placeholder}
                alt="Seashell Holidays logo"
                className="h-16 min-h-16 flex-shrink-0 object-contain sm:h-20 md:h-24"
              />
            </div>

            {/* Desktop Navigation Tabs - Center */}
            <Tabs
              className="extra-bold max-w-2/3 grow items-center justify-between space-x-0 text-lg"
              tabs={navigationItems}
              activeTab={activeTab}
              onTabChange={setActiveTab}
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
        </Content>

        {/* Mobile Menu Dropdown - Positioned below menu button */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 z-50 lg:hidden">
            <div className="border-border bg-background w-64 overflow-hidden rounded-lg border shadow-2xl">
              <div className="p-4">
                {/* Navigation Items using Tab system */}
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item}
                      className={`block w-full cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeTab === item
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'hover:bg-secondary hover:text-accent-foreground border-input bg-background'
                      }`}
                      onClick={() => {
                        setActiveTab(item)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Wrapper>

      {/* Click outside overlay to close menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export { NavBar }
