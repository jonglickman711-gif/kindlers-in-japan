import { motion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function DayCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
    >
      <Card className="h-full overflow-hidden bg-card">
        <div className="aspect-[4/3] overflow-hidden">
          <img className="h-full w-full object-cover" src={item.image} alt={`${item.place} itinerary scene`} />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>{item.day}</span>
            <span>{item.place}</span>
          </div>
          <CardTitle>{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {item.notes.map((note) => (
              <li key={note} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-primary" />
                {note}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.article>
  )
}

export default DayCard
