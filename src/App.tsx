import { Header, Main, Footer } from './components/layout'
import { DestinationProvider } from './contexts'

function App() {
  return (
    <DestinationProvider>
      <div className="flex min-h-screen max-w-screen flex-col">
        <Header />
        <Main />
        <Footer />
      </div>
    </DestinationProvider>
  )
}

export default App
