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
        'w-screen items-start !pl-2 !pr-12 overflow-hidden -ml-2',
        isFullHeight ? 'h-full' : 'h-fit',
        className
      )}
      wrapperElement="div"
      contentClassName={cn(
        'max-w-[81rem] relative m-0',
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
