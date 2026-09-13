import { useEffect, useId, useRef, type KeyboardEvent, useState } from 'react'
import card1 from './assets/card-1.png'
import card2 from './assets/card-2-active.png'
import card3 from './assets/card-3.png'
import card4 from './assets/card-4.png'
import card5 from './assets/card-5.png'
import card6 from './assets/card-6.png'
import card7 from './assets/card-7.jpg'
import card8 from './assets/card-8.jpg'
import card9 from './assets/card-9.jpg'
import card10 from './assets/card-10.jpg'
import card11 from './assets/card-11.jpg'
import card12 from './assets/card-12.jpg'
import iconNext from './assets/icon-next.svg'
import iconPrev from './assets/icon-prev.svg'

const FRAME_W = 1440
const FRAME_H = 1008
const CARD_W = 354
const CARD_H = 371
const CARD_GAP = 16
const CARD_STEP = CARD_W + CARD_GAP
const ROW_LEFT = -177
const TRACK_W = 173
const FILL_W = 106
const FILL_INSET_DEFAULT = 22
const CONTROL_TOP = 835
const CONTROL_RIGHT = 76
const CONTROL_GAP = 37

const SANS = '"Proxima Nova", "Source Sans 3", ui-sans-serif, sans-serif'
const SERIF = 'Fields, "Source Serif 4", ui-serif, Georgia, serif'
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,500&display=swap'

const FEATURED_ROLE = 'PRACTITIONER'
const FEATURED_BODY =
  'Lorem ipsum dolor sit amet consectetur. A semper aliquet bibendum tempus malesuada est sapien. Ipsum nam risus.'

const HOVER_GRADIENT =
  'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 38%, rgba(0,0,0,0.12) 64%, rgba(0,0,0,0) 82%)'

type Card = {
  src: string
  name?: string
}

const cards: Card[] = [
  { src: card1 },
  { src: card2, name: 'Michelle Jones' },
  { src: card3 },
  { src: card4 },
  { src: card5 },
  { src: card6 },
  { src: card7 },
  { src: card8 },
  { src: card9 },
  { src: card10 },
  { src: card11 },
  { src: card12 },
]

const ROW_WIDTH = cards.length * CARD_W + (cards.length - 1) * CARD_GAP
const MIN_SHIFT = FRAME_W + Math.abs(ROW_LEFT) - (ROW_LEFT + ROW_WIDTH)
const MAX_OFFSET = Math.max(0, Math.floor(-MIN_SHIFT / CARD_STEP))

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

function clampOffset(next: number) {
  return Math.min(MAX_OFFSET, Math.max(0, next))
}

function fillLeft(offset: number) {
  if (MAX_OFFSET <= 0) return FILL_INSET_DEFAULT
  const max = TRACK_W - FILL_W
  const travel = max - FILL_INSET_DEFAULT
  return Math.min(max, Math.max(0, FILL_INSET_DEFAULT + (offset / MAX_OFFSET) * travel))
}

function cardLabel(card: Card, index: number) {
  return card.name ? `${FEATURED_ROLE}, ${card.name}` : `Practitioner ${index + 1}`
}

type OpeningStoryProps = {
  fillViewport?: boolean
}

export default function OpeningStory({ fillViewport = false }: OpeningStoryProps) {
  useStudyFonts()
  const labelId = useId()
  const regionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const atStart = offset === 0
  const atEnd = offset >= MAX_OFFSET
  const shift = -offset * CARD_STEP
  const previewScale = `calc(100cqw / ${FRAME_W}px)`
  const viewportBoxWidth = `min(100vw, calc(100dvh * ${FRAME_W} / ${FRAME_H}))`
  const viewportScale = `calc(${viewportBoxWidth} / ${FRAME_W}px)`

  useEffect(() => {
    if (!fillViewport) return
    regionRef.current?.focus({ preventScroll: true })
  }, [fillViewport])

  function nudge(delta: number) {
    setOffset((current) => clampOffset(current + delta))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      nudge(1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      nudge(-1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setOffset(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      setOffset(MAX_OFFSET)
    }
  }

  const canvas = (
    <div
      ref={regionRef}
      role="region"
      aria-labelledby={labelId}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative bg-white outline-none"
      style={{ width: FRAME_W, height: FRAME_H }}
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

      <div className="absolute" style={{ left: ROW_LEFT, top: 405 }}>
        <ul
          className="m-0 flex list-none items-center p-0"
          style={{
            gap: CARD_GAP,
            transform: `translateX(${shift}px)`,
            transition: 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
              {cards.map((card, index) => {
                const revealed = hoveredIndex === index
                return (
                <li key={card.src} className="shrink-0">
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={`${cardLabel(card, index)}. Advance carousel`}
                    onClick={() => nudge(1)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() =>
                      setHoveredIndex((current) => (current === index ? null : current))
                    }
                    className="relative block cursor-pointer overflow-hidden rounded-[16px] border-0 bg-white p-0"
                    style={{ width: CARD_W, height: CARD_H }}
                  >
                    <img
                      src={card.src}
                      alt=""
                      width={CARD_W}
                      height={CARD_H}
                      className="absolute inset-0 z-0 size-full rounded-[16px] object-cover"
                    />
                    <div
                      className="absolute inset-0 z-10 flex flex-col items-start text-left text-white transition-opacity duration-300 ease-out"
                      style={{
                        backgroundImage: HOVER_GRADIENT,
                        opacity: revealed ? 1 : 0,
                        paddingLeft: 25,
                        paddingTop: 203,
                        paddingRight: 25,
                        gap: 8,
                      }}
                    >
                      <p
                        className="w-full text-[14px] leading-5 transition-transform duration-300 ease-out"
                        style={{
                          fontFamily: SANS,
                          fontWeight: 600,
                          letterSpacing: '0.2px',
                          transform: revealed ? 'translateY(0)' : 'translateY(8px)',
                        }}
                      >
                        {FEATURED_ROLE}
                      </p>
                      {card.name ? (
                        <p
                          className="w-full text-[24px] transition-transform duration-300 ease-out"
                          style={{
                            fontFamily: SERIF,
                            fontWeight: 500,
                            letterSpacing: '0.2px',
                            lineHeight: '32px',
                            transform: revealed ? 'translateY(0)' : 'translateY(8px)',
                          }}
                        >
                          {card.name}
                        </p>
                      ) : null}
                      <p
                        className="w-full text-[16px] leading-6 transition-transform duration-300 ease-out"
                        style={{
                          fontFamily: SANS,
                          fontWeight: 400,
                          letterSpacing: '0px',
                          transform: revealed ? 'translateY(0)' : 'translateY(8px)',
                        }}
                      >
                        {FEATURED_BODY}
                      </p>
                    </div>
                  </button>
                </li>
                )
              })}
        </ul>
      </div>

      <div
        className="absolute z-20 flex items-center"
        style={{ top: CONTROL_TOP, right: CONTROL_RIGHT, gap: CONTROL_GAP }}
      >
        <div aria-hidden className="relative" style={{ width: TRACK_W, height: 5 }}>
          <div
            className="absolute inset-0 rounded-[100px]"
            style={{ background: '#04070a', opacity: 0.08 }}
          />
          <div
            className="absolute top-0 h-full rounded-[100px]"
            style={{
              left: fillLeft(offset),
              width: FILL_W,
              background: '#027989',
              transition: 'left 480ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
        <div className="flex items-center" style={{ gap: 16 }}>
          <button
            type="button"
            aria-label="Previous"
            disabled={atStart}
            onClick={() => nudge(-1)}
            className="flex size-11 min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-solid border-[#dcddde] bg-[rgba(255,255,255,0.15)] p-0 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="flex size-6 items-center justify-center overflow-hidden">
              <img src={iconPrev} alt="" width={24} height={24} className="size-6 max-w-none" />
            </span>
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={atEnd}
            onClick={() => nudge(1)}
            className="flex size-11 min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#00c1ca] p-0 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="flex size-6 items-center justify-center overflow-hidden">
              <img src={iconNext} alt="" width={24} height={24} className="size-6 max-w-none" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )

  if (fillViewport) {
    return (
      <div className="grid h-dvh w-dvw place-items-center overflow-hidden bg-white">
        <div
          className="relative overflow-hidden"
          style={{
            width: viewportBoxWidth,
            height: `min(100dvh, calc(100vw * ${FRAME_H} / ${FRAME_W}))`,
          }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: FRAME_W,
              height: FRAME_H,
              transform: `scale(${viewportScale})`,
            }}
          >
            {canvas}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      style={{
        containerType: 'inline-size',
        height: `calc(${FRAME_H} * 100cqw / ${FRAME_W})`,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${previewScale})`,
        }}
      >
        {canvas}
      </div>
    </div>
  )
}
