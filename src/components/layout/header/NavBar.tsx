import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { PiUmbrellaBold } from 'react-icons/pi'
import { Content, Wrapper } from '@/components/ui/container'
import logo from '@/assets/logo.svg'
import { useState } from 'react'

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        <Content className="h-16 gap-2 font-bold sm:h-18 sm:gap-4 md:h-20">
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
              src={logo}
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
          <div className="relative hidden w-full items-center lg:flex">
            {/* Logo - Left */}
            <div className="flex-1">
              <img
                src={logo}
                alt="Seashell Holidays logo"
                className="h-14 w-auto flex-shrink-0 object-contain lg:h-16"
              />
            </div>

            {/* Desktop Navigation - Center (absolutely centered) */}
            <div className="relative">
              <NavigationMenu>
                <NavigationMenuList className="mx-4 flex transition-all duration-300 xl:gap-4">
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item}>
                      <NavigationMenuLink
                        href="#"
                        className="hover:text-foreground text-muted-foreground rounded-full border-2 border-transparent px-3 text-sm whitespace-nowrap transition-all duration-300 hover:bg-transparent xl:px-3 xl:text-base"
                      >
                        {item}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* My Booking Button - Right */}
            <div className="flex flex-1 justify-end">
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
            <div className="w-64 overflow-hidden rounded-lg border bg-white shadow-2xl">
              <div className="p-4">
                {/* Navigation Items */}
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="hover:bg-secondary hover:text-accent-foreground border-input bg-background block w-full cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
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
