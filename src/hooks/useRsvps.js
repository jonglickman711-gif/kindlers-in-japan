import { useEffect, useMemo, useState } from 'react'
import { hasSupabaseConfig, supabase } from '@/lib/supabase'

const STORAGE_KEY = 'kindlers-in-japan-rsvps'

function readStoredRsvps() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function writeStoredRsvps(rsvps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvps))
}

function rowsToRsvps(rows) {
  return rows.reduce((rsvps, row) => {
    if (!row.attending) return rsvps

    return {
      ...rsvps,
      [row.activity_id]: [...(rsvps[row.activity_id] ?? []), row.traveler],
    }
  }, {})
}

function applyRow(rsvps, row) {
  const going = rsvps[row.activity_id] ?? []
  const nextGoing = row.attending
    ? [...new Set([...going, row.traveler])]
    : going.filter((traveler) => traveler !== row.traveler)

  return {
    ...rsvps,
    [row.activity_id]: nextGoing,
  }
}

export function useRsvps() {
  const [rsvps, setRsvps] = useState(() =>
    hasSupabaseConfig ? {} : readStoredRsvps(),
  )
  const [mode, setMode] = useState(hasSupabaseConfig ? 'syncing' : 'local')
  const [realtimeStatus, setRealtimeStatus] = useState('idle')

  useEffect(() => {
    if (mode === 'local') {
      writeStoredRsvps(rsvps)
    }
  }, [mode, rsvps])

  useEffect(() => {
    if (!supabase) {
      console.info('[RSVP] Supabase env vars missing; using localStorage fallback.')
      return undefined
    }

    let active = true

    async function loadRsvps() {
      console.info('[RSVP] Fetching Supabase RSVP rows.')
      const { data, error } = await supabase
        .from('rsvps')
        .select('activity_id, traveler, attending')

      if (!active) return

      if (error) {
        console.error('[RSVP] Supabase fetch failed; using localStorage fallback.', error)
        setRsvps(readStoredRsvps())
        setMode('local')
        return
      }

      console.info(`[RSVP] Supabase fetch succeeded with ${data?.length ?? 0} rows.`)
      setRsvps(rowsToRsvps(data ?? []))
      setMode('supabase')
    }

    loadRsvps()

    const channel = supabase
      .channel('rsvps-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rsvps' },
        (payload) => {
          console.info('[RSVP] Supabase realtime change received.', payload)
          const row = payload.new ?? payload.old
          if (!row?.activity_id || !row?.traveler) return

          setRsvps((current) => applyRow(current, row))
        },
      )
      .subscribe((status) => {
        console.info('[RSVP] Supabase realtime status:', status)
        setRealtimeStatus(status)
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error('[RSVP] Supabase realtime unavailable. Fetch/upsert can still be shared if Supabase is active.')
        }
      })

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  const api = useMemo(
    () => ({
      mode,
      realtimeStatus,
      rsvps,
      getGoing(activityId) {
        return rsvps[activityId] ?? []
      },
      isGoing(activityId, travelerId) {
        return (rsvps[activityId] ?? []).includes(travelerId)
      },
      toggle(activityId, travelerId, exclusiveOptionIds = []) {
        const currentGoing = rsvps[activityId] ?? []
        const isCurrentlyGoing = currentGoing.includes(travelerId)

        setRsvps((current) => {
          const going = current[activityId] ?? []
          const nextGoing = isCurrentlyGoing
            ? going.filter((id) => id !== travelerId)
            : [...going, travelerId]

          const next = {
            ...current,
            [activityId]: nextGoing,
          }

          if (!isCurrentlyGoing && exclusiveOptionIds.length > 0) {
            exclusiveOptionIds
              .filter((id) => id !== activityId)
              .forEach((id) => {
                next[id] = (next[id] ?? []).filter((id) => id !== travelerId)
              })
          }

          if (mode === 'local') {
            writeStoredRsvps(next)
          }

          return next
        })

        if (mode === 'local' || !supabase) {
          console.info('[RSVP] Toggle stored locally only.', {
            activityId,
            travelerId,
            mode,
          })
          return
        }

        const now = new Date().toISOString()
        const updates = [
          {
            activity_id: activityId,
            traveler: travelerId,
            attending: !isCurrentlyGoing,
            updated_at: now,
          },
        ]

        if (!isCurrentlyGoing && exclusiveOptionIds.length > 0) {
          exclusiveOptionIds
            .filter((id) => id !== activityId)
            .forEach((id) => {
              updates.push({
                activity_id: id,
                traveler: travelerId,
                attending: false,
                updated_at: now,
              })
            })
        }

        console.info('[RSVP] Upserting Supabase RSVP rows.', updates)

        supabase
          .from('rsvps')
          .upsert(updates, { onConflict: 'activity_id,traveler' })
          .then(({ error }) => {
            if (error) {
              console.error('[RSVP] Supabase upsert failed; using localStorage fallback.', error)
              setMode('local')
              return
            }

            console.info('[RSVP] Supabase upsert succeeded.')
          })
      },
    }),
    [mode, realtimeStatus, rsvps],
  )

  return api
}
