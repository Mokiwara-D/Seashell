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
  const [activeTab, setActiveTab] = useState('About')
  const [isExpanded, setIsExpanded] = useState(false)

  const tabs = ['About', 'Attractions', 'Weather', 'Resorts']

  const content = {
    About: (
      <p>
        Discover the enchanting beauty of Spain with Seashell Holidays. From the
        vibrant culture of Barcelona to the historic charm of Madrid, Spain
        offers an incredible diversity of experiences. Whether you're looking to
        relax on the pristine beaches of Costa del Sol, explore the
        architectural wonders of Gaudí, or indulge in world-class cuisine and
        wine, Spain has something for every traveler. Our carefully curated
        holiday packages ensure you experience the very best of this magnificent
        country, with comfortable accommodations, expert local guides, and
        unforgettable memories.
      </p>
    ),
    Attractions: (
      <p>
        Spain boasts world-renowned attractions including the iconic Sagrada
        Familia in Barcelona, the majestic Alhambra in Granada, and the vibrant
        Flamenco shows in Seville. Visit the stunning Park Güell, explore the
        historic streets of Toledo, or experience the excitement of Madrid's
        world-class museums like the Prado and Reina Sofia.
      </p>
    ),
    Weather: (
      <p>
        Spain enjoys a Mediterranean climate with warm, dry summers and mild
        winters. The best time to visit is during spring (April-June) and autumn
        (September-November) when temperatures are pleasant and crowds are
        smaller. Summer months offer perfect beach weather along the coastlines.
      </p>
    ),
    Resorts: (
      <p>
        Our partner resorts in Spain offer luxury accommodations across the
        country's most beautiful locations. From beachfront properties in Costa
        Brava to historic paradors in Andalusia, experience Spanish hospitality
        at its finest with modern amenities and authentic local experiences.
      </p>
    ),
  }

  const currentContent = content[activeTab as keyof typeof content]

  return (
    <Container
      wrapperClassName="py-8 md:py-12"
      contentClassName="flex flex-col gap-6 items-start"
    >
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" aria-label="Go to homepage">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" aria-label="Browse all holidays">
              Holidays
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Spain</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Navigation Tabs */}
      <Tabs
        className="w-full border-b border-gray-200"
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
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Show less content' : 'Show more content'}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </Container>
  )
}

export { LocationInfo }
