export type Recording = 'off' | 'live' | 'paused'
export type Output = 'chart' | 'patient'
export type ProblemId = 'shoulder' | 'knee'
export type KneeSide = 'left' | 'right'

export type Beat = {
  id: string
  clock: string
  speaker: 'Priya' | 'Alex'
  aside?: boolean
  text: string
}

export const patient = {
  name: 'Priya Shah',
  janeId: '208847',
  age: 34,
  booking: 'Thu 13 Sep · 10:15 · Initial 45',
  clinician: 'Alex Rahman',
  clinic: 'Harbour Physiotherapy',
  reason: 'Right shoulder — 6 weeks, hangboard',
}

export const chart = {
  visits: 'No prior Jane visits — new to the clinic.',
  intake: [
    'Health history and emergency contact on file.',
    'Goal: sleep on the right side without waking.',
    'Goal: back on the hangboard / easy climbs in 8 weeks.',
    'Intake also notes “left knee catches on stairs” — not the booked reason.',
  ],
  referring: 'Dr. Padilla · query rotator cuff vs. impingement. No imaging.',
}

export const beats: Beat[] = [
  {
    id: 'b1',
    clock: '10:16',
    speaker: 'Priya',
    text: 'It’s the right shoulder. Six weeks, after hangboarding. I can’t sleep on that side. Pain when I reach into the back seat.',
  },
  {
    id: 'b2',
    clock: '10:19',
    speaker: 'Priya',
    text: 'And while we’re here — that knee still catches on stairs. I didn’t book for it but it flared on the hike Sunday.',
  },
  {
    id: 'b3',
    clock: '10:21',
    speaker: 'Alex',
    aside: true,
    text: 'Don’t chart this: she asked if her sister can shadow a visit next month. I said no, and we talked cash rates off the record.',
  },
  {
    id: 'b4',
    clock: '10:28',
    speaker: 'Alex',
    text: 'Right shoulder: painful arc, empty-can irritable. I didn’t get a 0–10 yet. For the knee she just said “that knee” — I need a side and a scale before I drop a diagnosis.',
  },
  {
    id: 'b5',
    clock: '10:38',
    speaker: 'Alex',
    text: 'Plan if she agrees: climbing-safe HEP tonight, no hangboard two weeks, recall with me. Knee is advice-only until we have laterality and pain.',
  },
]

export const requiredFields = [
  { id: 'consent', label: 'Recording consent', jane: 'Consent must sit on the chart before a scribe runs.' },
  { id: 'pain', label: 'Pain scale (shoulder)', jane: 'Jane initial exams expect a 0–10 on the booked problem.' },
  { id: 'knee', label: 'Laterality (knee)', jane: 'A second problem needs a side before it can be a separate note.' },
] as const

export type Code = {
  id: string
  code: string
  label: string
  problem: ProblemId
  confidence: 'high' | 'low'
  why: string
}

export function codesFor(input: { kneeSide: KneeSide | null; split: boolean }): Code[] {
  const codes: Code[] = [
    {
      id: 'm25',
      code: 'M25.511',
      label: 'Pain in right shoulder',
      problem: 'shoulder',
      confidence: 'high',
      why: 'She named the right shoulder. No cuff-tear or impingement code — Padilla queried that; the tape does not confirm it.',
    },
  ]
  if (input.split) {
    if (input.kneeSide === 'left') {
      codes.push({
        id: 'knee',
        code: 'M25.562',
        label: 'Pain in left knee',
        problem: 'knee',
        confidence: 'low',
        why: 'Symptom + catching only. No meniscus or “internal derangement” — the tape never supports that.',
      })
    } else if (input.kneeSide === 'right') {
      codes.push({
        id: 'knee',
        code: 'M25.561',
        label: 'Pain in right knee',
        problem: 'knee',
        confidence: 'low',
        why: 'Side set by you. Still a symptom code. Catching is not a diagnosis.',
      })
    } else {
      codes.push({
        id: 'knee',
        code: 'M25.569',
        label: 'Pain in unspecified knee',
        problem: 'knee',
        confidence: 'low',
        why: 'Blocked from a specific code until laterality is set. Will not invent a tear.',
      })
    }
  }
  return codes
}

export function billingCode(split: boolean) {
  return split
    ? { code: '97162', label: 'PT eval, moderate', flag: 'Two problems once the visit is split.' }
    : { code: '97161', label: 'PT eval, low', flag: 'Stays low until the knee is its own note.' }
}

export type NoteBlock = {
  heading: string
  body: string
  flag?: 'pain' | 'knee' | 'consent'
}

export function chartNote(input: {
  chartOpen: boolean
  beat: number
  split: boolean
  problem: ProblemId
  pain: number | null
  kneeSide: KneeSide | null
}): NoteBlock[] {
  if (input.beat === 0) {
    return [{ heading: 'Waiting', body: 'Nothing to draft until the tape has a beat. A normal scribe would hallucinate a SOAP from a blank room.' }]
  }
  if (!input.chartOpen) {
    return [
      {
        heading: 'Chart not loaded',
        body: 'I will not write goals, referring query, or the intake knee mention until you pull Priya’s Jane chart. Typical scribes skip this and invent a history.',
      },
    ]
  }

  const shoulderPain = input.pain == null
    ? 'Pain scale not on the chart.'
    : `Pain ${input.pain}/10 at end-range reach.`
  const kneeSide = input.kneeSide ? `${input.kneeSide} knee` : 'knee (side missing)'

  if (input.split && input.problem === 'knee') {
    const blocks: NoteBlock[] = [
      {
        heading: 'Subjective',
        body: `Second problem raised during the shoulder initial. ${chart.intake[3]} Sunday hike flare. Catching on stairs.`,
      },
      {
        heading: 'Objective',
        body: input.kneeSide
          ? `Laterality set: ${kneeSide}. No formal knee exam completed this visit.`
          : 'She said “that knee.” Laterality is not chartable yet.',
        flag: input.kneeSide ? undefined : 'knee',
      },
      {
        heading: 'Assessment',
        body: 'Symptom-level only. No meniscus or cartilage diagnosis — the tape does not support one.',
      },
      {
        heading: 'Plan',
        body: input.beat >= 5
          ? 'Advice-only today. Separate recall if the knee becomes the reason for booking.'
          : 'Plan not on the tape yet.',
      },
    ]
    return blocks
  }

  const blocks: NoteBlock[] = [
    {
      heading: 'Subjective',
      body: input.split
        ? `Booked for right shoulder, 6 weeks post-hangboard. Wakes when she rolls onto that side. Worse reaching to the back seat. Goals from intake: ${chart.intake[1]} ${chart.intake[2]}`
        : `Booked for right shoulder, 6 weeks post-hangboard. Also raised ${kneeSide} catching (intake already had this). Goals from intake: sleep on the right side; return to easy climbs.`,
      flag: !input.split && !input.kneeSide && input.beat >= 2 ? 'knee' : undefined,
    },
    {
      heading: 'Objective',
      body: input.beat >= 4
        ? `Right shoulder painful arc, empty-can irritable. ${shoulderPain}`
        : 'Exam not on the tape yet.',
      flag: input.beat >= 4 && input.pain == null ? 'pain' : undefined,
    },
    {
      heading: 'Assessment',
      body: 'Right shoulder pain, activity-related. Referring query of cuff tear vs impingement is not confirmed on today’s tape — not entered as a diagnosis.',
    },
    {
      heading: 'Plan',
      body: input.beat >= 5
        ? 'Climbing-safe HEP. No hangboard 2 weeks. Recall with Alex. Knee stays out of this note if the visit is split.'
        : 'Plan not on the tape yet.',
    },
  ]
  if (!input.split && input.beat >= 2) {
    blocks.push({
      heading: 'Unsplit encounter',
      body: 'Two problems are in one Jane note. Split them so billing and HEP attach to the right chart.',
    })
  }
  return blocks
}

export function patientNote(input: {
  chartOpen: boolean
  beat: number
  split: boolean
  problem: ProblemId
  pain: number | null
  kneeSide: KneeSide | null
}): NoteBlock[] {
  if (input.beat === 0 || !input.chartOpen) {
    return [
      {
        heading: 'After-visit',
        body: 'The patient summary stays empty until the chart is pulled and the visit has started. It will never include codes, asides, or the sister conversation.',
      },
    ]
  }
  if (input.split && input.problem === 'knee') {
    return [
      {
        heading: 'What we covered',
        body: input.kneeSide
          ? `You also mentioned your ${input.kneeSide} knee catching on stairs. We did not do a full knee visit today.`
          : 'You mentioned a knee. We still need to know which side before we write that down for you.',
        flag: input.kneeSide ? undefined : 'knee',
      },
      {
        heading: 'At home',
        body: 'No extra knee exercises yet. If it is the reason you book next, tell the front desk so Alex has time for it.',
      },
    ]
  }
  return [
    {
      heading: 'What we covered',
      body: `Alex assessed your right shoulder. You have had trouble sleeping on that side and reaching behind you. Your goal is to get back to easy climbing without a flare.`,
    },
    {
      heading: 'Pain',
      body: input.pain == null
        ? 'We still need a 0–10 number on the chart before this sentence is finished.'
        : `You rated the shoulder ${input.pain} out of 10 at end-range.`,
      flag: input.pain == null && input.beat >= 4 ? 'pain' : undefined,
    },
    {
      heading: 'At home',
      body: input.beat >= 5
        ? 'Do the climbing-safe exercises Alex queued. Stay off the hangboard for two weeks. We will see you back with Alex.'
        : 'Home plan is not on the tape yet.',
    },
  ]
}

export const tasks = [
  { id: 'hep', label: 'Queue climbing-safe HEP to Priya' },
  { id: 'recall', label: 'Book 2-week recall with Alex' },
  { id: 'bill', label: 'Park the billing draft on the chart' },
] as const
