interface InnerContainerProps {
  children?: React.ReactNode
  className?: string
}

function InnerContainer({ children, className }: InnerContainerProps) {
  return (
    <div
      className={`container flex w-full max-w-3/4 self-center overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

export { InnerContainer }
