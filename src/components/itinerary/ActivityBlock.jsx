import { motion } from 'framer-motion'
import ActivityComments from '@/components/itinerary/ActivityComments'
import ImageWithFallback from '@/components/itinerary/ImageWithFallback'
import RsvpBubbles from '@/components/itinerary/RsvpBubbles'
import { cn } from '@/lib/utils'

function ActivityOption({ option, section, exclusiveOptionIds, rsvp, comments }) {
  return (
    <div className="option-row group overflow-hidden border border-white/10 bg-white/[0.055] transition duration-500 hover:border-amber-100/24 hover:bg-white/[0.075] hover:shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
      <div className="grid">
        <div className="relative aspect-[16/9] overflow-hidden">
          <ImageWithFallback
            src={option.image}
            alt={`${section.time}: ${option.title}`}
            title={option.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.06),rgba(5,7,10,0.18)_42%,rgba(5,7,10,0.72))]" />
        </div>
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="grid gap-3">
              <h3 className="min-w-0 text-wrap font-serif text-[clamp(1.65rem,1.2rem+1.1vw,2rem)] font-semibold leading-[1.05] text-white">
                {option.title}
              </h3>
              <div className="min-w-0">
                <ActivityComments activity={option} comments={comments} />
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/74">{option.details}</p>
            {option.notes && (
              <p className="mt-4 border-l border-amber-200/30 pl-4 text-sm leading-6 text-amber-50/72">
                {option.notes}
              </p>
            )}
          </div>
          {option.rsvpMode !== 'none' && (
            <RsvpBubbles
              activityId={option.id}
              exclusiveOptionIds={
                option.rsvpMode === 'exclusiveGroup' ? exclusiveOptionIds : []
              }
              {...rsvp}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function ActivityBlock({ section, rsvp, comments }) {
  const exclusiveOptionIds = section.options
    .filter((option) => option.rsvpMode === 'exclusiveGroup')
    .map((option) => option.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'activity-card overflow-hidden border border-white/12 bg-[#101318]/84 shadow-[0_24px_90px_rgba(0,0,0,0.3)] backdrop-blur transition duration-500 hover:border-white/20',
        section.time === 'Night' && 'night-card border-amber-100/18',
      )}
    >
      <div className="border-b border-white/10 bg-black/30 p-5">
        <p className="text-[0.68rem] uppercase text-amber-100/62">{section.time}</p>
        <h3 className="mt-1 font-serif text-3xl font-semibold leading-none text-white">
          {section.time}
        </h3>
        {exclusiveOptionIds.length > 1 && (
          <p className="mt-3 text-[0.68rem] uppercase text-white/42">
            Choose one option for this block
          </p>
        )}
      </div>
      <div className="grid gap-3 p-3 sm:p-4">
        {section.options.map((option) => (
          <ActivityOption
            key={option.id}
            option={option}
            section={section}
            exclusiveOptionIds={exclusiveOptionIds}
            rsvp={rsvp}
            comments={comments}
          />
        ))}
      </div>
    </motion.article>
  )
}

export default ActivityBlock
