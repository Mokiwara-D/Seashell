import { Button } from '@/components/ui/button'
import { PiUmbrellaBold } from 'react-icons/pi'
import placeholder from '@/assets/placeholder.jpg'
import type { MobileNavigationProps } from '../types'

function MobileNavigation({
  isMenuOpen,
  activeTab,
  navigationItems,
  onTabChange,
  onMenuToggle,
}: MobileNavigationProps) {
  return (
    <>
      {/* Mobile Layout: Hamburger - Logo - My Booking */}
      <div className="flex w-full items-center justify-between gap-2 lg:hidden">
        {/* Mobile Menu Button - Left */}
        <Button
          size={'lg'}
          className="hover:text-foreground flex-shrink-0 gap-1 rounded-full px-3"
          onClick={onMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
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
          className="hover:text-foreground flex-shrink-0 gap-1 rounded-full px-3"
          aria-label="My Booking"
        >
          <PiUmbrellaBold className="size-4 -rotate-45" />
          <span className="hidden text-xs sm:block">Booking</span>
        </Button>
      </div>

      {/* Mobile Menu Dropdown - Positioned below menu button */}
      {isMenuOpen && (
        <div className="absolute top-full left-4 z-50 lg:hidden">
          <div className="border-border bg-background w-64 overflow-hidden rounded-lg border shadow-2xl">
            <div className="p-4">
              {/* Navigation Items using Tab system */}
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`block w-full cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeTab === item.label
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'hover:bg-secondary hover:text-accent-foreground border-input bg-background'
                    }`}
                    onClick={() => {
                      onTabChange(item.label)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { MobileNavigation }
