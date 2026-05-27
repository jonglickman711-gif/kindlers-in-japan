import { motion } from 'framer-motion'
import { ArrowDown, CalendarDays, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

function HeroSection() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-foreground text-white">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2200&q=90"
        alt="A pagoda rising above autumn trees in Japan"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,15,0.2),rgba(9,12,15,0.78)),linear-gradient(90deg,rgba(9,12,15,0.72),rgba(9,12,15,0.18))]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.65fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/85 backdrop-blur">
            <MapPin className="size-4" />
            Tokyo to Osaka, 12 nights
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
            Japan, paced like a film.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            A cinematic travel itinerary foundation for slow mornings, precise
            route logic, transport notes, food discoveries, and memory-rich
            day planning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#route">
                <ArrowDown />
                Explore Route
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <a href="#days">
                <CalendarDays />
                View Days
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="self-end border border-white/20 bg-black/28 p-5 backdrop-blur-xl"
        >
          <p className="text-sm uppercase text-white/55">Current chapter</p>
          <p className="mt-4 font-serif text-3xl leading-tight">
            Arrival light, train windows, temple gates, and nights that stay
            open late.
          </p>
        </motion.aside>
      </div>
    </section>
  )
}

export default HeroSection
