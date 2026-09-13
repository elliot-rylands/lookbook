import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Spring = { stiffness: number; damping: number }

type CopyButtonProps = {
  text?: string
  swapSpring?: Spring
  buttonSpring?: Spring
  checkSpring?: Spring
  resetDelay?: number
}

const defaultSwap = { stiffness: 260, damping: 18 }
const defaultButton = { stiffness: 400, damping: 20 }
const defaultCheck = { stiffness: 300, damping: 25 }

const childVariants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(4px)' },
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'absolute'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    field.remove()
  }
}

function ClipboardIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}

function CheckIcon({ spring }: { spring: Spring }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <motion.path
        d="M4 12l5 5L20 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ type: 'spring', ...spring, delay: 0.1 }}
      />
    </svg>
  )
}

export default function CopyButton({
  text = 'https://motion.dev/examples/vue-copy-button',
  swapSpring = defaultSwap,
  buttonSpring = defaultButton,
  checkSpring = defaultCheck,
  resetDelay = 2000,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  async function handleCopy() {
    if (copied) return
    await writeClipboard(text)
    setCopied(true)
    timerRef.current = setTimeout(() => setCopied(false), resetDelay)
  }

  return (
    <div className="flex h-full min-h-[360px] w-full items-center justify-center bg-[#0d1111] text-[#ededec]">
      <motion.button
        type="button"
        layout
        data-primary-action=""
        data-copied={copied || undefined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', ...buttonSpring }}
        onClick={() => void handleCopy()}
        aria-label={copied ? 'Copied' : 'Copy'}
        className="relative inline-flex cursor-pointer items-center justify-center rounded-[10px] border border-[#1e2427] bg-[#13181a] px-4 py-2.5 text-sm font-medium text-[#ededec] select-none will-change-transform hover:bg-white/[0.06] data-[copied]:border-[rgba(74,222,128,0.3)] data-[copied]:text-[rgb(74,222,128)]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'copied' : 'copy'}
            layout="position"
            className="flex items-center gap-1.5 will-change-[opacity,filter]"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{
              type: 'spring',
              ...swapSpring,
              staggerChildren: copied ? 0.2 : 0,
            }}
          >
            <motion.span className="flex items-center" variants={childVariants}>
              {copied ? <CheckIcon spring={checkSpring} /> : <ClipboardIcon />}
            </motion.span>
            <motion.span variants={childVariants}>{copied ? 'Copied!' : 'Copy'}</motion.span>
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
