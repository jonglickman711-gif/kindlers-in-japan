import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const tabs = ['Home', 'Trip', 'Schedule']

function AppHeader({ activeTab, onTabChange, rsvpMode }) {
  const [sways, setSways] = useState(0)
  const isShared = rsvpMode === 'supabase'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b0f]/82 text-white shadow-[0_14px_45px_rgba(0,0,0,0.26)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="font-serif text-lg font-semibold leading-none sm:text-2xl">
            Kindlers in Japan
          </p>
          <p className="mt-1 hidden text-xs uppercase text-white/45 sm:block">
            Kyoto · Osaka · Tokyo
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-white/12 bg-white/[0.06] p-1 shadow-inner shadow-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              data-testid={`tab-${tab.toLowerCase()}`}
              aria-label={`${tab} tab`}
              onClick={() => onTabChange(tab)}
              className={cn(
                'h-9 rounded-sm px-3 text-sm font-medium text-white/62 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:px-4',
                activeTab === tab && 'bg-amber-50 text-[#111318] shadow-[0_0_24px_rgba(255,214,151,0.16)]',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className={cn(
            'absolute right-4 top-[calc(100%+0.5rem)] rounded-full border px-2.5 py-1 text-[0.68rem] uppercase backdrop-blur lg:static',
            isShared
              ? 'border-emerald-200/20 bg-emerald-200/10 text-emerald-100/75'
              : 'border-amber-200/16 bg-amber-200/8 text-amber-100/62',
          )}>
            {isShared ? 'Shared RSVP active' : 'Local mode only'}
          </span>
          <motion.button
            type="button"
            aria-label="Sway lantern"
            onClick={() => setSways((count) => count + 1)}
            animate={{ rotate: sways ? [0, -5, 4, -2, 0] : 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="lantern-button relative grid size-10 place-items-center rounded-md border border-amber-200/20 bg-amber-200/8 text-lg shadow-[0_0_22px_rgba(245,158,11,0.1)] transition hover:bg-amber-200/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:size-11 sm:text-xl"
          >
            <span className="absolute top-1 h-2 w-px bg-amber-100/45" />
            <span className="drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">🏮</span>
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
