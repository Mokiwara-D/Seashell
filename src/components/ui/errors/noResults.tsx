import { BaseError } from './BaseError'

function NoResults() {
  return (
    <BaseError
      title="No results found!"
      message="There are no holidays that match your current filters."
    />
  )
}

export { NoResults }
