import { FaRegFrown } from 'react-icons/fa'
import type { ReactNode } from 'react'

interface BaseErrorProps {
  title: string
  message: string
  children?: ReactNode
}

function BaseError({ title, message, children }: BaseErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <FaRegFrown className="mb-2 text-5xl" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{message}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

export { BaseError }
