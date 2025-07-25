import * as React from 'react'
import { cn } from '@/lib/utils'
import { getSectionBackgroundColor } from '@/lib/sectionUtils'

type FadeDirection =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'horizontal'
  | 'vertical'

interface FadeProps {
  direction?: FadeDirection
  width?: string
  className?: string
  children?: React.ReactNode
}

function Fade({
  direction = 'horizontal',
  width = 'w-8',
  className,
  children,
}: FadeProps) {
  const fadeRef = React.useRef<HTMLDivElement>(null)
  const [backgroundClass, setBackgroundClass] =
    React.useState('from-background')

  // Update background class based on section context
  React.useEffect(() => {
    if (fadeRef.current) {
      const bgClass = getSectionBackgroundColor(fadeRef)
      setBackgroundClass(bgClass)
    }
  }, [])

  const renderFadeOverlay = (side: 'left' | 'right' | 'top' | 'bottom') => {
    const baseClasses = 'pointer-events-none absolute z-[5] to-transparent'

    const sideClasses = {
      left: cn(
        baseClasses,
        'top-0 bottom-0 -left-3 from-60%',
        'bg-gradient-to-r',
        backgroundClass,
        width
      ),
      right: cn(
        baseClasses,
        'top-0 -right-3 bottom-0 from-60%',
        'bg-gradient-to-l',
        backgroundClass,
        width
      ),
      top: cn(
        baseClasses,
        'left-0 right-0 top-0',
        'bg-gradient-to-b',
        backgroundClass,
        width.replace('w-', 'h-')
      ),
      bottom: cn(
        baseClasses,
        'right-0 bottom-0 left-0',
        'bg-gradient-to-t',
        backgroundClass,
        width.replace('w-', 'h-')
      ),
    }

    return <div key={side} className={sideClasses[side]} />
  }

  const shouldShowLeft = direction === 'left' || direction === 'horizontal'
  const shouldShowRight = direction === 'right' || direction === 'horizontal'
  const shouldShowTop = direction === 'top' || direction === 'vertical'
  const shouldShowBottom = direction === 'bottom' || direction === 'vertical'

  // If using contents class, render overlays as fragments without wrapper
  const isContentsMode = className?.includes('contents')

  const overlays = [
    shouldShowLeft && renderFadeOverlay('left'),
    shouldShowRight && renderFadeOverlay('right'),
    shouldShowTop && renderFadeOverlay('top'),
    shouldShowBottom && renderFadeOverlay('bottom'),
  ].filter(Boolean)

  if (isContentsMode) {
    return (
      <>
        <div ref={fadeRef} className={className}>
          {children}
        </div>
        {overlays}
      </>
    )
  }

  return (
    <div ref={fadeRef} className={cn('relative', className)}>
      {overlays}
      {children}
    </div>
  )
}

export { Fade }
