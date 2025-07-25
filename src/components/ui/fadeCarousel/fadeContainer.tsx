import * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { Fade } from '@/components/ui/fade'

const FADE_WIDTH = 'w-6'

interface FadeContainerProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  fadeWidth?: string
  isFullHeight?: boolean
}

function FadeContainer({
  children,
  className,
  fadeWidth = FADE_WIDTH,
  isFullHeight = false,
  ...props
}: FadeContainerProps) {
  return (
    <Container
      wrapperClassName={cn(
        'absolute left-1/2 z-0 -ml-[50vw] w-screen overflow-hidden',
        isFullHeight ? 'h-full' : 'h-fit',
        className
      )}
      wrapperElement="div"
      contentClassName={cn(
        'max-w-[81rem] relative',
        isFullHeight ? 'h-full' : 'h-fit'
      )}
      {...props}
    >
      <Fade direction="horizontal" width={fadeWidth} className="contents">
        {children}
      </Fade>
    </Container>
  )
}

export { FadeContainer }
