import { useMemo, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatCommentTime(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function ActivityComments({ activity, comments }) {
  const [isOpen, setIsOpen] = useState(false)
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const activityComments = useMemo(
    () => comments?.getComments(activity.id) ?? [],
    [activity.id, comments],
  )
  const commentLabel = `${activityComments.length} ${
    activityComments.length === 1 ? 'comment' : 'comments'
  }`
  const canSubmit = author.trim().length > 0 && message.trim().length > 0

  const orderedComments = useMemo(
    () =>
      [...activityComments].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    [activityComments],
  )

  async function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit || isPosting) return

    setIsPosting(true)
    await comments?.addComment(activity.id, author, message)
    setMessage('')
    setIsPosting(false)
  }

  return (
    <>
      <div className="flex max-w-full flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Open comments for ${activity.title}`}
          className="inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border border-white/12 bg-black/25 px-3 py-2 text-xs font-medium text-white/68 transition duration-300 hover:border-amber-100/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:px-3.5"
        >
          <MessageCircle className="size-4 shrink-0 text-amber-100/72" />
          <span className="truncate">Add note</span>
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            'min-h-10 max-w-full rounded-full px-3 py-2 text-xs transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:px-3.5',
            activityComments.length > 0
              ? 'border border-amber-100/24 bg-amber-100/10 text-amber-50 hover:bg-amber-100/16'
              : 'border border-white/10 bg-white/[0.04] text-white/46 hover:text-white/70',
          )}
        >
          <span className="block truncate">{commentLabel}</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`comments-${activity.id}`}
        >
          <div className="max-h-[88vh] w-full max-w-2xl overflow-hidden border border-white/14 bg-[#0d1016]/95 shadow-[0_28px_120px_rgba(0,0,0,0.48)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-amber-100/58">
                  Trip notes
                </p>
                <h2
                  id={`comments-${activity.id}`}
                  className="mt-2 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl"
                >
                  {activity.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close comments"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/64 transition hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="max-h-[calc(88vh-9rem)] overflow-y-auto p-5 sm:p-6">
              <div className="grid gap-3">
                {orderedComments.length > 0 ? (
                  orderedComments.map((comment) => (
                    <article
                      key={comment.id}
                      className="border border-white/10 bg-white/[0.045] p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">{comment.author}</h3>
                        <time className="text-xs text-white/42">
                          {formatCommentTime(comment.created_at)}
                        </time>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/72">
                        {comment.message}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-white/56">
                    No notes yet. Add the first one for this plan.
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-5 border-t border-white/10 pt-5">
                <div className="grid gap-3 sm:grid-cols-[12rem_1fr]">
                  <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-white/44">
                    Name
                    <input
                      value={author}
                      onChange={(event) => setAuthor(event.target.value)}
                      placeholder="Your name"
                      className="min-h-12 border border-white/12 bg-black/24 px-3 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-white/30 focus:border-amber-100/50"
                    />
                  </label>
                  <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-white/44">
                    Message
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Add a note for the group"
                      rows={3}
                      className="min-h-24 resize-y border border-white/12 bg-black/24 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition placeholder:text-white/30 focus:border-amber-100/50"
                    />
                  </label>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={!canSubmit || isPosting}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-amber-100/38 bg-amber-100 px-4 py-2 text-sm font-semibold text-[#18110a] transition duration-300 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-white/36"
                  >
                    <Send className="size-4" />
                    {isPosting ? 'Posting...' : 'Post note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActivityComments
