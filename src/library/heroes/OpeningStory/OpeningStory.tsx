import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
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
const DEFAULT_INDEX = 1
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
const MAX_SHIFT = DEFAULT_INDEX * CARD_STEP

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

function fillOffset(index: number) {
  const max = TRACK_W - FILL_W
  const last = cards.length - 1
  if (last <= DEFAULT_INDEX) return FILL_INSET_DEFAULT
  const step = (max - FILL_INSET_DEFAULT) / (last - DEFAULT_INDEX)
  return Math.min(max, Math.max(0, FILL_INSET_DEFAULT + (index - DEFAULT_INDEX) * step))
}

function rowShift(index: number) {
  const desired = -(index - DEFAULT_INDEX) * CARD_STEP
  return Math.min(MAX_SHIFT, Math.max(MIN_SHIFT, desired))
}

function cardLabel(card: Card, index: number) {
  return card.name ? `${FEATURED_ROLE}, ${card.name}` : `Practitioner ${index + 1}`
}

export default function OpeningStory() {
  useStudyFonts()
  const labelId = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX)
  const last = cards.length - 1
  const shift = rowShift(activeIndex)
  const atStart = activeIndex === 0
  const atEnd = activeIndex === last
  const active = cards[activeIndex]

  function go(next: number) {
    setActiveIndex(Math.min(last, Math.max(0, next)))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      go(activeIndex + 1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      go(activeIndex - 1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      go(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      go(last)
    }
  }

  function indexFromClientX(clientX: number) {
    const track = trackRef.current
    if (!track) return activeIndex
    const rect = track.getBoundingClientRect()
    if (rect.width === 0) return activeIndex
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return Math.round(ratio * last)
  }

  function onTrackPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    go(indexFromClientX(event.clientX))
  }

  function onTrackPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    go(indexFromClientX(event.clientX))
  }

  return (
    <div className="w-full bg-white" style={{ containerType: 'inline-size' }}>
      <div
        className="overflow-hidden bg-white"
        style={{ height: `calc(${FRAME_H} * 100cqw / ${FRAME_W})` }}
      >
        <div
          className="relative overflow-hidden bg-white outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          tabIndex={0}
          onKeyDown={onKeyDown}
          style={{
            width: FRAME_W,
            height: FRAME_H,
            transform: `scale(calc(100cqw / ${FRAME_W}))`,
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

          <div className="absolute" style={{ left: ROW_LEFT, top: 405 }}>
            <ul
              className="m-0 flex list-none items-center p-0"
              style={{
                gap: CARD_GAP,
                transform: `translateX(${shift}px)`,
                transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {cards.map((card, index) => {
                const featured = index === activeIndex
                return (
                  <li key={card.src} className="shrink-0">
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-current={featured ? 'true' : undefined}
                      aria-label={cardLabel(card, index)}
                      onClick={() => go(index)}
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
                        className="absolute inset-0 z-10 flex flex-col items-start text-left text-white"
                        style={{
                          background: 'rgba(0,0,0,0.64)',
                          opacity: featured ? 1 : 0,
                          paddingLeft: 25,
                          paddingTop: 203,
                          paddingRight: 25,
                          gap: 8,
                          transition: 'opacity 220ms ease',
                        }}
                      >
                        <p
                          className="w-full text-[14px] leading-5"
                          style={{
                            fontFamily: SANS,
                            fontWeight: 600,
                            letterSpacing: '0.2px',
                          }}
                        >
                          {FEATURED_ROLE}
                        </p>
                        {card.name ? (
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
                        ) : null}
                        <p
                          className="w-full text-[16px] leading-6"
                          style={{
                            fontFamily: SANS,
                            fontWeight: 400,
                            letterSpacing: '0px',
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
            <div
              ref={trackRef}
              role="slider"
              tabIndex={-1}
              aria-label="Featured practitioner"
              aria-valuemin={1}
              aria-valuemax={cards.length}
              aria-valuenow={activeIndex + 1}
              aria-valuetext={cardLabel(active, activeIndex)}
              onPointerDown={onTrackPointerDown}
              onPointerMove={onTrackPointerMove}
              className="relative cursor-pointer"
              style={{ width: TRACK_W, height: 16 }}
            >
              <div
                className="absolute top-1/2 left-0 h-[5px] w-full -translate-y-1/2 rounded-[100px]"
                style={{ background: '#04070a', opacity: 0.08 }}
              />
              <div
                className="absolute top-1/2 h-[5px] -translate-y-1/2 rounded-[100px]"
                style={{
                  left: fillOffset(activeIndex),
                  width: FILL_W,
                  background: '#027989',
                  transition: 'left 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </div>
            <div className="flex items-center" style={{ gap: 16 }}>
              <button
                type="button"
                aria-label="Previous practitioner"
                disabled={atStart}
                onClick={() => go(activeIndex - 1)}
                className="flex size-11 min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-solid border-[#dcddde] bg-[rgba(255,255,255,0.15)] p-0 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="flex size-6 items-center justify-center overflow-hidden">
                  <img src={iconPrev} alt="" width={24} height={24} className="size-6 max-w-none" />
                </span>
              </button>
              <button
                type="button"
                aria-label="Next practitioner"
                disabled={atEnd}
                onClick={() => go(activeIndex + 1)}
                className="flex size-11 min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#00c1ca] p-0 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="flex size-6 items-center justify-center overflow-hidden">
                  <img src={iconNext} alt="" width={24} height={24} className="size-6 max-w-none" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
