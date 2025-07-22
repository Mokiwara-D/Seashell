export interface NavigationItem {
  id: string
  label: string
  href: string
}

export interface NavBarProps {
  navigationItems: NavigationItem[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export interface MobileNavigationProps {
  isMenuOpen: boolean
  activeTab: string
  navigationItems: NavigationItem[]
  onTabChange: (tab: string) => void
  onMenuToggle: () => void
}

export interface DesktopNavigationProps {
  activeTab: string
  navigationItems: NavigationItem[]
  onTabChange: (tab: string) => void
}

export interface MobileMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}
