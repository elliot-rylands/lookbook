import { useEffect, useState } from 'react'
import {
  beats,
  billingCode,
  chart,
  chartNote,
  codesFor,
  patient,
  patientNote,
  tasks,
  type KneeSide,
  type Output,
  type ProblemId,
  type Recording,
} from './visit'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,500&display=swap'
const SANS = '"Proxima Nova", "Source Sans 3", ui-sans-serif, sans-serif'
const SERIF = 'Fields, "Source Serif 4", ui-serif, Georgia, serif'

const INK = '#1c2622'
const PINE = '#0d5c5a'
const MIST = '#e4ecec'
const PAPER = '#f6f1e8'
const FLAG = '#9a5b12'
const FLAG_BG = '#f4e6cf'
const RECORD = '#b43333'
const LINE = '#c9d4d2'
const MUTED = '#5d6d69'

type Props = { fillViewport?: boolean }

function useStudyFonts() {
  useEffect(() => {
    const id = 'jane-ai-scribe-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])
}

function Badge({
  tone,
  children,
}: {
  tone: 'ok' | 'warn' | 'live' | 'off'
  children: string
}) {
  const map = {
    ok: { background: '#d7ebe6', color: PINE },
    warn: { background: FLAG_BG, color: FLAG },
    live: { background: '#f3d4d4', color: RECORD },
    off: { background: MIST, color: MUTED },
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide"
      style={map[tone]}
    >
      {children}
    </span>
  )
}

export default function JaneAiScribe({ fillViewport = false }: Props) {
  useStudyFonts()
  const [consent, setConsent] = useState(false)
  const [recording, setRecording] = useState<Recording>('off')
  const [chartOpen, setChartOpen] = useState(false)
  const [beat, setBeat] = useState(0)
  const [split, setSplit] = useState(false)
  const [pain, setPain] = useState<number | null>(null)
  const [kneeSide, setKneeSide] = useState<KneeSide | null>(null)
  const [output, setOutput] = useState<Output>('chart')
  const [problem, setProblem] = useState<ProblemId>('shoulder')
  const [queued, setQueued] = useState<string[]>([])

  const heard = beats.slice(0, beat)
  const asides = heard.filter((item) => item.aside)
  const spoken = heard.filter((item) => !item.aside)
  const codes = codesFor({ kneeSide, split })
  const billing = billingCode(split)
  const note =
    output === 'chart'
      ? chartNote({ chartOpen, beat, split, problem, pain, kneeSide })
      : patientNote({ chartOpen, beat, split, problem, pain, kneeSide })
  const canAdvance = consent && recording === 'live' && beat < beats.length
  const missingPain = beat >= 4 && pain == null
  const missingKnee = beat >= 2 && split && kneeSide == null
  const canQueue = beat >= 5 && chartOpen && consent && pain != null && (!split || kneeSide != null)

  function startOver() {
    setConsent(false)
    setRecording('off')
    setChartOpen(false)
    setBeat(0)
    setSplit(false)
    setPain(null)
    setKneeSide(null)
    setOutput('chart')
    setProblem('shoulder')
    setQueued([])
  }

  function toggleRecord() {
    if (!consent) return
    setRecording((current) => (current === 'live' ? 'paused' : 'live'))
  }

  function queueAll() {
    if (!canQueue) return
    setQueued(tasks.map((item) => item.id))
  }

  const shell = (
    <div
      className="flex h-full min-h-0 w-full flex-col overflow-hidden"
      style={{ background: MIST, color: INK, fontFamily: SANS }}
    >
      <header
        className="grid shrink-0 grid-cols-1 gap-3 border-b px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
        style={{ background: '#12211f', color: '#e8f2f0', borderColor: '#0a1615' }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#8fb8b4' }}>
            Jane scribe · {patient.clinic}
          </p>
          <span className="hidden h-4 w-px sm:block" style={{ background: '#2c4a46' }} />
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={recording === 'live' ? 'live' : recording === 'paused' ? 'warn' : 'off'}>
              {recording === 'live'
                ? '● Recording'
                : recording === 'paused'
                  ? 'Paused'
                  : 'Recorder off'}
            </Badge>
            <Badge tone={consent ? 'ok' : 'warn'}>
              {consent ? 'Consent on chart' : 'Consent missing'}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[12px]" style={{ color: '#b7cfcb' }}>
          <span>
            {patient.name} · {patient.booking}
          </span>
          <button
            type="button"
            onClick={startOver}
            className="cursor-pointer rounded-md border px-2 py-1 text-[11px]"
            style={{ borderColor: '#2c4a46', color: '#e8f2f0' }}
          >
            Reset visit
          </button>
        </div>
      </header>

      {!consent ? (
        <div className="grid flex-1 place-items-center px-6">
          <div className="max-w-lg rounded-2xl border px-6 py-7" style={{ background: PAPER, borderColor: LINE }}>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: FLAG }}>
              Jane will not run a scribe yet
            </p>
            <h2 className="mt-2 text-[28px] leading-tight" style={{ fontFamily: SERIF, fontWeight: 500 }}>
              Priya is in the room. Consent is not on the chart.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed" style={{ color: MUTED }}>
              A typical scribe starts transcribing anyway. This one stays dark until verbal consent is
              written to Jane — same rule as filming a visit.
            </p>
            <button
              type="button"
              onClick={() => {
                setConsent(true)
                setRecording('live')
              }}
              className="mt-5 cursor-pointer rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white"
              style={{ background: PINE }}
            >
              Record verbal consent in Jane
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
          <aside
            className="shrink-0 overflow-y-auto border-b xl:w-[300px] xl:border-b-0 xl:border-r"
            style={{ borderColor: LINE, background: '#f3f7f6' }}
          >
            <div className="px-4 py-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: MUTED }}>
                Jane chart
              </p>
              <h3 className="mt-1 text-[20px] leading-tight" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                {patient.name}
              </h3>
              <p className="mt-1 text-[12px]" style={{ color: MUTED }}>
                #{patient.janeId} · {patient.age} · {patient.clinician}
              </p>
              <p className="mt-2 text-[13px] leading-snug">{patient.reason}</p>

              <button
                type="button"
                onClick={() => setChartOpen(true)}
                disabled={chartOpen}
                className="mt-4 w-full cursor-pointer rounded-lg px-3 py-2 text-[13px] font-semibold disabled:cursor-default"
                style={{
                  background: chartOpen ? MIST : PINE,
                  color: chartOpen ? MUTED : '#fff',
                }}
              >
                {chartOpen ? 'Chart pulled into the draft' : 'Pull chart before drafting'}
              </button>

              <dl className="mt-4 space-y-3 text-[12px] leading-relaxed">
                <div>
                  <dt className="font-semibold">Prior visits</dt>
                  <dd style={{ color: MUTED }}>{chart.visits}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Referring</dt>
                  <dd style={{ color: MUTED }}>{chart.referring}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Intake</dt>
                  <dd>
                    <ul className="mt-1 list-disc space-y-1 pl-4" style={{ color: MUTED }}>
                      {chart.intake.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: MUTED }}>
                Required on this encounter
              </p>
              <ul className="mt-2 space-y-1.5 text-[12px]">
                <li style={{ color: consent ? PINE : FLAG }}>{consent ? 'Consent filed' : 'Consent missing'}</li>
                <li style={{ color: pain != null ? PINE : FLAG }}>
                  {pain != null ? `Shoulder pain ${pain}/10` : 'Shoulder pain scale empty'}
                </li>
                <li style={{ color: !split || kneeSide ? PINE : FLAG }}>
                  {split
                    ? kneeSide
                      ? `Knee laterality: ${kneeSide}`
                      : 'Knee laterality empty'
                    : 'Knee laterality — needed after split'}
                </li>
              </ul>
            </div>
          </aside>

          <section
            className="flex min-h-0 min-w-0 flex-1 flex-col border-b xl:border-b-0 xl:border-r"
            style={{ borderColor: LINE, background: '#fff' }}
          >
            <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5" style={{ borderColor: LINE }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: MUTED }}>
                Visit tape
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleRecord}
                  className="cursor-pointer rounded-md px-2.5 py-1 text-[12px] font-semibold text-white"
                  style={{ background: recording === 'live' ? RECORD : PINE }}
                >
                  {recording === 'live' ? 'Pause' : 'Resume'}
                </button>
                <button
                  type="button"
                  disabled={!canAdvance}
                  onClick={() => setBeat((current) => Math.min(beats.length, current + 1))}
                  className="cursor-pointer rounded-md border px-2.5 py-1 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ borderColor: LINE }}
                >
                  Next beat
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {spoken.length === 0 && asides.length === 0 ? (
                <p className="text-[14px] leading-relaxed" style={{ color: MUTED }}>
                  Recorder is live. Advance the tape. A normal scribe would already be dumping a SOAP.
                  This one waits for speech — and for the chart.
                </p>
              ) : (
                <ol className="space-y-3">
                  {heard.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-xl px-3 py-2.5"
                      style={{
                        background: item.aside ? FLAG_BG : MIST,
                        border: item.aside ? `1px dashed ${FLAG}` : '1px solid transparent',
                      }}
                    >
                      <p className="text-[11px] font-semibold" style={{ color: item.aside ? FLAG : MUTED }}>
                        {item.clock} · {item.speaker}
                        {item.aside ? ' · aside — will not chart' : ''}
                      </p>
                      <p className="mt-1 text-[14px] leading-relaxed">{item.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              {asides.length > 0 ? (
                <p className="mt-4 text-[12px] leading-relaxed" style={{ color: FLAG }}>
                  {asides.length} clinician aside kept off both the chart note and the after-visit
                  summary. Typical scribes paste that into SOAP.
                </p>
              ) : null}
            </div>
          </section>

          <section className="flex min-h-0 w-full flex-col xl:w-[420px]" style={{ background: PAPER }}>
            <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5" style={{ borderColor: LINE }}>
              <div className="flex rounded-lg p-0.5" style={{ background: MIST }}>
                {(['chart', 'patient'] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setOutput(id)}
                    className="cursor-pointer rounded-md px-2.5 py-1 text-[12px] font-semibold"
                    style={{
                      background: output === id ? '#fff' : 'transparent',
                      color: output === id ? INK : MUTED,
                    }}
                  >
                    {id === 'chart' ? 'Chart note' : 'After-visit'}
                  </button>
                ))}
              </div>
              {split ? (
                <div className="flex gap-1">
                  {(['shoulder', 'knee'] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setProblem(id)}
                      className="cursor-pointer rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        background: problem === id ? PINE : '#fff',
                        color: problem === id ? '#fff' : INK,
                        border: `1px solid ${LINE}`,
                      }}
                    >
                      {id === 'shoulder' ? 'Shoulder note' : 'Knee note'}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  disabled={beat < 2}
                  onClick={() => {
                    setSplit(true)
                    setProblem('shoulder')
                  }}
                  className="cursor-pointer text-[12px] font-semibold disabled:opacity-40"
                  style={{ color: PINE }}
                >
                  Split into two notes
                </button>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {output === 'patient' ? (
                <p className="mb-3 text-[11px] leading-relaxed" style={{ color: MUTED }}>
                  Patient-facing. No ICD, no billing, no asides, no sister conversation.
                </p>
              ) : (
                <p className="mb-3 text-[11px] leading-relaxed" style={{ color: MUTED }}>
                  Clinician chart. Uses Jane intake only after you pull the chart.
                </p>
              )}
              <div className="space-y-3">
                {note.map((block) => (
                  <article
                    key={block.heading}
                    className="rounded-xl px-3 py-2.5"
                    style={{
                      background: block.flag ? FLAG_BG : '#fff',
                      boxShadow: `inset 0 0 0 1px ${block.flag ? FLAG : LINE}`,
                    }}
                  >
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: MUTED }}>
                      {block.heading}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed">{block.body}</p>
                    {block.flag === 'pain' ? (
                      <button
                        type="button"
                        onClick={() => setPain(4)}
                        className="mt-2 cursor-pointer text-[12px] font-semibold"
                        style={{ color: FLAG }}
                      >
                        Resolve: chart 4/10 from Alex’s scale prompt
                      </button>
                    ) : null}
                    {block.flag === 'knee' ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setKneeSide('left')}
                          className="cursor-pointer text-[12px] font-semibold"
                          style={{ color: FLAG }}
                        >
                          Resolve: left knee (intake + hike)
                        </button>
                        <button
                          type="button"
                          onClick={() => setKneeSide('right')}
                          className="cursor-pointer text-[12px] font-semibold"
                          style={{ color: MUTED }}
                        >
                          Right instead
                        </button>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>

              {missingPain && output === 'chart' && !note.some((block) => block.flag === 'pain') ? (
                <button
                  type="button"
                  onClick={() => setPain(4)}
                  className="mt-3 text-[12px] font-semibold"
                  style={{ color: FLAG }}
                >
                  Pain scale still empty — set 4/10
                </button>
              ) : null}
              {missingKnee && output === 'chart' && problem === 'shoulder' ? (
                <p className="mt-3 text-[12px]" style={{ color: FLAG }}>
                  Open the knee note to set laterality.
                </p>
              ) : null}

              {beat >= 4 && chartOpen ? (
                <div className="mt-5">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: MUTED }}>
                    Suggested codes
                  </p>
                  <ul className="mt-2 space-y-2">
                    {codes.map((code) => (
                      <li
                        key={code.id}
                        className="rounded-lg px-3 py-2"
                        style={{ background: '#fff', boxShadow: `inset 0 0 0 1px ${LINE}` }}
                      >
                        <p className="flex items-center justify-between gap-2 text-[13px] font-semibold">
                          <span>
                            {code.code} · {code.label}
                          </span>
                          <Badge tone={code.confidence === 'high' ? 'ok' : 'warn'}>
                            {code.confidence === 'high' ? 'Supported' : 'Low confidence'}
                          </Badge>
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed" style={{ color: MUTED }}>
                          {code.why}
                        </p>
                      </li>
                    ))}
                    <li className="text-[12px] leading-relaxed" style={{ color: MUTED }}>
                      {billing.code} · {billing.label}. {billing.flag}
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="shrink-0 border-t px-4 py-3" style={{ borderColor: LINE, background: '#efe8db' }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: MUTED }}>
                Queue in Jane
              </p>
              <ul className="mt-1.5 space-y-1 text-[12px]">
                {tasks.map((task) => (
                  <li key={task.id} style={{ color: queued.includes(task.id) ? PINE : INK }}>
                    {queued.includes(task.id) ? 'Queued · ' : ''}
                    {task.label}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={!canQueue || queued.length === tasks.length}
                onClick={queueAll}
                className="mt-3 w-full cursor-pointer rounded-lg py-2 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: PINE }}
              >
                {queued.length === tasks.length
                  ? 'HEP, recall, and billing draft are in Jane'
                  : canQueue
                    ? 'Queue HEP, recall, and billing draft'
                    : 'Resolve consent, chart, pain, and laterality first'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )

  if (fillViewport) {
    return <div className="h-dvh w-dvw overflow-hidden">{shell}</div>
  }

  return (
    <div className="w-full overflow-hidden" style={{ height: 820 }}>
      {shell}
    </div>
  )
}
