import * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { Fade } from '@/components/ui/fade'

const FADE_WIDTH = 'w-6'

interface FadeContainerProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  fadeWidth?: string
}

function FadeContainer({
  children,
  className,
  fadeWidth = FADE_WIDTH,
  ...props
}: FadeContainerProps) {
  return (
    <Container
      wrapperClassName={cn(
        'absolute left-1/2 z-0 -ml-[50vw] w-screen overflow-hidden',
        className
      )}
      wrapperElement="div"
      contentClassName="max-w-[81rem] relative"
      {...props}
    >
      <Fade direction="horizontal" width={fadeWidth} className="contents">
        {children}
      </Fade>
    </Container>
  )
}

export { FadeContainer }
