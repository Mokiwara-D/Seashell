import { Container } from '@/components/ui/container'
import { useDestination } from '@/contexts/useDestination'
import { useQuery } from '@tanstack/react-query'
import { fetchHolidays } from '@/query/queries/holidays'

function QueryTest2() {
  const { destination } = useDestination()

  const { data, isLoading, error } = useQuery({
    queryKey: ['holidays', destination.id],
    queryFn: () => fetchHolidays(destination.id),
    enabled: !!destination.id,
  })

  const renderContent = () => {
    if (isLoading) return 'Loading...'
    if (error) return `Error: ${error.message}`
    if (data) return JSON.stringify(data, null, 2)
    return 'No data'
  }

  return (
    <Container
      wrapperClassName="py-12 bg-blue-100"
      contentClassName="flex flex-col items-center justify-center gap-6 h-80"
    >
      <h1>{destination.name}</h1>
      <p className="max-w-4xl overflow-auto font-mono text-sm whitespace-pre-wrap">
        {renderContent()}
      </p>
    </Container>
  )
}

export { QueryTest2 }
