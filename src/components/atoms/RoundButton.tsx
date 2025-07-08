interface RoundButtonProps {
  name: string
  icon?: string
  text?: string
  link?: string
  height?: string
  className?: string
}

function RoundButton({
  name,
  icon,
  text,
  link,
  height = '10',
  className,
}: RoundButtonProps) {
  return (
    <button
      id={name}
      className={`flex h-${height} w-auto min-w-${height} items-center justify-center gap-2 overflow-hidden rounded-full px-2 ${className}`}
      {...(link?.length && { href: link })}
    >
      <img
        src={icon}
        alt={`${name} icon`}
        className="aspect-auto h-full w-auto"
      />
      <span>{text}</span>
    </button>
  )
}

export { RoundButton }
