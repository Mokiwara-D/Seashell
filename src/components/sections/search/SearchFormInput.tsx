import { Input } from '@/components/ui/input'

interface SearchFormInputProps {
  label: string
  type: 'text' | 'date' | 'number'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  className?: string
  placeholder?: string
  min?: string | number
  max?: string | number
  required?: boolean
}

function SearchFormInput(props: SearchFormInputProps) {
  const {
    label,
    id,
    className,
    type,
    value,
    onChange,
    min,
    max,
    placeholder,
    required,
  } = props

  const labelElement = (
    <label
      htmlFor={id || label.toLowerCase().replace(/\s+/g, '-')}
      className="text-foreground mb-1 block text-xs font-semibold uppercase"
    >
      {label}
    </label>
  )

  return (
    <div className={`min-w-0 flex-1 ${className || ''}`}>
      {labelElement}
      <Input
        id={id || label.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        required={required}
        className={`text-foreground h-10 rounded-none border-none bg-white p-2 focus:ring-0 focus:outline-none ${
          type === 'number'
            ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            : ''
        }`}
      />
    </div>
  )
}

export { SearchFormInput }
