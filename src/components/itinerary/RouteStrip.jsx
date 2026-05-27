import { motion } from 'framer-motion'
import { TrainFront } from 'lucide-react'
import { routeStops } from '@/data/itinerary'

function RouteStrip() {
  return (
    <section id="route" className="bg-card px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
            <TrainFront className="size-5" />
          </span>
          <div>
            <p className="text-sm uppercase text-muted-foreground">Rail spine</p>
            <h2 className="font-serif text-3xl font-semibold">A route built for rhythm</h2>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-6">
          {routeStops.map((stop, index) => (
            <motion.div
              key={stop}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="relative min-h-28 border bg-background p-4"
            >
              <p className="text-sm text-muted-foreground">0{index + 1}</p>
              <p className="mt-6 font-serif text-2xl font-semibold">{stop}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RouteStrip
