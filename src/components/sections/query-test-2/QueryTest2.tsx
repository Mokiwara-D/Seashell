import { Container } from '@/components/ui/container'
import { useDestination } from '@/contexts/useDestination'

function QueryTest2() {
  const { destination } = useDestination()
  
  return (
    <Container
      wrapperClassName="py-12 bg-blue-100"
      contentClassName="flex flex-col items-center justify-center gap-6 h-80"
    >
      <h1>{destination.name}</h1>
    </Container>
  )
}

export { QueryTest2 }
