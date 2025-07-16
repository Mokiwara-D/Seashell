import { Container } from '@/components/ui/container'
import { useState, useCallback } from 'react'
import { MobileNavigation } from './mobile/MobileNavigation'
import { MobileMenuOverlay } from './mobile/MobileMenuOverlay'
import { DesktopNavigation } from './desktop/DesktopNavigation'
import { NAVIGATION_ITEMS } from './navigationData'
// Remove unused import

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('Holidays')

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }, [])

  const handleMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <Container
        wrapperClassName="bg-background relative overflow-visible"
        contentClassName="gap-2 font-bold sm:gap-4 h-24"
      >
        <MobileNavigation
          isMenuOpen={isMobileMenuOpen}
          activeTab={activeTab}
          navigationItems={NAVIGATION_ITEMS}
          onTabChange={handleTabChange}
          onMenuToggle={handleMenuToggle}
        />

        <DesktopNavigation
          activeTab={activeTab}
          navigationItems={NAVIGATION_ITEMS}
          onTabChange={handleTabChange}
        />
      </Container>

      <MobileMenuOverlay isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
    </>
  )
}

export { NavBar }
