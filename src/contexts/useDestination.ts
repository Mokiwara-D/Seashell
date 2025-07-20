import { useContext } from 'react'
import { DestinationContext } from './DestinationContext'

export function useDestination() {
  const context = useContext(DestinationContext)
  if (context === undefined) {
    throw new Error('useDestination must be used within a DestinationProvider')
  }
  return context
}
