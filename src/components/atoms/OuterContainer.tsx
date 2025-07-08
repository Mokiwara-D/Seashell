import React from 'react'

type OuterContainerElement = 'header' | 'section' | 'footer'

interface OuterContainerProps<T extends OuterContainerElement = 'section'> {
  children?: React.ReactNode
  as?: T
  className?: string
}

function OuterContainer<T extends OuterContainerElement = 'section'>({
  children,
  as,
  className,
}: OuterContainerProps<T>) {
  const Component = (as || 'section') as OuterContainerElement

  return React.createElement(
    Component,
    {
      id: `${Component}-container`,
      className: `flex w-dvw flex-col py-4 ${className}`,
    },
    children
  )
}

export { OuterContainer }
