import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  text?: string
  size?: number
  className?: string
}

function Loading({ text = 'Loading...', size = 32, className }: LoadingProps) {
  return (
    <div
      className={cn(
        'bg-background/60 absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-1 px-6 py-6 shadow-lg backdrop-blur-sm',
        { 'px-12 md:px-24': text.length > 0 },
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Loader2 className="text-foreground animate-spin" size={size} />
        {text.length > 0 && (
          <span className="text-foreground text-xl">{text}</span>
        )}
      </div>
    </div>
  )
}

export { Loading }
