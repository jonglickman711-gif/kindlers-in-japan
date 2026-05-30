import { CalendarDays, Users } from 'lucide-react'
import ActivityComments from '@/components/itinerary/ActivityComments'
import { allActivities, travelers, tripDays } from '@/data/itinerary'
import { cn } from '@/lib/utils'

function ScheduleView({ selectedTraveler, onSelectTraveler, rsvp, comments }) {
  const filteredActivities =
    selectedTraveler === 'all'
      ? allActivities
      : allActivities.filter((activity) => rsvp.isGoing(activity.id, selectedTraveler))
  const groupedDays = tripDays
    .map((day) => ({
      ...day,
      activities: filteredActivities.filter((activity) => activity.dayId === day.id),
    }))
    .filter((day) => day.activities.length > 0)

  return (
    <section className="min-h-screen bg-[#090b0f] px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase text-amber-100/55">Clean agenda</p>
            <h1 className="mt-2 font-serif text-5xl font-semibold leading-none sm:text-6xl">
              Schedule
            </h1>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              data-testid="filter-all"
              aria-label="All schedule filter"
              onClick={() => onSelectTraveler('all')}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/75',
                selectedTraveler === 'all'
                  ? 'border-amber-200 bg-amber-100 text-[#16110c] shadow-[0_0_24px_rgba(251,191,36,0.16)]'
                  : 'border-white/12 bg-white/[0.06] text-white/68 hover:bg-white/[0.1] hover:text-white',
              )}
            >
              All
            </button>
            {travelers.map((traveler) => (
              <button
                key={traveler.id}
                type="button"
                data-testid={`filter-${traveler.id}`}
                aria-label={`${traveler.name} schedule filter`}
                onClick={() => onSelectTraveler(traveler.id)}
                className={cn(
                  'min-h-11 rounded-full border px-4 py-2 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/75',
                  selectedTraveler === traveler.id
                    ? 'border-amber-200 bg-amber-100 text-[#16110c] shadow-[0_0_24px_rgba(251,191,36,0.16)]'
                    : 'border-white/12 bg-white/[0.06] text-white/68 hover:bg-white/[0.1] hover:text-white',
                )}
              >
                <span className="mr-1">{traveler.emoji}</span>
                {traveler.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          {groupedDays.map((day) => (
            <section key={day.id} className="schedule-day">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-amber-100/76">{day.date}</p>
                  <h2 className="font-serif text-3xl font-semibold text-white">
                    {day.city}
                  </h2>
                </div>
                <p className="text-xs uppercase text-white/42">{day.activities.length} plans</p>
              </div>

              <div className="grid overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur">
                {day.activities.map((activity) => {
                  const going = rsvp.getGoing(activity.id)

                  return (
                    <article
                      key={activity.id}
                      className="grid gap-4 border-b border-white/10 p-4 transition duration-300 last:border-b-0 hover:bg-white/[0.045] lg:grid-cols-[8rem_1fr_8rem]"
                    >
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase text-white/52">
                          <CalendarDays className="size-3.5 text-amber-100/70" />
                          {activity.time}
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="font-serif text-2xl font-semibold leading-tight text-white">
                            {activity.title}
                          </h3>
                          <div className="shrink-0">
                            <ActivityComments activity={activity} comments={comments} />
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/64">{activity.details}</p>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-white/70 lg:justify-end">
                        <Users className="mt-0.5 size-4 text-amber-100/70" />
                        <span>{going.length}/9 going</span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {groupedDays.length === 0 && (
          <div className="border border-white/12 bg-white/[0.06] p-8 text-center text-white/60">
            No RSVP selections yet for this traveler.
          </div>
        )}
      </div>
    </section>
  )
}

export default ScheduleView
