import { Search, NavBar } from '@/components/sections'

function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 pt-4">
      <NavBar />
      <Search />
    </header>
  )
}

export { Header }
