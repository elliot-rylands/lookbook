import { useEffect, useId, useRef, useState } from 'react'
import card1 from './assets/card-1.png'
import card2 from './assets/card-2-active.png'
import card3 from './assets/card-3.png'
import card4 from './assets/card-4.png'
import card5 from './assets/card-5.png'
import card6 from './assets/card-6.png'
import iconNext from './assets/icon-next.svg'
import iconPrev from './assets/icon-prev.svg'

const FRAME_W = 1440
const FRAME_H = 1008
const CARD_W = 354
const CARD_H = 371
const CARD_GAP = 16
const CARD_STEP = CARD_W + CARD_GAP
const ROW_LEFT = -177
const DEFAULT_INDEX = 1
const TRACK_W = 173
const FILL_W = 106
const FILL_INSET_DEFAULT = 22

const SANS = '"Proxima Nova", "Source Sans 3", ui-sans-serif, sans-serif'
const SERIF = 'Fields, "Source Serif 4", ui-serif, Georgia, serif'
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,500&display=swap'

type Card = {
  src: string
  role?: string
  name?: string
  body?: string
}

const cards: Card[] = [
  { src: card1 },
  {
    src: card2,
    role: 'PRACTITIONER',
    name: 'Michelle Jones',
    body: 'Lorem ipsum dolor sit amet consectetur. A semper aliquet bibendum tempus malesuada est sapien. Ipsum nam risus.',
  },
  { src: card3 },
  { src: card4 },
  { src: card5 },
  { src: card6 },
]

function useStudyFonts() {
  useEffect(() => {
    const id = 'opening-story-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])
}

function useFrameScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const sync = () => {
      setScale(Math.min(1, node.clientWidth / FRAME_W))
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, scale }
}

function fillOffset(index: number) {
  const max = TRACK_W - FILL_W
  const last = cards.length - 1
  if (last <= DEFAULT_INDEX) return FILL_INSET_DEFAULT
  const step = (max - FILL_INSET_DEFAULT) / (last - DEFAULT_INDEX)
  return Math.min(max, Math.max(0, FILL_INSET_DEFAULT + (index - DEFAULT_INDEX) * step))
}

export default function OpeningStory() {
  useStudyFonts()
  const { ref, scale } = useFrameScale()
  const labelId = useId()
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX)
  const last = cards.length - 1
  const shift = -(activeIndex - DEFAULT_INDEX) * CARD_STEP

  function go(next: number) {
    setActiveIndex(Math.min(last, Math.max(0, next)))
  }

  return (
    <div ref={ref} className="w-full bg-white" style={{ height: FRAME_H * scale }}>
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <header
          className="absolute flex w-[1094px] flex-col items-center gap-4"
          style={{ left: 173, top: 129 }}
        >
          <p
            className="w-full text-center text-[14px] leading-5 whitespace-nowrap"
            style={{
              color: '#027989',
              fontFamily: SANS,
              fontWeight: 600,
              letterSpacing: '0.2px',
            }}
          >
            YOUR NEW EHS
          </p>
          <h2
            id={labelId}
            className="w-full text-center text-[60px]"
            style={{
              color: '#04070a',
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: '-0.2px',
              lineHeight: '72px',
            }}
          >
            Title about opening
            <br />
            story of Jane
          </h2>
          <p
            className="w-full text-center text-[16px] leading-6"
            style={{
              color: '#8e8e8e',
              fontFamily: SANS,
              fontWeight: 400,
              letterSpacing: '0px',
            }}
          >
            Jane’s built-in booking features make scheduling and managing appointments easy for you
            and your clients.
          </p>
        </header>

        <div
          className="absolute overflow-visible"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          style={{ left: ROW_LEFT, top: 405 }}
        >
          <ul
            className="m-0 flex list-none items-center p-0"
            style={{
              gap: CARD_GAP,
              transform: `translateX(${shift}px)`,
              transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {cards.map((card, index) => {
              const active = index === activeIndex
              return (
                <li key={card.src} className="shrink-0">
                  <button
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    aria-label={
                      card.name
                        ? `${card.role ?? 'Practitioner'}, ${card.name}`
                        : `Practitioner ${index + 1}`
                    }
                    onClick={() => go(index)}
                    className="relative block overflow-hidden rounded-[16px] bg-white p-0"
                    style={{ width: CARD_W, height: CARD_H }}
                  >
                    <img
                      src={card.src}
                      alt=""
                      width={CARD_W}
                      height={CARD_H}
                      className="absolute inset-0 size-full rounded-[16px] object-cover"
                    />
                    {active && (
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-[16px]"
                        style={{ background: 'rgba(0,0,0,0.64)' }}
                      />
                    )}
                    {active && card.name && (
                      <div
                        className="absolute flex flex-col items-start text-left text-white"
                        style={{ left: 25, top: 203, width: 304, gap: 8 }}
                      >
                        <p
                          className="w-full text-[14px] leading-5"
                          style={{
                            fontFamily: SANS,
                            fontWeight: 600,
                            letterSpacing: '0.2px',
                          }}
                        >
                          {card.role}
                        </p>
                        <p
                          className="w-full text-[24px]"
                          style={{
                            fontFamily: SERIF,
                            fontWeight: 500,
                            letterSpacing: '0.2px',
                            lineHeight: '32px',
                          }}
                        >
                          {card.name}
                        </p>
                        <p
                          className="w-full text-[16px] leading-6"
                          style={{
                            fontFamily: SANS,
                            fontWeight: 400,
                            letterSpacing: '0px',
                          }}
                        >
                          {card.body}
                        </p>
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          aria-hidden
          className="absolute h-[5px] rounded-[100px]"
          style={{
            left: 1050,
            top: 857,
            width: TRACK_W,
            background: '#04070a',
            opacity: 0.08,
          }}
        />
        <div
          aria-hidden
          className="absolute h-[5px] rounded-[100px]"
          style={{
            left: 1050 + fillOffset(activeIndex),
            top: 857,
            width: FILL_W,
            background: '#027989',
            transition: 'left 420ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        <div className="absolute flex items-center" style={{ left: 1260, top: 835, gap: 16 }}>
          <button
            type="button"
            aria-label="Previous practitioner"
            disabled={activeIndex === 0}
            onClick={() => go(activeIndex - 1)}
            className="flex size-11 min-h-11 min-w-11 items-center justify-center rounded-lg border border-solid border-[#dcddde] bg-[rgba(255,255,255,0.15)] p-0 disabled:opacity-40"
          >
            <span className="flex size-6 items-center justify-center overflow-hidden">
              <img src={iconPrev} alt="" width={24} height={24} className="size-6" />
            </span>
          </button>
          <button
            type="button"
            aria-label="Next practitioner"
            disabled={activeIndex === last}
            onClick={() => go(activeIndex + 1)}
            className="flex size-11 min-h-11 min-w-11 items-center justify-center rounded-lg bg-[#00c1ca] p-0 disabled:opacity-40"
          >
            <span className="flex size-6 items-center justify-center overflow-hidden">
              <img src={iconNext} alt="" width={24} height={24} className="size-6" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
