import { motion } from 'framer-motion'
import { CalendarDays, Map, Sparkles, TrainFront, Users } from 'lucide-react'

const facts = [
  { label: 'Dates', value: 'Sep 13-20', icon: CalendarDays },
  { label: 'Route', value: 'Kyoto · Osaka · Tokyo', icon: TrainFront },
  { label: 'Crew', value: '9 travelers', icon: Users },
  { label: 'Style', value: 'Temples, food, markets, nights out', icon: Sparkles },
]

const rhythms = [
  {
    title: 'Start in Kyoto',
    copy: 'Temple mornings, guided Fushimi Inari, Arashiyama, market wandering, and flexible split options.',
  },
  {
    title: 'One Osaka day',
    copy: 'Castle grounds, street food, Dotonbori energy, and alternate aquarium or garden paths.',
  },
  {
    title: 'Finish in Tokyo',
    copy: 'Markets, sumo, vintage shopping, ramen, omakase, neon walks, and easy departure pacing.',
  },
]

function HomeIntro({ onStart }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080a0f] px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-28 lg:px-8">
      <img
        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=86"
        alt="Lantern-lit street in Japan"
        className="absolute inset-0 h-full w-full object-cover opacity-34"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(238,183,101,0.16),transparent_28rem),linear-gradient(180deg,rgba(8,10,15,0.76),rgba(8,10,15,0.94)),linear-gradient(90deg,rgba(8,10,15,0.82),rgba(8,10,15,0.42))]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 border border-amber-100/18 bg-white/[0.06] px-3 py-1 text-xs uppercase text-amber-50/70 backdrop-blur">
            <Map className="size-3.5" />
            Group itinerary overview
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
            Kindlers in Japan
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            A shared trip board for RSVP choices, daily pacing, food plans, and
            the big Kyoto to Tokyo arc. Start here, then jump into the day-by-day
            itinerary when you are ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onStart('Trip')}
              className="min-h-11 rounded-md bg-amber-100 px-5 py-3 text-sm font-semibold text-[#16110c] shadow-[0_0_30px_rgba(251,191,36,0.18)] transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80"
            >
              Open Trip
            </button>
            <button
              type="button"
              onClick={() => onStart('Schedule')}
              className="min-h-11 rounded-md border border-white/16 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/[0.11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
            >
              View Schedule
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: 'easeOut' }}
          className="grid gap-4"
        >
          <div className="grid gap-px overflow-hidden border border-white/12 bg-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:grid-cols-2">
            {facts.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-[#14171d]/88 p-5">
                <Icon className="mb-5 size-5 text-amber-100/86" />
                <p className="text-[0.68rem] uppercase text-white/42">{label}</p>
                <p className="mt-1.5 font-serif text-2xl font-semibold leading-tight text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {rhythms.map((item, index) => (
              <div
                key={item.title}
                className="border border-white/10 bg-black/30 p-5 backdrop-blur-xl"
              >
                <p className="text-xs uppercase text-amber-100/54">
                  Chapter {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeIntro
