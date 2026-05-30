import { useState } from 'react'
import AppHeader from '@/components/itinerary/AppHeader'
import HomeIntro from '@/components/itinerary/HomeIntro'
import ScheduleView from '@/components/itinerary/ScheduleView'
import TripView from '@/components/itinerary/TripView'
import { useComments } from '@/hooks/useComments'
import { useRsvps } from '@/hooks/useRsvps'

function HomePage() {
  const [activeTab, setActiveTab] = useState('Home')
  const [selectedTraveler, setSelectedTraveler] = useState('all')
  const rsvp = useRsvps()
  const comments = useComments()

  return (
    <>
      <AppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        rsvpMode={rsvp.mode}
        commentsMode={comments.mode}
      />
      {activeTab === 'Home' && <HomeIntro onStart={setActiveTab} />}
      {activeTab === 'Trip' && (
        <TripView rsvp={rsvp} comments={comments} />
      )}
      {activeTab === 'Schedule' && (
        <ScheduleView
          selectedTraveler={selectedTraveler}
          onSelectTraveler={setSelectedTraveler}
          rsvp={rsvp}
          comments={comments}
        />
      )}
    </>
  )
}

export default HomePage
