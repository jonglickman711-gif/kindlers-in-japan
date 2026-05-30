import DaySection from '@/components/itinerary/DaySection'
import { tripDays } from '@/data/itinerary'

function TripView({ rsvp, comments }) {
  return (
    <div className="bg-[#080a0f]">
      {tripDays.map((day, index) => (
        <DaySection
          key={day.id}
          day={day}
          index={index}
          rsvp={rsvp}
          comments={comments}
        />
      ))}
    </div>
  )
}

export default TripView
