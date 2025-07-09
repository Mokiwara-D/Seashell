import { Container } from '@/components/ui/container'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Tabs } from '@/components/ui/tabs'
import { useState } from 'react'

function LocationInfo() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isExpanded, setIsExpanded] = useState(false)

  const tabs = ['Overview', 'Food & Drink', 'Beaches', 'Nightlife', 'Families']

  const tabContent = {
    Overview: `Spain is a European nation which can be found situated between France, to the northeast, and Portugal, to the west. One of the most singular destinations on the globe, Spain is a fascinating and quite varied country whether you want to stay along the coast or explore the countryside. One of the most recognised features on the map, Spain is famous for the many fantastic beaches you'll discover along the coastline, the magnificent architecture including the famously colourful shell-shaped buildings of famed Catalonian architect Antoni Gaudi, the Dadaist masterpieces of legendary surrealist artist Salvador Dali, or the pageant sports and festivals of the population, culture of Spain. A far cry from the stereotypical view from a country, a trip to Spain is a particularly exciting adventure, whether you want to visit crowded, frantic urban centres or peaceful, desert-like rural areas. Spain is the third most visited country in the world. Spain is surrounded by only Armenia and France when it comes to international tourist arrivals. A world total of 75 million visitors have come to the crowd. For paella, a delectable slow-cooked rice dish traditionally cooked with seafood or lamb, and spicy chorizo flavours. As long as the local culture is preserved, a visit to one of Spain's beautiful provinces would not be the same.`,
    'Food & Drink': `Spanish cuisine is renowned worldwide for its rich flavors and diverse regional specialties. From the famous paella of Valencia to the pintxos of the Basque Country, Spain offers an incredible culinary journey. Don't miss trying authentic tapas, jamón ibérico, gazpacho, and traditional Spanish wines and sangria.`,
    Beaches: `Spain boasts some of Europe's most beautiful beaches along its extensive coastline. The Costa del Sol, Costa Brava, and Balearic Islands offer pristine sandy beaches with crystal-clear waters. Whether you prefer bustling beach resorts or secluded coves, Spain's diverse coastal regions have something for every beach lover.`,
    Nightlife: `Spanish nightlife is legendary, with cities like Madrid, Barcelona, and Ibiza offering world-class entertainment. From traditional flamenco shows to cutting-edge nightclubs, Spain comes alive after dark. The Spanish tradition of staying up late means the party often continues until dawn, especially during weekends and festivals.`,
    Families: `Spain is an excellent destination for families, offering a perfect blend of culture, adventure, and relaxation. Theme parks like PortAventura, beautiful beaches with calm waters, interactive museums, and family-friendly festivals make Spain an ideal choice for travelers with children of all ages.`,
  }

  const currentContent = tabContent[activeTab as keyof typeof tabContent]

  return (
    <Container
      wrapperClassName="py-8 md:py-12"
      contentClassName="flex flex-col gap-6 items-start"
    >
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Holidays</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Spain</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Navigation Tabs */}
      <Tabs
        className="border-b border-gray-200"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content Area */}
      <div className="space-y-4">
        <div className="relative">
          <div
            className={`text-muted-foreground overflow-hidden text-sm leading-snug transition-all duration-500 ease-in-out md:text-base ${
              isExpanded ? 'max-h-96' : 'max-h-24'
            }`}
          >
            {currentContent}
          </div>

          {/* Gradient Overlay - only visible when not expanded */}
          {!isExpanded && (
            <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t to-transparent" />
          )}
        </div>

        {/* Read More Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-accent hover:text-accent/80 cursor-pointer text-sm font-medium transition-colors"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </Container>
  )
}

export { LocationInfo }
