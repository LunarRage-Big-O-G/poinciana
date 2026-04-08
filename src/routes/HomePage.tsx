import { useSuspenseQuery } from '@tanstack/react-query'
import { ExperiencesSection } from '../components/home/ExperiencesSection'
import { HeroSection } from '../components/home/HeroSection'
import { MoodBridge } from '../components/home/MoodBridge'
import { ResidencesSection } from '../components/home/ResidencesSection'
import { propertyListQueryOptions } from '../lib/propertyQueries'

export function HomePage() {
  const { data: properties } = useSuspenseQuery(propertyListQueryOptions())

  return (
    <div className="page-home">
      <HeroSection properties={properties} />
      <div className="page-home-below">
        <MoodBridge />
        <ResidencesSection properties={properties} />
        <ExperiencesSection />
      </div>
    </div>
  )
}
