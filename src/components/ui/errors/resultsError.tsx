import { Button } from '@/components/ui/button'
import { BaseError } from './BaseError'

interface ResultsErrorProps {
  onRetry: () => void
  message?: string
  title?: string
}

function ResultsError({
  onRetry,
  message = 'Failed to load holidays',
  title = 'Something went wrong',
}: ResultsErrorProps) {
  return (
    <BaseError title={title} message={message}>
      <Button onClick={onRetry} variant="outline" className="rounded-full px-6">
        Try again
      </Button>
    </BaseError>
  )
}

export { ResultsError }
