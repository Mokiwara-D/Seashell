import { FaRegFrown } from 'react-icons/fa'

function NoResults() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <FaRegFrown className="mb-2 text-5xl" />
      <h1 className="text-2xl font-bold">No results found!</h1>
      <p className="text-muted-foreground text-sm">
        There are no holidays that match your current filters.
      </p>
    </div>
  )
}

export { NoResults }
