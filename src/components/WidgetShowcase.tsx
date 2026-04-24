import { useEffect, useState } from 'react'
import { Play, ChevronRight } from 'lucide-react'

interface WidgetImage {
  src: string
  className?: string
}

interface WidgetShowcaseProps {
  images: (string | WidgetImage)[]
  interval?: number
  overlayLabel?: string
  autoPlayDelay?: number
  pauseAtIndex?: number
}

export default function WidgetShowcase({
  images,
  interval = 3000,
  overlayLabel = 'Виджет поверх МИС',
  autoPlayDelay = 2500,
  pauseAtIndex,
}: WidgetShowcaseProps) {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<'waiting' | 'playing' | 'paused' | 'done'>('waiting')

  const normalizedImages = images.map((img) =>
    typeof img === 'string' ? { src: img, className: '' } : img
  )

  const effectivePauseAt = pauseAtIndex ?? normalizedImages.length - 1

  useEffect(() => {
    if (normalizedImages.length <= 1) return

    if (phase === 'waiting') {
      const timeout = setTimeout(() => {
        setPhase('playing')
      }, autoPlayDelay)
      return () => clearTimeout(timeout)
    }

    if (phase === 'playing') {
      if (current >= effectivePauseAt) {
        setPhase('paused')
        return
      }

      const timeout = setTimeout(() => {
        setCurrent((prev) => prev + 1)
      }, interval)

      return () => clearTimeout(timeout)
    }
  }, [current, normalizedImages.length, interval, autoPlayDelay, phase, effectivePauseAt])

  const handleNext = () => {
    if (current < normalizedImages.length - 1) {
      setCurrent((prev) => prev + 1)
      if (current + 1 >= normalizedImages.length - 1) {
        setPhase('done')
      }
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setPhase('waiting')
  }

  const showNextBtn = phase === 'paused' && current < normalizedImages.length - 1
  const showRestartBtn = phase === 'done' || (phase === 'paused' && current >= normalizedImages.length - 1)

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
      <div className="relative w-full bg-slate-100" style={{ aspectRatio: '16 / 9' }}>
        <img
          src="./images/screens/widget-bg.png"
          alt="Интерфейс МИС ЕЦП"
          className="absolute inset-0 w-full h-full object-contain bg-slate-100"
        />

        <div className="absolute top-16 right-4 w-[42%] max-w-[460px] min-w-[220px]">
          {normalizedImages.map((img, index) => (
            <div
              key={img.src}
              className="transition-opacity duration-700 ease-in-out"
              style={{
                opacity: index === current ? 1 : 0,
                pointerEvents: index === current ? 'auto' : 'none',
                position: index === current ? 'relative' : 'absolute',
                inset: 0,
              }}
            >
              <img
                src={img.src}
                alt={`Виджет ${index + 1}`}
                className={`h-auto object-contain drop-shadow-2xl rounded-lg ${img.className || 'w-full'}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
          {overlayLabel}
        </div>

        {showNextBtn && (
          <button
            onClick={handleNext}
            className="absolute inset-0 flex items-center justify-center z-20"
            aria-label="Следующий скриншот"
          >
            <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center animate-pulse hover:bg-white/50 transition-colors">
              <ChevronRight size={28} />
            </div>
          </button>
        )}

        {showRestartBtn && (
          <button
            onClick={handleRestart}
            className="absolute inset-0 flex items-center justify-center z-20"
            aria-label="Воспроизвести"
          >
            <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center animate-pulse hover:bg-white/50 transition-colors">
              <Play size={24} fill="white" />
            </div>
          </button>
        )}
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {normalizedImages.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-primary-600' : 'bg-slate-300'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
