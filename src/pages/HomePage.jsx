import { useState } from 'react'
import AppHeader from '@/components/itinerary/AppHeader'
import HomeIntro from '@/components/itinerary/HomeIntro'
import ScheduleView from '@/components/itinerary/ScheduleView'
import TripView from '@/components/itinerary/TripView'
import { useRsvps } from '@/hooks/useRsvps'

function HomePage() {
  const [activeTab, setActiveTab] = useState('Home')
  const [selectedTraveler, setSelectedTraveler] = useState('all')
  const rsvp = useRsvps()

  return (
    <>
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'Home' && <HomeIntro onStart={setActiveTab} />}
      {activeTab === 'Trip' && (
        <TripView rsvp={rsvp} />
      )}
      {activeTab === 'Schedule' && (
        <ScheduleView
          selectedTraveler={selectedTraveler}
          onSelectTraveler={setSelectedTraveler}
          rsvp={rsvp}
        />
      )}
    </>
  )
}

export default HomePage
