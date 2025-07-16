import { Search } from '@/components/layout/header/search/Search'
import { NavBar } from '@/components/layout/header/navBar/NavBar'

function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 pt-4">
      <NavBar />
      <Search />
    </header>
  )
}

export { Header }
