import { useEffect, useRef, useState, type ReactNode } from 'react'
import { VIEWPORTS, type PreviewTheme, type ViewportId } from '@/components/lookbook/preview'
import { cn } from '@/lib/cn'

type PreviewFrameProps = {
  children: ReactNode
  viewport?: ViewportId
  theme?: PreviewTheme
  canvas?: string
  interactive?: boolean
  className?: string
  minHeight?: number
  cropHeight?: number
}

export function PreviewFrame({
  children,
  viewport = 'full',
  theme = 'light',
  canvas,
  interactive = true,
  className,
  minHeight = 360,
  cropHeight,
}: PreviewFrameProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [contentHeight, setContentHeight] = useState(minHeight)
  const targetWidth = VIEWPORTS[viewport].width
  const background =
    canvas ?? (theme === 'dark' ? '#12110e' : '#f7f4ec')

  useEffect(() => {
    const outer = outerRef.current
    const stage = stageRef.current
    if (!outer || !stage) return

    const update = () => {
      const available = outer.clientWidth
      const nextScale = targetWidth ? Math.min(1, available / targetWidth) : 1
      setScale(nextScale)
      setContentHeight(Math.max(stage.scrollHeight, minHeight))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(outer)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [targetWidth, minHeight, children])

  const scaledHeight = contentHeight * scale
  const frameHeight = cropHeight ?? Math.max(scaledHeight, minHeight * (cropHeight ? 1 : scale))

  return (
    <div
      ref={outerRef}
      className={cn('relative w-full overflow-hidden', className)}
      style={{ height: frameHeight, background }}
    >
      <div
        className="flex justify-center"
        style={{
          width: targetWidth ? targetWidth * scale : '100%',
          height: scaledHeight,
          margin: '0 auto',
        }}
      >
        <div
          ref={stageRef}
          className={cn('lb-preview-isolate', theme === 'dark' && 'dark')}
          style={{
            width: targetWidth ?? '100%',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            background,
            minHeight,
          }}
        >
          <div className={cn(!interactive && 'pointer-events-none select-none')}>{children}</div>
        </div>
      </div>
    </div>
  )
}
