import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { travelers } from '@/data/itinerary'
import { cn } from '@/lib/utils'

function RsvpBubbles({ activityId, exclusiveOptionIds = [], getGoing, isGoing, toggle }) {
  const [confirmations, setConfirmations] = useState({})
  const going = getGoing(activityId)
  const isFull = going.length === travelers.length

  useEffect(() => {
    const timers = Object.keys(confirmations).map((travelerId) =>
      setTimeout(() => {
        setConfirmations((current) => {
          const next = { ...current }
          delete next[travelerId]
          return next
        })
      }, 900),
    )

    return () => timers.forEach(clearTimeout)
  }, [confirmations])

  function handleToggle(traveler) {
    const selected = isGoing(activityId, traveler.id)
    toggle(activityId, traveler.id, exclusiveOptionIds)

    if (!selected) {
      setConfirmations((current) => ({
        ...current,
        [traveler.id]: (current[traveler.id] ?? 0) + 1,
      }))
    }
  }

  return (
    <div className="mt-5 border-t border-white/10 pt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[0.68rem] uppercase text-white/50">{going.length}/9 going</p>
        {isFull && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="full-crew rounded-sm border border-amber-200/40 bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-100"
          >
            FULL CREW
          </motion.span>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {travelers.map((traveler) => {
          const selected = isGoing(activityId, traveler.id)

          return (
            <button
              key={traveler.id}
              type="button"
              data-testid={`rsvp-${activityId}-${traveler.id}`}
              aria-label={`${traveler.name} RSVP for ${activityId}`}
              onClick={() => handleToggle(traveler)}
              className={cn(
                'traveler-bubble relative min-h-11 rounded-full border px-3.5 py-2 text-left text-xs transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/75',
                selected
                  ? 'selected border-amber-200 bg-amber-100 text-[#16110c] shadow-[0_0_0_1px_rgba(251,191,36,0.18),0_0_28px_rgba(251,191,36,0.26)]'
                  : 'border-white/12 bg-white/[0.065] text-white/66 hover:border-white/28 hover:bg-white/[0.105] hover:text-white',
              )}
            >
              <AnimatePresence>
                {confirmations[traveler.id] && (
                  <motion.span
                    key={`${traveler.id}-${confirmations[traveler.id]}`}
                    aria-hidden="true"
                    className={cn('traveler-effect', traveler.effect)}
                    initial={{ opacity: 0, y: 6, scale: 0.75 }}
                    animate={{ opacity: 1, y: -12, scale: 1.25 }}
                    exit={{ opacity: 0, y: -28, scale: 0.85 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                  >
                    {traveler.emoji}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="mr-1">{traveler.emoji}</span>
              {traveler.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RsvpBubbles
