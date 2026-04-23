import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const stepLabels: Record<number, { text: string; color: string; bg: string; border: string }> = {
  1: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  2: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  3: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  4: { text: 'ЕЦП МИС', color: '#0052CC', bg: 'rgba(0,82,204,0.12)', border: 'rgba(0,82,204,0.24)' },
  5: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  6: { text: 'ЕЦП → ВнеОчереди', color: '#2EC4B6', bg: 'rgba(46,196,182,0.12)', border: 'rgba(46,196,182,0.24)' },
  7: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  8: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  9: { text: 'ЕЦП МИС', color: '#0052CC', bg: 'rgba(0,82,204,0.12)', border: 'rgba(0,82,204,0.24)' },
  10: { text: 'ВнеОчереди', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
}

const stepImages: Record<number, string[]> = {
  1: ['./images/step1-mp-1.png', './images/step1-mp-2.png', './images/step1-mp-3.png', './images/step1-mp-4.png'],
  2: ['./images/step2-widget-1.jpg', './images/step2-widget-2.jpg', './images/step2-widget-3.jpg', './images/step2-mis-bg.png'],
  3: ['./images/step3/mp-awaiting.jpg', './images/step3/mp-notification.png'],
  4: ['./images/step4/page-3.png', './images/step4/page-4.png', './images/step4/page-5.png', './images/step4/page-6.png'],
  5: ['./images/mis-registrar-queue-success.jpg', './images/widget-serving.png'],
  6: ['./images/mis-registrar-schedule.jpg', './images/mis-registrar-exam-form.jpg'],
  7: ['./images/step3/mp-awaiting.jpg', './images/widget-called.png'],
  8: ['./images/step3/mp-notification.png', './images/widget-awaiting-call.png'],
  9: ['./images/step4/page-7.png', './images/step4/page-8.png', './images/step4/page-9.png', './images/step4/page-10.png'],
  10: ['./images/mis-registrar-extra-checkups.jpg', './images/step4/page-11.png'],
}

const stepDescriptions: Record<number, string> = {
  1: 'Пациент записывается на профосмотр через систему «ВнеОчереди». Создаётся электронный талон с уникальным номером. Регистратор видит новую запись в рабочем месте оператора.',
  2: 'Регистратор вызывает пациента в окно через рабочее место оператора. Информация о вызове отображается на ТВ-экране в зале ожидания.',
  3: 'Пациент получает уведомление о вызове через ТВ-экран в зале ожидания и SMS-оповещение на мобильный телефон.',
  4: 'Регистратор оформляет услуги в МИС ЕЦП, привязывает талон к медицинской карте пациента, формирует направления на исследования.',
  5: 'Завершение первичного этапа обслуживания в регистратуре. Пациент направляется в кабинет врача для прохождения профосмотра.',
  6: 'Данные о записи на профосмотр синхронизируются из МИС ЕЦП в систему «ВнеОчереди» для управления очередью в кабинетах врачей.',
  7: 'Врач вызывает пациента в кабинет через систему «ВнеОчереди». Статус обновляется на ТВ-экране и в мобильном приложении.',
  8: 'Пациент получает уведомление о готовности к приёму врача через ТВ-экран и push-уведомление в мобильном приложении.',
  9: 'Врач проводит осмотр пациента, вносит данные в МИС ЕЦП, оформляет заключение профосмотра и назначения.',
  10: 'Врач завершает обслуживание пациента. Система обновляет статус в очереди, архивирует талон и формирует отчётность.',
}

interface StepModalProps {
  step: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function StepModal({ step, onClose, onNext, onPrev }: StepModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    },
    [onClose, onNext, onPrev]
  )

  useEffect(() => {
    if (step !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [step, handleKeyDown])

  return (
    <AnimatePresence>
      {step !== null && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="absolute inset-0 flex flex-col bg-white"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md flex-shrink-0">
              <div className="min-w-0">
                <div className="text-xs font-bold tracking-wider uppercase text-primary-600 mb-1">
                  Шаг {step}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">
                    {stepTitles[step]}
                  </h2>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap"
                    style={{
                      color: stepLabels[step]?.color,
                      backgroundColor: stepLabels[step]?.bg,
                      borderColor: stepLabels[step]?.border,
                    }}
                  >
                    {stepLabels[step]?.text}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={onPrev}
                  disabled={step <= 1}
                  className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-default transition-colors"
                  aria-label="Назад"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={onNext}
                  disabled={step >= 10}
                  className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-default transition-colors"
                  aria-label="Дальше"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50">
              <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
                <p className="text-slate-700 leading-relaxed mb-8 max-w-3xl">
                  {stepDescriptions[step]}
                </p>

                {stepImages[step] && stepImages[step].length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {stepImages[step].map((src, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm"
                      >
                        <div className="aspect-video bg-slate-100">
                          <img
                            src={src}
                            alt={`${stepTitles[step]} — изображение ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="px-4 py-3 text-xs text-slate-500 font-medium">
                          Макет экрана {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile nav buttons */}
                <div className="flex items-center justify-between gap-4 mt-8 sm:hidden">
                  <button
                    onClick={onPrev}
                    disabled={step <= 1}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium disabled:opacity-40 disabled:cursor-default"
                  >
                    <ChevronLeft size={16} /> Назад
                  </button>
                  <button
                    onClick={onNext}
                    disabled={step >= 10}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium disabled:opacity-40 disabled:cursor-default"
                  >
                    Дальше <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
