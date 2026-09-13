import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import {
  clarifyAssistant,
  matchPrompt,
  modes,
  nodes,
  suggestionsFor,
  type Chip,
  type Mode,
  type NodeId,
  type PathId,
} from './tree'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,500&display=swap'
const SANS = '"Proxima Nova", "Source Sans 3", ui-sans-serif, sans-serif'
const SERIF = 'Fields, "Source Serif 4", ui-serif, Georgia, serif'

const INK = '#12202a'
const TEAL = '#00c1ca'
const TEAL_DEEP = '#027989'
const PAPER = '#eef3f5'
const MUTED = '#5c6b73'
const LINE = '#d4dee3'

type JaneAiNudgesProps = {
  fillViewport?: boolean
}

type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
  followUps?: Chip[]
}

type Nudge = {
  id: PathId | 'waitlist'
  title: string
  body: string
  go: NodeId
}

function useStudyFonts() {
  useEffect(() => {
    const id = 'jane-ai-nudges-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function boardNudges(completed: Set<PathId>, waitlist: boolean): Nudge[] {
  const items: Nudge[] = []
  if (!completed.has('remind')) {
    items.push({
      id: 'remind',
      title: '2 unconfirmed tomorrow',
      body: 'Lee 11:00 and Sam 2:30 with Alex. 24-hour window is open.',
      go: 'remind-open',
    })
  }
  if (!completed.has('intake')) {
    items.push({
      id: 'intake',
      title: 'Intake incomplete',
      body: 'Jordan Hale, Fri 10:00 — health history and emergency contact still empty.',
      go: 'intake-open',
    })
  }
  if (!completed.has('noshow')) {
    items.push({
      id: 'noshow',
      title: '3 no-shows this week',
      body: 'Maya, Devon (repeat), Riley. Recovery texts are not queued.',
      go: 'noshow-scope',
    })
  }
  if (waitlist) {
    items.push({
      id: 'waitlist',
      title: 'Friday waitlist',
      body: 'Four people asked for 2:00–4:30. Offer leftover time after Devon replies.',
      go: 'waitlist-open',
    })
  }
  if (!completed.has('wrap') && (completed.has('noshow') || completed.has('remind'))) {
    items.push({
      id: 'wrap',
      title: 'Alex has no wrap-up yet',
      body: 'Thursday is closed enough to write the staff note.',
      go: 'wrap-open',
    })
  }
  return items
}

export default function JaneAiNudges({ fillViewport = false }: JaneAiNudgesProps) {
  useStudyFonts()
  const scroller = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [nodeId, setNodeId] = useState<NodeId>('idle')
  const [completed, setCompleted] = useState<Set<PathId>>(() => new Set())
  const [waitlist, setWaitlist] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')

  const nudges = boardNudges(completed, waitlist)
  const suggestions = suggestionsFor(mode, nodeId, completed)
  const current = nodeId !== 'idle' && nodeId !== 'clarify' ? nodes[nodeId] : undefined
  const lastAssistant = [...messages].reverse().find((item) => item.role === 'assistant')

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function applyNode(next: NodeId, userLine?: string) {
    if (next === 'clarify') {
      setNodeId('clarify')
      setMessages((current) => [
        ...current,
        { id: uid(), role: 'user', text: userLine ?? draft.trim() },
        { id: uid(), role: 'assistant', text: clarifyAssistant },
      ])
      return
    }
    if (next === 'idle') return
    const node = nodes[next]
    const line = userLine ?? node.userLine
    setNodeId(next)
    if (node.completes) {
      setCompleted((current) => new Set(current).add(node.completes!))
    }
    if (node.unlockWaitlist) setWaitlist(true)
    setMessages((current) => [
      ...current,
      { id: uid(), role: 'user', text: line },
      { id: uid(), role: 'assistant', text: node.assistant, followUps: node.followUps },
    ])
    if (node.path === 'remind') setMode('reminders')
    if (node.path === 'noshow') setMode('noshows')
    if (node.path === 'intake') setMode('intake')
    if (node.path === 'wrap') setMode('followup')
  }

  function onChip(chip: Chip) {
    applyNode(chip.go, chip.userLine ?? chip.label)
  }

  function onSubmit(event?: FormEvent) {
    event?.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft('')
    applyNode(matchPrompt(text), text)
  }

  function onComposerKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  function reset() {
    setMode(null)
    setNodeId('idle')
    setCompleted(new Set())
    setWaitlist(false)
    setMessages([])
    setDraft('')
  }

  const shell = (
    <div
      className="flex h-full min-h-0 w-full flex-col overflow-hidden"
      style={{ background: PAPER, color: INK, fontFamily: SANS }}
    >
      <header
        className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
        style={{ background: '#fff', borderColor: LINE }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex size-8 items-center justify-center rounded-lg text-[15px] font-semibold text-white"
            style={{ background: TEAL_DEEP }}
          >
            J
          </span>
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: TEAL_DEEP, fontWeight: 600 }}>
              Jane · Harbour Physiotherapy
            </p>
            <h2 className="text-[18px] leading-tight" style={{ fontFamily: SERIF, fontWeight: 500 }}>
              Front desk copilot
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[12px]" style={{ color: MUTED }}>
          <span>Thu 13 Sep · live board</span>
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-md border bg-white px-2.5 py-1"
            style={{ borderColor: LINE, color: INK }}
          >
            Start over
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside
          className="shrink-0 overflow-y-auto border-b lg:w-[280px] lg:border-r lg:border-b-0"
          style={{ borderColor: LINE, background: '#f8fbfc' }}
        >
          <div className="px-4 py-4">
            <p className="text-[11px] tracking-[0.14em] uppercase" style={{ color: MUTED, fontWeight: 600 }}>
              Today
            </p>
            <ul className="mt-3 space-y-2 text-[13px] leading-snug">
              <li className="rounded-lg border bg-white px-3 py-2" style={{ borderColor: LINE }}>
                <span style={{ color: MUTED }}>Alex Rahman</span>
                <p className="mt-0.5">8 tomorrow · 2 unconfirmed</p>
              </li>
              <li className="rounded-lg border bg-white px-3 py-2" style={{ borderColor: LINE }}>
                <span style={{ color: MUTED }}>No-shows this week</span>
                <p className="mt-0.5">{completed.has('noshow') ? 'Recovery queued' : '3 still open'}</p>
              </li>
              <li className="rounded-lg border bg-white px-3 py-2" style={{ borderColor: LINE }}>
                <span style={{ color: MUTED }}>Jordan Hale · Fri 10:00</span>
                <p className="mt-0.5">{completed.has('intake') ? 'Form request queued' : 'Intake 2 of 5'}</p>
              </li>
            </ul>

            <p className="mt-6 text-[11px] tracking-[0.14em] uppercase" style={{ color: MUTED, fontWeight: 600 }}>
              Nudges
            </p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: MUTED }}>
              Only what the board still needs — not a menu of AI tricks.
            </p>
            {nudges.length === 0 ? (
              <p className="mt-3 text-[13px]" style={{ color: MUTED }}>
                Board is quiet. Start over to replay the morning.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {nudges.map((nudge) => (
                  <li key={nudge.id}>
                    <button
                      type="button"
                      onClick={() => applyNode(nudge.go)}
                      className="w-full cursor-pointer rounded-lg border px-3 py-2.5 text-left"
                      style={{
                        borderColor: nudge.id === 'waitlist' ? TEAL : LINE,
                        background: '#fff',
                        boxShadow: nudge.id === 'waitlist' ? `inset 3px 0 0 ${TEAL}` : undefined,
                      }}
                    >
                      <p className="text-[13px] font-semibold">{nudge.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed" style={{ color: MUTED }}>
                        {nudge.body}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold" style={{ color: TEAL_DEEP }}>
                        Do this
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col" style={{ background: '#fff' }}>
          <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.length === 0 ? (
              <div className="mx-auto max-w-xl pt-6">
                <p className="text-[12px] tracking-[0.14em] uppercase" style={{ color: TEAL_DEEP, fontWeight: 600 }}>
                  Thursday morning
                </p>
                <h3 className="mt-2 text-[28px] leading-tight" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                  What should Jane take off the desk first?
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: MUTED }}>
                  Suggestions pre-fill a clinic task. Nudges only appear when the board has unfinished
                  work. Follow-ups ask one clarifying thing before anything is queued. There is no model
                  — each choice moves a fixed tree.
                </p>
              </div>
            ) : (
              <ol className="mx-auto flex max-w-xl flex-col gap-4">
                {messages.map((message) => (
                  <li key={message.id} className={message.role === 'user' ? 'self-end max-w-[90%]' : 'max-w-[95%]'}>
                    <p
                      className="text-[11px] tracking-[0.12em] uppercase"
                      style={{ color: MUTED, fontWeight: 600 }}
                    >
                      {message.role === 'user' ? 'You' : 'Jane'}
                    </p>
                    <div
                      className="mt-1 whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed"
                      style={{
                        background: message.role === 'user' ? TEAL_DEEP : PAPER,
                        color: message.role === 'user' ? '#fff' : INK,
                      }}
                    >
                      {message.text}
                    </div>
                    {message.role === 'assistant' &&
                    message.id === lastAssistant?.id &&
                    message.followUps &&
                    message.followUps.length > 0 ? (
                      <div className="mt-2">
                        <p className="text-[11px]" style={{ color: MUTED }}>
                          Follow up — tied to that last reply
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {message.followUps.map((chip) => (
                            <button
                              key={chip.id}
                              type="button"
                              onClick={() => onChip(chip)}
                              className="cursor-pointer rounded-full border bg-white px-2.5 py-1 text-[12px]"
                              style={{ borderColor: LINE, color: INK }}
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="shrink-0 border-t px-4 py-3 sm:px-6" style={{ borderColor: LINE, background: '#fbfdfe' }}>
            <div className="mx-auto max-w-xl">
              <p className="text-[11px] tracking-[0.14em] uppercase" style={{ color: MUTED, fontWeight: 600 }}>
                Start from
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {modes.map((item) => {
                  const active = mode === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      title={item.hint}
                      onClick={() => setMode(active ? null : item.id)}
                      className="cursor-pointer rounded-full px-2.5 py-1 text-[12px]"
                      style={{
                        background: active ? TEAL_DEEP : '#fff',
                        color: active ? '#fff' : INK,
                        border: `1px solid ${active ? TEAL_DEEP : LINE}`,
                      }}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <p className="mt-3 text-[11px] tracking-[0.14em] uppercase" style={{ color: MUTED, fontWeight: 600 }}>
                Suggestions
              </p>
              <div className="mt-2 flex flex-col gap-1.5">
                {suggestions.map((chip) => (
                  <button
                    key={chip.id + chip.go}
                    type="button"
                    onClick={() => onChip(chip)}
                    className="cursor-pointer rounded-lg border bg-white px-3 py-2 text-left text-[13px] leading-snug"
                    style={{ borderColor: LINE }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-3 flex items-end gap-2">
                <label className="sr-only" htmlFor="jane-copilot-input">
                  Clinic task
                </label>
                <textarea
                  id="jane-copilot-input"
                  rows={2}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onComposerKey}
                  placeholder="Or type a desk task — confirmations, no-shows, intake, wrap-up…"
                  className="min-h-[52px] flex-1 resize-none rounded-xl border bg-white px-3 py-2 text-[13px] leading-relaxed outline-none"
                  style={{ borderColor: LINE, color: INK, fontFamily: SANS }}
                />
                <button
                  type="submit"
                  className="h-[52px] cursor-pointer rounded-xl px-3 text-[13px] font-semibold text-white"
                  style={{ background: TEAL }}
                >
                  Send
                </button>
              </form>

              {current?.cta ? (
                <button
                  type="button"
                  onClick={() => onChip(current.cta!)}
                  className="mt-2 w-full cursor-pointer rounded-xl py-2.5 text-[13px] font-semibold text-white"
                  style={{ background: TEAL_DEEP }}
                >
                  {current.cta.label}
                </button>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  )

  if (fillViewport) {
    return <div className="h-dvh w-dvw overflow-hidden">{shell}</div>
  }

  return (
    <div className="w-full overflow-hidden" style={{ height: 760 }}>
      {shell}
    </div>
  )
}
