import { Search } from '@/components/sections/search/Search'
import { NavBar } from '@/components/sections/NavBar'

function Header() {
  return (
    <header className="bg-background sticky top-0 pt-4">
      <NavBar />
      <Search />
    </header>
  )
}

export { Header }
