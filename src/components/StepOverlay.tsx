import { useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const stepTitles: Record<number, string> = {
  1: 'Запись в регистратуру',
  2: 'Вызов пациента в окно',
  3: 'Уведомление пациента',
  4: 'Оформление услуг',
  5: 'Завершение обслуживания',
  6: 'Запись на Профосмотр',
  7: 'Вызов пациента в кабинет',
  8: 'Уведомление пациента',
  9: 'Осмотр пациента',
  10: 'Завершение обслуживания',
}

const stepLabels: Record<number, { text: string; color: string }> = {
  1: { text: 'ВнеОчереди', color: '#E91E8C' },
  2: { text: 'ВнеОчереди', color: '#E91E8C' },
  3: { text: 'ВнеОчереди', color: '#E91E8C' },
  4: { text: 'ЕЦП МИС', color: '#0052CC' },
  5: { text: 'ВнеОчереди', color: '#E91E8C' },
  6: { text: 'ЕЦП МИС → ВнеОчереди', color: '#2EC4B6' },
  7: { text: 'ВнеОчереди', color: '#E91E8C' },
  8: { text: 'ВнеОчереди', color: '#E91E8C' },
  9: { text: 'ЕЦП МИС', color: '#0052CC' },
  10: { text: 'ВнеОчереди', color: '#E91E8C' },
}

const stepOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

interface StepOverlayProps {
  children: React.ReactNode
}

export default function StepOverlay({ children }: StepOverlayProps) {
  const navigate = useNavigate()
  const { stepId } = useParams<{ stepId: string }>()
  const currentStep = Number(stepId)

  const close = useCallback(() => {
    navigate('/')
  }, [navigate])

  const prevStep = useCallback(() => {
    const index = stepOrder.indexOf(currentStep)
    if (index > 0) {
      navigate(`/step/${stepOrder[index - 1]}`)
    }
  }, [currentStep, navigate])

  const nextStep = useCallback(() => {
    const index = stepOrder.indexOf(currentStep)
    if (index >= 0 && index < stepOrder.length - 1) {
      navigate(`/step/${stepOrder[index + 1]}`)
    }
  }, [currentStep, navigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prevStep()
      if (e.key === 'ArrowRight') nextStep()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [close, prevStep, nextStep])

  const label = stepLabels[currentStep] || stepLabels[1]
  const title = stepTitles[currentStep] || `Шаг ${currentStep}`
  const index = stepOrder.indexOf(currentStep)
  const hasPrev = index > 0
  const hasNext = index >= 0 && index < stepOrder.length - 1

  return (
    <div className="fixed inset-0 z-[9998] flex flex-col bg-gradient-to-b from-white to-light animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-black/5 bg-white/80 backdrop-blur-md shrink-0">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="text-xs font-bold tracking-widest uppercase text-primary-600">
            Шаг {currentStep}
          </div>
          <div className="flex items-center gap-3 min-w-0 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold text-dark truncate">{title}</h2>
            <span
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0"
              style={{
                color: label.color,
                backgroundColor: label.color + '14',
                borderColor: label.color + '30',
              }}
            >
              {label.text}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={prevStep}
            disabled={!hasPrev}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-black/10 text-dark text-sm font-semibold hover:bg-light transition-all disabled:opacity-40 disabled:cursor-default shadow-soft"
          >
            <ChevronLeft size={16} />
            Назад
          </button>
          <button
            onClick={nextStep}
            disabled={!hasNext}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-black/10 text-dark text-sm font-semibold hover:bg-light transition-all disabled:opacity-40 disabled:cursor-default shadow-soft"
          >
            Дальше
            <ChevronRight size={16} />
          </button>
          <button
            onClick={close}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-black/10 text-dark hover:bg-light transition-all shadow-soft"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex items-center justify-between gap-2 px-4 py-3 border-t border-black/5 bg-white shrink-0">
        <button
          onClick={prevStep}
          disabled={!hasPrev}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white border border-black/10 text-dark text-sm font-semibold hover:bg-light transition-all disabled:opacity-40 disabled:cursor-default"
        >
          <ChevronLeft size={16} />
          Назад
        </button>
        <button
          onClick={nextStep}
          disabled={!hasNext}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white border border-black/10 text-dark text-sm font-semibold hover:bg-light transition-all disabled:opacity-40 disabled:cursor-default"
        >
          Дальше
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
