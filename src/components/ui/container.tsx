import React from 'react'
import { cn } from '@/lib/utils'

type WrapperElement = 'header' | 'footer' | 'section' | 'div'

interface WrapperProps<T extends WrapperElement = 'section'> {
  children?: React.ReactNode
  as?: T
  className?: string
}

function Wrapper<T extends WrapperElement = 'section'>({
  children,
  as,
  className,
  ...props
}: WrapperProps<T> & React.ComponentProps<T>) {
  const Component = (as || 'section') as WrapperElement

  return React.createElement(
    Component,
    {
      className: cn(
        'w-full flex flex-col items-center justify-center px-4 sm:px-12 overflow-hidden',
        className
      ),
      ...props,
    },
    children
  )
}

interface ContentProps {
  children?: React.ReactNode
  className?: string
}

function Content({ children, className }: ContentProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-7xl items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  )
}

interface ContainerProps {
  children?: React.ReactNode
  wrapperClassName?: string
  contentClassName?: string
  wrapperElement?: WrapperElement
}

function Container({
  children,
  wrapperClassName,
  contentClassName,
  wrapperElement,
}: ContainerProps) {
  return (
    <Wrapper className={wrapperClassName} as={wrapperElement}>
      <Content className={contentClassName}>{children}</Content>
    </Wrapper>
  )
}

export { Wrapper, Content, Container }
