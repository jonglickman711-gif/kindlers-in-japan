import { CalendarDays, Users } from 'lucide-react'
import ActivityComments from '@/components/itinerary/ActivityComments'
import { allActivities, travelers, tripDays } from '@/data/itinerary'
import { cn } from '@/lib/utils'

const travelerNames = Object.fromEntries(
  travelers.map((traveler) => [traveler.id, traveler.name]),
)

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
                  const goingNames = going.map((travelerId) => travelerNames[travelerId] ?? travelerId)
                  const goingLabel =
                    activity.rsvpMode === 'none'
                      ? 'No RSVP'
                      : goingNames.length > 0
                        ? goingNames.join(', ')
                        : 'No one yet'

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
                        <div className="grid gap-3">
                          <h3 className="min-w-0 text-wrap font-serif text-2xl font-semibold leading-tight text-white">
                            {activity.title}
                          </h3>
                          <div className="min-w-0">
                            <ActivityComments activity={activity} comments={comments} />
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/64">{activity.details}</p>
                      </div>
                      <div
                        className="group/going relative flex items-start gap-2 text-sm text-white/70 lg:justify-end"
                        title={goingLabel}
                      >
                        <Users className="mt-0.5 size-4 text-amber-100/70" />
                        <span>
                          {activity.rsvpMode === 'none' ? 'No RSVP' : `${going.length}/9 going`}
                        </span>
                        {activity.rsvpMode !== 'none' && (
                          <div className="pointer-events-none absolute right-0 top-7 z-20 w-52 translate-y-1 border border-white/12 bg-[#0d1016]/96 p-3 text-xs leading-5 text-white/72 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur transition duration-200 group-hover/going:translate-y-0 group-hover/going:opacity-100 group-focus-within/going:translate-y-0 group-focus-within/going:opacity-100">
                            {goingLabel}
                          </div>
                        )}
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
