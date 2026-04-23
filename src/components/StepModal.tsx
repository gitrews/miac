import { useState, useEffect, useCallback } from 'react'
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

// Step 1 custom content data
const mobileSlides = [
  { src: './images/step1-mp-1.png', caption: 'Главный экран регистратуры с кнопкой «ЗАНЯТЬ ОЧЕРЕДЬ»' },
  { src: './images/step1-mp-2.png', caption: 'Ввод ФИО пациента (Гончаров Андрей Сергеевич)' },
  { src: './images/step1-mp-3.png', caption: 'Модальное окно подтверждения «Отлично!» с оставшимся временем ожидания' },
  { src: './images/step1-mp-4.png', caption: 'Экран талона в очереди: номер Н62, прогнозируемое время ожидания' },
]

const terminalSlides = [
  { src: './images/step1-term-1.jpg', caption: 'Выбор услуги (диспансеризация, профосмотр, справки)' },
  { src: './images/step1-term-2.jpg', caption: 'Ввод ФИО через экранную клавиатуру (Иванов Иван Иванович)' },
  { src: './images/step1-term-3.jpg', caption: 'Экран успешной записи с QR-кодом и временем ожидания' },
]

const mobileBenefits = [
  'Запись в медицинской организации или в заданном радиусе',
  'Получение уведомлений о вызове на смартфон',
  'Отслеживание времени ожидания вызова и всего маршрута',
  'Исключение очереди к терминалу',
]

const terminalBenefits = [
  'Выбор причины обращений',
  'Ввод своих персональных данных (опционально)',
  'Печать талона с кодом записи (опционально)',
  'Вызов пациента отобразится на экране вызова (ТВ)',
]

interface StepModalProps {
  step: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function Carousel({ slides, width }: { slides: { src: string; caption: string }[]; width: number }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative flex items-center gap-3 w-full justify-center">
        <button
          onClick={prev}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex-1 max-w-full" style={{ maxWidth: width }}>
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <img
                  src={slide.src}
                  alt={slide.caption}
                  className="w-full h-auto object-contain mx-auto"
                  style={{ maxHeight: '480px' }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          aria-label="Следующий слайд"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-primary-600' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-sm text-slate-500 text-center min-h-[20px] max-w-md">
        {slides[current]?.caption}
      </p>
    </div>
  )
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

  if (step === null) return null

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
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
            {step === 1 ? (
              /* Custom Step 1 Layout */
              <div className="space-y-10">
                {/* Description */}
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Пациент записывается в очередь регистратуры с помощью мобильного приложения «МИАЦ ЯНАО» или с помощью терминала, установленного в медицинской организации.
                </p>

                {/* Two-column carousel layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left — Mobile app */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#E91E8C]">
                        Мобильное приложение «МИАЦ ЯНАО»
                      </h3>
                    </div>
                    <Carousel slides={mobileSlides} width={250} />
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden lg:block w-px bg-slate-200 self-stretch" />

                  {/* Right — Terminal */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#3A9BD9] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#3A9BD9]">
                        Терминал самозаписи
                      </h3>
                    </div>
                    <Carousel slides={terminalSlides} width={820} />
                  </div>
                </div>

                {/* Advantages grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile app benefits */}
                  <div className="rounded-xl bg-white border border-[#E91E8C]/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded bg-[#E91E8C]/20 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#E91E8C]">
                        Мобильное приложение «МИАЦ ЯНАО»
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {mobileBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E91E8C] mt-1.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Terminal benefits */}
                  <div className="rounded-xl bg-white border border-[#3A9BD9]/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded bg-[#3A9BD9]/20 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3A9BD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#3A9BD9]">
                        Терминал самозаписи
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {terminalBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3A9BD9] mt-1.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pink info note */}
                <div className="rounded-xl bg-[#E91E8C]/10 border border-[#E91E8C]/30 p-5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E91E8C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="font-semibold text-[#E91E8C]">Примечание:</span>{' '}
                    Указание при записи своих персональных данных является необязательной опцией, но позволяет избавиться от бумажных талонов.
                  </p>
                </div>
              </div>
            ) : (
              /* Default layout for steps 2-10 */
              <>
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
              </>
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
      </div>
    </div>
  )
}
