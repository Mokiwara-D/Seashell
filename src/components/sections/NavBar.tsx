import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { PiUmbrellaLight } from 'react-icons/pi'
import { Content, Wrapper } from '@/components/ui/container'
import placeholder from '@/assets/placeholder.jpg'
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
      <Wrapper className="bg-background relative">
        <Content className="h-16 gap-2 font-bold sm:h-18 sm:gap-4 md:h-20">
          {/* Mobile Layout: Hamburger - Logo - My Booking */}
          <div className="flex w-full items-center justify-between gap-2 lg:hidden">
            {/* Mobile Menu Button - Left */}
            <Button
              size="lg"
              className="hover:bg-accent hover:text-foreground gap-2 rounded-full px-3"
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
              <span className="text-xs">Menu</span>
            </Button>

            {/* Logo - Center */}
            <img
              src={placeholder}
              alt="Seashell Holidays logo"
              className="h-10 w-auto flex-shrink-0 object-contain sm:h-12 md:h-14"
            />

            {/* My Booking Button - Right */}
            <Button
              size="lg"
              className="hover:bg-accent hover:text-foreground gap-2 rounded-full px-3"
              aria-label="My Booking"
            >
              <PiUmbrellaLight className="size-4 rotate-[-45deg]" />
              <span className="text-xs">Booking</span>
            </Button>
          </div>

          {/* Desktop Layout */}
          <div className="relative hidden w-full items-center lg:flex">
            {/* Logo - Left */}
            <div className="flex-1">
              <img
                src={placeholder}
                alt="Seashell Holidays logo"
                className="h-14 w-auto flex-shrink-0 object-contain lg:h-16"
              />
            </div>

            {/* Desktop Navigation - Center (absolutely centered) */}
            <div className="absolute left-1/2 -translate-x-1/2 transform">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-2 xl:gap-4">
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item}>
                      <NavigationMenuLink className="px-2 text-sm whitespace-nowrap xl:px-3 xl:text-base">
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
                <PiUmbrellaLight className="size-4 rotate-[-45deg]" />
                <span className="text-sm whitespace-nowrap">My Booking</span>
              </Button>
            </div>
          </div>
        </Content>

        {/* Mobile Menu Dropdown - Positioned below menu button */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 z-50 mt-2 lg:hidden">
            <div className="w-64 overflow-hidden rounded-2xl border bg-white shadow-2xl">
              <div className="p-4">
                {/* Navigation Items */}
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item}
                      className="hover:bg-accent hover:text-accent-foreground w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
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
