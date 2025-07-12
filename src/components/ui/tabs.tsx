import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <nav className={cn('flex space-x-8 overflow-x-auto', className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            'cursor-pointer border-b-2 p-2 font-medium whitespace-nowrap transition-colors',
            activeTab === tab
              ? 'border-foreground text-foreground'
              : 'text-muted-foreground hover:border-border hover:text-foreground border-transparent'
          )}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export { Tabs }
