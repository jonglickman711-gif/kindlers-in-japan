import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'kindlers-in-japan-rsvps'

function readStoredRsvps() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

export function useRsvps() {
  const [rsvps, setRsvps] = useState(readStoredRsvps)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvps))
  }, [rsvps])

  const api = useMemo(
    () => ({
      rsvps,
      getGoing(activityId) {
        return rsvps[activityId] ?? []
      },
      isGoing(activityId, travelerId) {
        return (rsvps[activityId] ?? []).includes(travelerId)
      },
      toggle(activityId, travelerId, exclusiveOptionIds = []) {
        setRsvps((current) => {
          const going = current[activityId] ?? []
          const isCurrentlyGoing = going.includes(travelerId)
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

          return next
        })
      },
    }),
    [rsvps],
  )

  return api
}
