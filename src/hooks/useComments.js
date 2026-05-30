import { useEffect, useMemo, useState } from 'react'
import { hasSupabaseConfig, supabase } from '@/lib/supabase'

const STORAGE_KEY = 'kindlers-in-japan-comments'

function readStoredComments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function writeStoredComments(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
}

function groupComments(rows) {
  return rows.reduce((comments, row) => {
    const activityComments = comments[row.activity_id] ?? []

    return {
      ...comments,
      [row.activity_id]: [...activityComments, row],
    }
  }, {})
}

function addRow(comments, row) {
  const activityComments = comments[row.activity_id] ?? []

  if (activityComments.some((comment) => comment.id === row.id)) {
    return comments
  }

  return {
    ...comments,
    [row.activity_id]: [...activityComments, row],
  }
}

function createLocalComment(activityId, author, message) {
  return {
    id: crypto.randomUUID?.() ?? `${activityId}-${Date.now()}`,
    activity_id: activityId,
    author,
    message,
    created_at: new Date().toISOString(),
  }
}

export function useComments() {
  const [comments, setComments] = useState(() =>
    hasSupabaseConfig ? {} : readStoredComments(),
  )
  const [mode, setMode] = useState(hasSupabaseConfig ? 'syncing' : 'local')

  useEffect(() => {
    if (mode === 'local') {
      writeStoredComments(comments)
    }
  }, [comments, mode])

  useEffect(() => {
    if (!supabase) {
      console.info('[Comments] Supabase env vars missing; using localStorage fallback.')
      return undefined
    }

    let active = true

    async function loadComments() {
      console.info('[Comments] Fetching Supabase comment rows.')
      const { data, error } = await supabase
        .from('activity_comments')
        .select('id, activity_id, author, message, created_at')
        .order('created_at', { ascending: true })

      if (!active) return

      if (error) {
        console.error('[Comments] Supabase fetch failed; using localStorage fallback.', error)
        setComments(readStoredComments())
        setMode('local')
        return
      }

      console.info(`[Comments] Supabase fetch succeeded with ${data?.length ?? 0} rows.`)
      setComments(groupComments(data ?? []))
      setMode('supabase')
    }

    loadComments()

    const channel = supabase
      .channel('activity-comments-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_comments' },
        (payload) => {
          console.info('[Comments] Supabase realtime insert received.', payload)
          if (!payload.new?.activity_id) return
          setComments((current) => addRow(current, payload.new))
        },
      )
      .subscribe((status) => {
        console.info('[Comments] Supabase realtime status:', status)
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error('[Comments] Supabase realtime unavailable. Fetch/insert can still be shared if Supabase is active.')
        }
      })

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  return useMemo(
    () => ({
      mode,
      getComments(activityId) {
        return comments[activityId] ?? []
      },
      async addComment(activityId, author, message) {
        const cleanAuthor = author.trim()
        const cleanMessage = message.trim()

        if (!cleanAuthor || !cleanMessage) return

        if (mode === 'local' || !supabase) {
          const localComment = createLocalComment(activityId, cleanAuthor, cleanMessage)
          setComments((current) => addRow(current, localComment))
          return
        }

        console.info('[Comments] Inserting Supabase comment row.', {
          activityId,
          author: cleanAuthor,
        })

        const { data, error } = await supabase
          .from('activity_comments')
          .insert({
            activity_id: activityId,
            author: cleanAuthor,
            message: cleanMessage,
          })
          .select('id, activity_id, author, message, created_at')
          .single()

        if (error) {
          console.error('[Comments] Supabase insert failed; using localStorage fallback.', error)
          const localComment = createLocalComment(activityId, cleanAuthor, cleanMessage)
          setMode('local')
          setComments((current) => addRow(current, localComment))
          return
        }

        console.info('[Comments] Supabase insert succeeded.')
        setComments((current) => addRow(current, data))
      },
    }),
    [comments, mode],
  )
}
