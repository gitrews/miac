import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

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
  clickToAdvance?: boolean
}

export default function WidgetShowcase({
  images,
  interval = 3000,
  overlayLabel = 'Виджет поверх МИС',
  autoPlayDelay = 2500,
  pauseAtIndex,
  clickToAdvance = false,
}: WidgetShowcaseProps) {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<'waiting' | 'playing' | 'paused' | 'done'>('waiting')

  const normalizedImages = images.map((img) =>
    typeof img === 'string' ? { src: img, className: '' } : img
  )

  const effectivePauseAt = pauseAtIndex ?? normalizedImages.length - 1

  useEffect(() => {
    if (normalizedImages.length <= 1 || clickToAdvance) return

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
  }, [current, normalizedImages.length, interval, autoPlayDelay, phase, effectivePauseAt, clickToAdvance])

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
    if (clickToAdvance) {
      setPhase('done')
    } else {
      setPhase('waiting')
    }
  }

  const isLast = current >= normalizedImages.length - 1
  const showClickHint = clickToAdvance && !isLast
  const showRestartBtn = isLast

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
      <div className="relative w-full bg-slate-100" style={{ aspectRatio: '16 / 9' }}>
        <img
          src="./images/screens/widget-bg.png"
          alt="Интерфейс МИС ЕЦП"
          className="absolute inset-0 w-full h-full object-contain bg-slate-100"
        />

        <div className="absolute top-16 right-4 w-[42%] max-w-[460px] min-w-[220px]">
          {showClickHint && (
            <motion.div
              className="absolute right-full top-1/2 -translate-y-1/2 mr-2 flex flex-col items-center gap-1 z-10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm flex items-center justify-center"
                animate={{ x: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
              >
                <span className="text-xl text-slate-700">←</span>
              </motion.div>
              <span className="text-[10px] text-white font-semibold bg-black/50 backdrop-blur-sm rounded px-2 py-1 whitespace-nowrap">
                Нажми сюда
              </span>
            </motion.div>
          )}

          <div className="relative">
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
                {clickToAdvance ? (
                  <button
                    onClick={handleNext}
                    className="block w-full text-left"
                    aria-label="Следующий скриншот"
                  >
                    <img
                      src={img.src}
                      alt={`Виджет ${index + 1}`}
                      className={`h-auto object-contain drop-shadow-2xl rounded-lg ${img.className || 'w-full'}`}
                    />
                  </button>
                ) : (
                  <img
                    src={img.src}
                    alt={`Виджет ${index + 1}`}
                    className={`h-auto object-contain drop-shadow-2xl rounded-lg ${img.className || 'w-full'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
          {overlayLabel}
        </div>

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
