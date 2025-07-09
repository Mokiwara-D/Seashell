import React from 'react'

type WrapperElement = 'header' | 'section' | 'footer'

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
      className: `w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ${className || ''}`,
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
      className={`mx-auto flex w-full max-w-sm items-center justify-between sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl ${className || ''}`}
    >
      {children}
    </div>
  )
}

interface ContainerProps {
  children?: React.ReactNode
  wrapperClassName?: string
  contentClassName?: string
}

function Container({
  children,
  wrapperClassName,
  contentClassName,
}: ContainerProps) {
  return (
    <Wrapper className={wrapperClassName}>
      <Content className={contentClassName}>{children}</Content>
    </Wrapper>
  )
}

export { Wrapper, Content, Container }
