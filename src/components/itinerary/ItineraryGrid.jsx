import DayCard from '@/components/itinerary/DayCard'
import { itineraryDays } from '@/data/itinerary'

function ItineraryGrid() {
  return (
    <section id="days" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase text-muted-foreground">Featured days</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">
            Story-led day cards ready for the full itinerary.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {itineraryDays.map((item, index) => (
            <DayCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ItineraryGrid
