import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface WidgetImage {
  src: string
  className?: string
  placement?: 'widget' | 'center'
}

interface WidgetShowcaseProps {
  images: (string | WidgetImage)[]
  interval?: number
  overlayLabel?: string
  autoPlayDelay?: number
  pauseAtIndex?: number
  clickToAdvance?: boolean
  autoAdvanceFirst?: boolean
}

export default function WidgetShowcase({
  images,
  interval = 3000,
  overlayLabel = 'Виджет поверх МИС',
  autoPlayDelay = 2500,
  pauseAtIndex,
  clickToAdvance = false,
  autoAdvanceFirst = false,
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

  useEffect(() => {
    if (!clickToAdvance || !autoAdvanceFirst || current !== 0 || normalizedImages.length <= 1) return

    const timeout = window.setTimeout(() => {
      setCurrent(1)
    }, autoPlayDelay)

    return () => window.clearTimeout(timeout)
  }, [autoAdvanceFirst, autoPlayDelay, clickToAdvance, current, normalizedImages.length])

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
  const showRestartBtn = isLast && !clickToAdvance
  const isCurrentCentered = normalizedImages[current]?.placement === 'center'

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl border border-slate-200 shadow-lg">
      {showClickHint && (
        <motion.div
          className="flex items-center justify-end gap-2 px-4 pt-3 pb-1 -translate-x-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <span className="text-xs text-slate-500 whitespace-nowrap">
            Нажмите сюда
          </span>
          <motion.span
            className="text-sm leading-none text-slate-500"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>
      )}

      <div className="relative w-full bg-slate-100" style={{ aspectRatio: '16 / 9' }}>
        <img
          src="./images/screens/widget-bg.png"
          alt="Интерфейс МИС ЕЦП"
          className="absolute inset-0 w-full h-full object-contain bg-slate-100"
        />

        {normalizedImages.map((img, index) => {
          const isCentered = img.placement === 'center'
          const isCurrentLast = index === normalizedImages.length - 1
          const handleClick = () => {
            if (clickToAdvance && isCurrentLast) {
              handleRestart()
              return
            }
            handleNext()
          }

          return (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCentered
                  ? 'flex items-center justify-center p-4 sm:p-6 md:p-8'
                  : 'flex items-start justify-end pt-3 pr-8 sm:pt-4 md:pt-7'
              }`}
              style={{
                opacity: index === current ? 1 : 0,
                pointerEvents: index === current ? 'auto' : 'none',
              }}
            >
              <div className={isCentered ? 'w-[42%] max-w-[470px] min-w-[260px]' : 'w-[45%] max-w-[492px] min-w-[220px] relative'}>
                <div className="relative">
                  {clickToAdvance ? (
                    <button
                      onClick={handleClick}
                      className="block w-full text-left"
                      aria-label={isCurrentLast ? 'Вернуться к первому скриншоту' : 'Следующий скриншот'}
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
              </div>
            </div>
          )
        })}

        {!isCurrentCentered && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
            {overlayLabel}
          </div>
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
