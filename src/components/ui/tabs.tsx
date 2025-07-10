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
          className={`cursor-pointer border-b-2 p-2 font-medium whitespace-nowrap transition-colors ${
            activeTab === tab
              ? 'border-foreground text-foreground'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export { Tabs }
