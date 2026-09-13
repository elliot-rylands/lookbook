export type Mode = 'reminders' | 'noshows' | 'intake' | 'followup'
export type PathId = 'remind' | 'noshow' | 'intake' | 'wrap'
export type NodeId =
  | 'idle'
  | 'remind-open'
  | 'remind-channel'
  | 'remind-queued'
  | 'noshow-scope'
  | 'noshow-offer'
  | 'noshow-queued'
  | 'intake-open'
  | 'intake-tone'
  | 'intake-queued'
  | 'wrap-open'
  | 'wrap-include'
  | 'wrap-queued'
  | 'waitlist-open'
  | 'waitlist-queued'
  | 'clarify'

export type Chip = {
  id: string
  label: string
  go: NodeId
  userLine?: string
}

export type Node = {
  id: NodeId
  path?: PathId
  userLine: string
  assistant: string
  followUps: Chip[]
  suggestions: Chip[]
  cta?: Chip
  completes?: PathId
  unlockWaitlist?: boolean
}

export const modes: { id: Mode; label: string; hint: string }[] = [
  { id: 'reminders', label: 'Reminders', hint: '24-hour confirmations' },
  { id: 'noshows', label: 'No-shows', hint: 'Recover missed visits' },
  { id: 'intake', label: 'Intake', hint: 'Forms before first visit' },
  { id: 'followup', label: 'Follow-up', hint: 'Practitioner wrap-up' },
]

export const idleSuggestions: Record<Mode | 'all', Chip[]> = {
  all: [
    { id: 's-remind', label: 'Confirm tomorrow’s unconfirmed visits', go: 'remind-open' },
    { id: 's-noshow', label: 'Recover this week’s no-shows', go: 'noshow-scope' },
    { id: 's-intake', label: 'Finish Friday’s incomplete intake', go: 'intake-open' },
    { id: 's-wrap', label: 'Draft Alex’s end-of-day wrap-up', go: 'wrap-open' },
  ],
  reminders: [
    { id: 's-remind', label: 'Confirm tomorrow’s unconfirmed visits', go: 'remind-open' },
    { id: 's-remind-sms', label: 'SMS only for the 2:30 with Alex', go: 'remind-channel', userLine: 'SMS only for Sam Ortiz at 2:30.' },
    { id: 's-intake', label: 'Also chase Friday’s intake', go: 'intake-open' },
  ],
  noshows: [
    { id: 's-noshow', label: 'Recover this week’s no-shows', go: 'noshow-scope' },
    { id: 's-noshow-repeat', label: 'Start with the repeat no-show', go: 'noshow-offer', userLine: 'Start with Devon — second miss this month.' },
    { id: 's-wrap', label: 'Note the misses in Alex’s wrap-up', go: 'wrap-open' },
  ],
  intake: [
    { id: 's-intake', label: 'Request Jordan’s missing forms', go: 'intake-open' },
    { id: 's-intake-call', label: 'Write a front-desk call script', go: 'intake-tone', userLine: 'Give me a call script instead of a text.' },
    { id: 's-remind', label: 'Then confirm tomorrow with Alex', go: 'remind-open' },
  ],
  followup: [
    { id: 's-wrap', label: 'Draft Alex’s end-of-day wrap-up', go: 'wrap-open' },
    { id: 's-wrap-hep', label: 'Include home-exercise reminders', go: 'wrap-include', userLine: 'Include home-exercise reminders for today’s visits.' },
    { id: 's-noshow', label: 'Flag Devon’s no-show pattern', go: 'noshow-scope' },
  ],
}

export const nodes: Record<Exclude<NodeId, 'idle' | 'clarify'>, Node> = {
  'remind-open': {
    id: 'remind-open',
    path: 'remind',
    userLine: 'Confirm tomorrow’s unconfirmed visits.',
    assistant:
      'Tomorrow Alex has 8 booked. Two still have not confirmed: Lee Park at 11:00 (massage) and Sam Ortiz at 2:30 (physio). I can send the usual 24-hour reminder with a confirm / reschedule link. Nothing goes out until you queue it in Jane.',
    followUps: [
      { id: 'f-sms', label: 'SMS only', go: 'remind-channel', userLine: 'Send SMS only.' },
      { id: 'f-both', label: 'Email + SMS', go: 'remind-channel', userLine: 'Send email and SMS.' },
      { id: 'f-sam', label: 'Skip Lee — only the 2:30', go: 'remind-channel', userLine: 'Only remind Sam Ortiz at 2:30.' },
    ],
    suggestions: [
      { id: 's-channel', label: 'Write the SMS first', go: 'remind-channel' },
      { id: 's-intake', label: 'Switch to Friday’s intake', go: 'intake-open' },
      { id: 's-noshow', label: 'Leave this — recover no-shows', go: 'noshow-scope' },
    ],
    cta: { id: 'c-write', label: 'Write the reminder', go: 'remind-channel' },
  },
  'remind-channel': {
    id: 'remind-channel',
    path: 'remind',
    userLine: 'Write the reminder.',
    assistant:
      'Draft for Lee and Sam (SMS):\n\n“Hi {first}, this is Harbour Physiotherapy. You’re booked with Alex tomorrow. Tap to confirm or move the visit: jane.app/c/… Reply STOP to opt out.”\n\nEmail would add the same link plus the clinic address. Still sitting in drafts.',
    followUps: [
      { id: 'f-softer', label: 'Softer tone', go: 'remind-channel', userLine: 'Make it warmer — less transactional.' },
      { id: 'f-wait', label: 'Add a waitlist note', go: 'remind-channel', userLine: 'Mention we have a waitlist if they need to move.' },
      { id: 'f-queue', label: 'Queue both in Jane', go: 'remind-queued' },
    ],
    suggestions: [
      { id: 's-queue', label: 'Queue both reminders', go: 'remind-queued' },
      { id: 's-sam-only', label: 'Queue Sam only', go: 'remind-queued', userLine: 'Queue Sam only.' },
      { id: 's-noshow', label: 'Next: no-show recovery', go: 'noshow-scope' },
    ],
    cta: { id: 'c-queue', label: 'Queue in Jane', go: 'remind-queued' },
  },
  'remind-queued': {
    id: 'remind-queued',
    path: 'remind',
    userLine: 'Queue in Jane.',
    assistant:
      'Queued. Jane will send the 24-hour reminders from the clinic number. Lee and Sam stay on Alex’s tomorrow list until they confirm or move. I will not chase them again unless a reminder bounces.',
    followUps: [
      { id: 'f-noshow', label: 'Recover this week’s no-shows', go: 'noshow-scope' },
      { id: 'f-intake', label: 'Check Jordan’s intake', go: 'intake-open' },
      { id: 'f-wrap', label: 'Start Alex’s wrap-up', go: 'wrap-open' },
    ],
    suggestions: [
      { id: 's-noshow', label: 'Recover this week’s no-shows', go: 'noshow-scope' },
      { id: 's-intake', label: 'Finish Friday’s incomplete intake', go: 'intake-open' },
      { id: 's-wrap', label: 'Draft Alex’s wrap-up', go: 'wrap-open' },
    ],
    completes: 'remind',
  },
  'noshow-scope': {
    id: 'noshow-scope',
    path: 'noshow',
    userLine: 'Recover this week’s no-shows.',
    assistant:
      'Three missed visits this week: Maya Chen (Tue massage), Devon Walsh (Wed physio with Alex — second miss this month), and Riley Okonkwo (Thu initial assessment). I can offer the next open time and ask if they want the Friday afternoon waitlist. Who should we write for?',
    followUps: [
      { id: 'f-all', label: 'All three', go: 'noshow-offer', userLine: 'Draft recovery notes for all three.' },
      { id: 'f-devon', label: 'Only the repeat (Devon)', go: 'noshow-offer', userLine: 'Only Devon — the repeat no-show.' },
      { id: 'f-friday', label: 'Anyone who can take Friday', go: 'noshow-offer', userLine: 'Only people who could take Friday afternoon.' },
    ],
    suggestions: [
      { id: 's-offer', label: 'Draft the recovery texts', go: 'noshow-offer' },
      { id: 's-wrap', label: 'Put Devon in Alex’s wrap-up', go: 'wrap-open' },
      { id: 's-remind', label: 'Back to tomorrow’s reminders', go: 'remind-open' },
    ],
    cta: { id: 'c-draft', label: 'Draft recovery texts', go: 'noshow-offer' },
  },
  'noshow-offer': {
    id: 'noshow-offer',
    path: 'noshow',
    userLine: 'Draft the recovery texts.',
    assistant:
      'Draft for Devon (the others follow the same shape):\n\n“Hi Devon, we held your Wednesday time with Alex and didn’t see you. There’s a Friday 3:40 if you want it — or I can put you on the afternoon waitlist. Reply YES 3:40, WAITLIST, or we’ll leave the spot.”\n\nI did not mention the earlier miss. Say if you want that in.',
    followUps: [
      { id: 'f-slot', label: 'Lead with Friday 3:40', go: 'noshow-offer', userLine: 'Lead with the Friday 3:40.' },
      { id: 'f-generic', label: 'Keep it generic', go: 'noshow-offer', userLine: 'Don’t name a specific time.' },
      { id: 'f-pattern', label: 'Mention the earlier miss', go: 'noshow-offer', userLine: 'Mention this is the second miss this month.' },
    ],
    suggestions: [
      { id: 's-queue', label: 'Queue the recovery texts', go: 'noshow-queued' },
      { id: 's-wait', label: 'Text the Friday waitlist instead', go: 'waitlist-open' },
      { id: 's-intake', label: 'Switch to intake', go: 'intake-open' },
    ],
    cta: { id: 'c-queue', label: 'Queue in Jane', go: 'noshow-queued' },
  },
  'noshow-queued': {
    id: 'noshow-queued',
    path: 'noshow',
    userLine: 'Queue in Jane.',
    assistant:
      'Queued on the clinic SMS. If Devon takes Friday 3:40, Jane will mark the recovery and free the waitlist of that slot. Four people are still waiting on Friday afternoon — I can offer them leftover time once replies come in.',
    followUps: [
      { id: 'f-wait', label: 'Offer leftover time to the waitlist', go: 'waitlist-open' },
      { id: 'f-wrap', label: 'Tell Alex about Devon', go: 'wrap-open' },
      { id: 'f-intake', label: 'Jordan’s intake next', go: 'intake-open' },
    ],
    suggestions: [
      { id: 's-wait', label: 'Text the Friday waitlist', go: 'waitlist-open' },
      { id: 's-wrap', label: 'Draft Alex’s wrap-up', go: 'wrap-open' },
      { id: 's-remind', label: 'Tomorrow’s unconfirmed visits', go: 'remind-open' },
    ],
    completes: 'noshow',
    unlockWaitlist: true,
  },
  'intake-open': {
    id: 'intake-open',
    path: 'intake',
    userLine: 'Finish Friday’s incomplete intake.',
    assistant:
      'Jordan Hale is new on Friday at 10:00 with Alex. Intake is 2 of 5 — contact details are in, health history and emergency contact are not. Jane will not let them complete check-in without those. I can send the form link now so Alex is not starting a first visit blind.',
    followUps: [
      { id: 'f-sms', label: 'SMS with the form link', go: 'intake-tone', userLine: 'SMS with the form link.' },
      { id: 'f-both', label: 'Email + SMS', go: 'intake-tone', userLine: 'Email and SMS.' },
      { id: 'f-call', label: 'Front-desk call script', go: 'intake-tone', userLine: 'Write a call script for the front desk.' },
    ],
    suggestions: [
      { id: 's-write', label: 'Write the intake request', go: 'intake-tone' },
      { id: 's-remind', label: 'Confirm tomorrow first', go: 'remind-open' },
      { id: 's-wrap', label: 'Mention Jordan in Alex’s wrap-up', go: 'wrap-open' },
    ],
    cta: { id: 'c-write', label: 'Write the request', go: 'intake-tone' },
  },
  'intake-tone': {
    id: 'intake-tone',
    path: 'intake',
    userLine: 'Write the intake request.',
    assistant:
      'Draft:\n\n“Hi Jordan, looking forward to Friday 10:00 with Alex at Harbour Physiotherapy. We still need your health history and an emergency contact before that visit — it takes about 6 minutes: jane.app/i/… If this time no longer works, reply and we’ll move you.”\n\nI can make it stricter (can’t be seen without it) or shorter.',
    followUps: [
      { id: 'f-short', label: 'Shorter', go: 'intake-tone', userLine: 'Make it shorter.' },
      { id: 'f-strict', label: 'Say they can’t be seen without it', go: 'intake-tone', userLine: 'Say we can’t start the visit without the form.' },
      { id: 'f-queue', label: 'Queue in Jane', go: 'intake-queued' },
    ],
    suggestions: [
      { id: 's-queue', label: 'Queue the intake request', go: 'intake-queued' },
      { id: 's-remind', label: 'Also confirm tomorrow', go: 'remind-open' },
      { id: 's-noshow', label: 'Recover no-shows', go: 'noshow-scope' },
    ],
    cta: { id: 'c-queue', label: 'Queue in Jane', go: 'intake-queued' },
  },
  'intake-queued': {
    id: 'intake-queued',
    path: 'intake',
    userLine: 'Queue in Jane.',
    assistant:
      'Queued. If Jordan completes the form, the Friday 10:00 chart will flip to ready. If they ignore it by Thursday 4:00, I can nudge once more — say if you want that automatic.',
    followUps: [
      { id: 'f-auto', label: 'Yes — one more nudge Thursday 4:00', go: 'intake-queued', userLine: 'Add a Thursday 4:00 follow-up if it’s still incomplete.' },
      { id: 'f-remind', label: 'Confirm tomorrow’s visits', go: 'remind-open' },
      { id: 'f-wrap', label: 'Alex’s wrap-up', go: 'wrap-open' },
    ],
    suggestions: [
      { id: 's-remind', label: 'Confirm tomorrow’s unconfirmed visits', go: 'remind-open' },
      { id: 's-noshow', label: 'Recover this week’s no-shows', go: 'noshow-scope' },
      { id: 's-wrap', label: 'Draft Alex’s wrap-up', go: 'wrap-open' },
    ],
    completes: 'intake',
  },
  'wrap-open': {
    id: 'wrap-open',
    path: 'wrap',
    userLine: 'Draft Alex’s end-of-day wrap-up.',
    assistant:
      'Alex’s Thursday: 6 seen, 1 no-show (Devon Walsh), 1 new eval (Priya Shah — HEP started). Tomorrow is full except the two unconfirmed. I can keep this to a chart note Alex can paste, or turn it into patient texts for home exercise.',
    followUps: [
      { id: 'f-hep', label: 'Include home-exercise reminders', go: 'wrap-include', userLine: 'Include home-exercise reminders.' },
      { id: 'f-devon', label: 'Flag Devon’s pattern', go: 'wrap-include', userLine: 'Flag Devon’s no-show pattern for Alex.' },
      { id: 'f-short', label: 'Tomorrow only — keep it short', go: 'wrap-include', userLine: 'Keep it to tomorrow only.' },
    ],
    suggestions: [
      { id: 's-write', label: 'Write the wrap-up', go: 'wrap-include' },
      { id: 's-noshow', label: 'Text Devon first', go: 'noshow-scope' },
      { id: 's-intake', label: 'Jordan’s intake', go: 'intake-open' },
    ],
    cta: { id: 'c-write', label: 'Write the wrap-up', go: 'wrap-include' },
  },
  'wrap-include': {
    id: 'wrap-include',
    path: 'wrap',
    userLine: 'Write the wrap-up.',
    assistant:
      'Note for Alex:\n\n“Thu wrap: 6 completed. Devon Walsh no-showed (2nd this month) — recovery SMS ready to queue. Priya Shah new eval, HEP issued — I can send the reminder tonight. Fri 10:00 Jordan Hale still missing health history. Two unconfirmed tomorrow (Lee 11:00, Sam 2:30).”\n\nThis stays in drafts until you queue the patient pieces.',
    followUps: [
      { id: 'f-hep-send', label: 'Queue Priya’s HEP text tonight', go: 'wrap-queued', userLine: 'Queue Priya’s home-exercise text for tonight.' },
      { id: 'f-copy', label: 'That’s enough — just the note', go: 'wrap-queued', userLine: 'Just save the note. No patient texts.' },
      { id: 'f-devon', label: 'Queue Devon’s recovery too', go: 'noshow-offer', userLine: 'Queue Devon’s recovery from here.' },
    ],
    suggestions: [
      { id: 's-queue', label: 'Save the wrap-up', go: 'wrap-queued' },
      { id: 's-noshow', label: 'Recover Devon now', go: 'noshow-offer' },
      { id: 's-remind', label: 'Confirm tomorrow', go: 'remind-open' },
    ],
    cta: { id: 'c-queue', label: 'Save in Jane', go: 'wrap-queued' },
  },
  'wrap-queued': {
    id: 'wrap-queued',
    path: 'wrap',
    userLine: 'Save in Jane.',
    assistant:
      'Saved to Alex’s staff feed. Patient texts only go if you queued them separately. The note will be on tomorrow’s board when Alex opens Jane.',
    followUps: [
      { id: 'f-remind', label: 'Confirm tomorrow’s visits', go: 'remind-open' },
      { id: 'f-intake', label: 'Jordan’s intake', go: 'intake-open' },
      { id: 'f-noshow', label: 'No-show recovery', go: 'noshow-scope' },
    ],
    suggestions: [
      { id: 's-remind', label: 'Confirm tomorrow’s unconfirmed visits', go: 'remind-open' },
      { id: 's-intake', label: 'Finish Friday’s incomplete intake', go: 'intake-open' },
      { id: 's-noshow', label: 'Recover this week’s no-shows', go: 'noshow-scope' },
    ],
    completes: 'wrap',
  },
  'waitlist-open': {
    id: 'waitlist-open',
    path: 'noshow',
    userLine: 'Offer leftover Friday time to the waitlist.',
    assistant:
      'Friday afternoon waitlist: four people, all asked for 2:00–4:30. If Devon does not take 3:40, I can text the first two — “a time opened Friday 3:40 with Alex, first reply holds it.” I will not blast all four.',
    followUps: [
      { id: 'f-two', label: 'First two only', go: 'waitlist-queued', userLine: 'Text the first two on the waitlist.' },
      { id: 'f-hold', label: 'Wait for Devon’s reply', go: 'waitlist-queued', userLine: 'Hold the waitlist until Devon replies.' },
      { id: 'f-alex', label: 'Ask Alex before offering', go: 'wrap-open', userLine: 'Ask Alex before we offer the slot.' },
    ],
    suggestions: [
      { id: 's-send', label: 'Text the first two', go: 'waitlist-queued' },
      { id: 's-devon', label: 'Check Devon’s draft again', go: 'noshow-offer' },
      { id: 's-remind', label: 'Tomorrow’s reminders', go: 'remind-open' },
    ],
    cta: { id: 'c-queue', label: 'Queue waitlist texts', go: 'waitlist-queued' },
  },
  'waitlist-queued': {
    id: 'waitlist-queued',
    path: 'noshow',
    userLine: 'Queue waitlist texts.',
    assistant:
      'Queued for the first two on the Friday list, with a 20-minute hold. If neither replies, I stop — I will not move to #3 unless you say so. Devon’s recovery text is unchanged.',
    followUps: [
      { id: 'f-wrap', label: 'Tell Alex', go: 'wrap-open' },
      { id: 'f-intake', label: 'Jordan’s intake', go: 'intake-open' },
      { id: 'f-remind', label: 'Tomorrow’s reminders', go: 'remind-open' },
    ],
    suggestions: [
      { id: 's-wrap', label: 'Draft Alex’s wrap-up', go: 'wrap-open' },
      { id: 's-intake', label: 'Finish Friday’s intake', go: 'intake-open' },
      { id: 's-remind', label: 'Confirm tomorrow', go: 'remind-open' },
    ],
  },
}

export const clarifyAssistant =
  'I only follow the clinic tree — reminders, no-shows, intake, or Alex’s wrap-up. Pick a suggestion or a nudge so I am not guessing at a prompt.'

const keywords: { keys: string[]; go: NodeId }[] = [
  { keys: ['confirm', 'reminder', 'tomorrow', 'unconfirmed', 'lee', 'sam', '24'], go: 'remind-open' },
  { keys: ['no-show', 'noshow', 'no show', 'missed', 'devon', 'maya', 'riley', 'recover'], go: 'noshow-scope' },
  { keys: ['waitlist', 'wait list', 'friday 3', 'leftover'], go: 'waitlist-open' },
  { keys: ['intake', 'form', 'jordan', 'history', 'emergency'], go: 'intake-open' },
  { keys: ['wrap', 'alex', 'practitioner', 'hep', 'follow'], go: 'wrap-open' },
]

export function matchPrompt(text: string): NodeId {
  const needle = text.trim().toLowerCase()
  if (!needle) return 'clarify'
  for (const row of keywords) {
    if (row.keys.some((key) => needle.includes(key))) return row.go
  }
  return 'clarify'
}

export function suggestionsFor(mode: Mode | null, nodeId: NodeId, completed: Set<PathId>): Chip[] {
  if (nodeId !== 'idle' && nodeId !== 'clarify') {
    const node = nodes[nodeId]
    return node.suggestions.filter((chip) => {
      const target = nodes[chip.go as Exclude<NodeId, 'idle' | 'clarify'>]
      return !target?.completes || !completed.has(target.completes)
    })
  }
  const pool = idleSuggestions[mode ?? 'all']
  return pool.filter((chip) => {
    const target = nodes[chip.go as Exclude<NodeId, 'idle' | 'clarify'>]
    return !target?.completes || !completed.has(target.completes)
  })
}
