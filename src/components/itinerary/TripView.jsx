import DaySection from '@/components/itinerary/DaySection'
import { tripDays } from '@/data/itinerary'

function TripView({ rsvp }) {
  return (
    <div className="trip-scroll h-screen snap-y snap-proximity overflow-y-auto bg-[#080a0f]">
      {tripDays.map((day, index) => (
        <DaySection key={day.id} day={day} index={index} rsvp={rsvp} />
      ))}
    </div>
  )
}

export default TripView
