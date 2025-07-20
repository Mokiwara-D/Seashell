import { createContext, useState, type ReactNode } from 'react'

interface Destination {
  id: number
  name: string
}

interface DestinationContextType {
  destination: Destination
  setDestination: (destination: Destination) => void
}

const DestinationContext = createContext<DestinationContextType | undefined>(
  undefined
)

interface DestinationProviderProps {
  children: ReactNode
  initialDestination?: Destination
}

export function DestinationProvider({
  children,
  initialDestination = { id: 60, name: 'Spain' },
}: DestinationProviderProps) {
  const [destination, setDestination] =
    useState<Destination>(initialDestination)

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  )
}

export { DestinationContext }
