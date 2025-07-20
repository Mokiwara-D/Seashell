import { Header, Main, Footer } from './components/layout'
import { DestinationPicker } from './components/sections/temp-destination-picker/DestinationPicker'
import { DestinationProvider } from './contexts'

function App() {
  return (
    <DestinationProvider>
      <div className="flex min-h-screen max-w-screen flex-col">
        <Header />
        <Main />
        <Footer />
        <DestinationPicker />
      </div>
    </DestinationProvider>
  )
}

export default App
