import { motion } from 'framer-motion'
import { BedDouble, MapPin, TrainFront } from 'lucide-react'
import ActivityBlock from '@/components/itinerary/ActivityBlock'
import ImageWithFallback from '@/components/itinerary/ImageWithFallback'

function DaySection({ day, index, rsvp }) {
  return (
    <section className="day-section bg-[#080a0f]">
      <div className="relative min-h-screen overflow-hidden px-4 pb-12 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8">
        <ImageWithFallback
          src={day.heroImage}
          alt={`${day.city} atmosphere`}
          title={day.city}
          className="absolute inset-0 h-full w-full object-cover opacity-36"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(232,180,104,0.11),transparent_34%),linear-gradient(180deg,rgba(8,10,15,0.76),rgba(8,10,15,0.91)),linear-gradient(90deg,rgba(8,10,15,0.76),rgba(8,10,15,0.34))]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="day-brief mb-8 grid gap-6 border border-white/12 bg-black/30 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6 lg:grid-cols-[0.65fr_1.35fr]"
          >
            <div>
              <p className="text-xs uppercase text-white/45">Day {String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
                {day.date}
              </h2>
              <p className="mt-3 text-base text-amber-100/72 sm:text-lg">{day.mood}</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 text-sm text-white/74 md:grid-cols-3">
              <div className="bg-[#14171d]/86 p-4">
                <MapPin className="mb-4 size-4 text-amber-100" />
                <p className="text-[0.68rem] uppercase text-white/42">City</p>
                <p className="mt-1.5 font-medium text-white">{day.city}</p>
              </div>
              <div className="bg-[#14171d]/86 p-4">
                <BedDouble className="mb-4 size-4 text-amber-100" />
                <p className="text-[0.68rem] uppercase text-white/42">Hotel</p>
                <p className="mt-1.5 font-medium text-white">{day.hotel}</p>
              </div>
              <div className="bg-[#14171d]/86 p-4">
                <TrainFront className="mb-4 size-4 text-amber-100" />
                <p className="text-[0.68rem] uppercase text-white/42">Travel</p>
                <p className="mt-1.5 font-medium leading-6 text-white">{day.travel}</p>
              </div>
            </div>
          </motion.div>

          <div className="itinerary-grid grid gap-5 lg:grid-cols-3">
            {day.sections.map((section) => (
              <ActivityBlock key={section.id} section={section} rsvp={rsvp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DaySection
