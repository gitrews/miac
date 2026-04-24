import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import WidgetShowcase from './WidgetShowcase'

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

// --- Step 1 data ---
const mobileSlides = [
  { src: './images/step1-mp-1.png', caption: 'Главный экран регистратуры с кнопкой «ЗАНЯТЬ ОЧЕРЕДЬ»' },
  { src: './images/step1-mp-2.png', caption: 'Ввод ФИО пациента' },
  { src: './images/step1-mp-3.png', caption: 'Подтверждение записи с прогнозируемым временем ожидания' },
  { src: './images/step1-mp-4.png', caption: 'Экран талона в очереди с номером и временем ожидания' },
]

const terminalSlides = [
  { src: './images/step1-term-1.jpg', caption: 'Выбор услуги (диспансеризация, профосмотр, справки)' },
  { src: './images/step1-term-2.jpg', caption: 'Ввод ФИО через экранную клавиатуру' },
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

// --- Step 2 data — Widget ---
const widgetImages = [
  './images/widgets/WidgetContent1.png',
  './images/widgets/WidgetContent2.png',
  './images/widgets/WidgetContent.png',
  './images/widgets/agentCompact.png',
]

const step2Benefits = [
  'Виджет на рабочем столе — не нужно открывать браузер',
  'Один клик для вызова пациента в окно',
  'Автоматическое обновление статуса на ТВ-экране',
  'Синхронизация с мобильным приложением пациента',
]

// --- Step 3 data — Notifications ---
const step3MobileSlides = [
  { src: './images/screens/step3-mp-waiting.jpg', caption: 'Мобильное приложение — статус «Ожидание вызова» с прогнозируемым временем' },
  { src: './images/screens/step3-mp-notification.png', caption: 'Push-уведомление «Ваша очередь!» — призыв подойти к окну' },
]

const step3TVSlides = [
  { src: './images/screens/step3-tv-calling.jpg', caption: 'ТВ-экран в зале ожидания — голосовой и экранный вызов пациента по имени' },
  { src: './images/step3/tv-call.gif', caption: 'Анимация вызова пациента на ТВ-экране' },
]

const step3TVBenefits = [
  'Персонализированный вызов по имени-отчеству (без номеров талонов)',
  'Голосовое оповещение с номером окна и именем пациента',
  'Отображение очереди и прогнозируемого времени ожидания',
]

const step3Benefits = [
  'Push-уведомление на смартфон при вызове',
  'Голосовой вызов по имени-отчеству на ТВ-экране',
  'Экранное отображение номера окна и имени пациента',
  'Возможность ответить «Я иду» прямо из уведомления',
]

// --- Step 4 data — MIS ECP ---
const step4Slides = [
  { src: './images/mis-registrar-select-patient.jpg', caption: 'МИС ЕЦП — выбор пациента из очереди регистратуры' },
  { src: './images/mis-registrar-select-service.jpg', caption: 'Выбор услуги: профосмотр, диспансеризация, справки' },
  { src: './images/mis-registrar-service-form.jpg', caption: 'Форма оформления услуги с данными пациента' },
  { src: './images/mis-registrar-queue-success.jpg', caption: 'Подтверждение записи в очередь — талон создан' },
]

const step4Benefits = [
  'Единое окно оформления всех услуг профосмотра',
  'Автоматическая привязка талона к медицинской карте',
  'Формирование направлений на исследования и анализы',
  'Интеграция с лабораторией и диагностическим оборудованием',
]

// --- Step 5 data — Completion ---
const step5Slides = [
  { src: './images/widget-serving.png', caption: 'Виджет оператора — статус «Обслуживание завершено»' },
  { src: './images/mis-registrar-queue-success.jpg', caption: 'МИС ЕЦП — подтверждение завершения регистратуры' },
]

const step5Benefits = [
  'Виджет фиксирует время завершения обслуживания',
  'Автоматическое архивирование талона регистратуры',
  'Пациент получает направление в кабинет врача',
  'МИС формирует маршрут для следующего этапа',
]

// --- Step 6 — Integration API info ---
const integrationSteps = [
  { label: '1. МИС ЕЦП формирует маршрут пациента', desc: 'Система определяет кабинет, врача и услуги для профосмотра.' },
  { label: '2. API-запрос во «ВнеОчереди»', desc: 'POST /integration/api/v1/customer/appointments/create — создание записи с параметрами officeId, lineId, serviceId, timeSlotId.' },
  { label: '3. Создание предварительной записи', desc: 'ВнеОчереди создаёт электронный талон с shortCode (например, С7Я6) и возвращает appointment.id.' },
  { label: '4. Синхронизация статусов', desc: 'При изменении статуса в МИС — обновление через API в реальном времени.' },
]

const integrationBenefits = [
  'Автоматическая запись в нужную очередь без участия регистратора',
  'Единый талон от регистратуры до кабинета врача',
  'Прогнозируемое время ожидания для каждого этапа',
  'Снижение человеческого фактора и ошибок маршрутизации',
]

// --- Step 7 data — Doctor call ---
const step7Slides = [
  { src: './images/screens/step2-widget-awaiting.jpg', caption: 'Врач видит очередь пациентов в виджете «ВнеОчереди»' },
  { src: './images/screens/step2-widget-calling.jpg', caption: 'Врач вызывает пациента — статус меняется на «Вызов»' },
  { src: './images/screens/step3-tv-calling.jpg', caption: 'ТВ-экран перед кабинетом — голосовой вызов пациента по имени' },
]

const step7Benefits = [
  'Врач вызывает пациента одним кликом в виджете',
  'Автоматическое отображение вызова на ТВ-экране перед кабинетом',
  'Push-уведомление в мобильное приложение пациента',
  'Синхронизация статуса между регистратурой и кабинетом',
]

// --- Step 8 data — Doctor notification ---
const step8Slides = [
  { src: './images/screens/step3-mp-waiting.jpg', caption: 'Мобильное приложение — статус «Ожидание вызова в кабинет»' },
  { src: './images/screens/step3-mp-notification.png', caption: 'Push-уведомление «Ваша очередь!» — призыв войти в кабинет' },
]

const step8Benefits = [
  'Push-уведомление на смартфон при вызове в кабинет',
  'ТВ-экран перед кабинетом показывает имя пациента и номер кабинета',
  'Голосовое оповещение по имени-отчеству',
  'Пациент может подтвердить, что идёт, прямо в приложении',
]

// --- Step 9 data — Doctor exam ---
const step9Slides = [
  { src: './images/mis-registrar-exam-form.jpg', caption: 'МИС ЕЦП — форма осмотра врача: жалобы, анамнез, диагноз' },
  { src: './images/mis-registrar-extra-checkups.jpg', caption: 'Назначение дополнительных исследований и консультаций' },
]

const step9Benefits = [
  'Электронная форма профосмотра с шаблонами и подсказками',
  'Автоматическое формирование заключения профосмотра',
  'Интеграция с лабораторией — результаты подтягиваются автоматически',
  'Электронная подпись врача на заключении',
]

// --- Step 10 data — Final completion ---
const step10Slides = [
  { src: './images/widget-serving.png', caption: 'Виджет «ВнеОчереди» — завершение обслуживания, статус «Архив»' },
  { src: './images/mis-registrar-extra-checkups.jpg', caption: 'МИС ЕЦП — завершение профосмотра, направления на доп. обследования' },
]

const step10Benefits = [
  'Врач завершает обслуживание в виджете — талон архивируется',
  'МИС фиксирует завершение профосмотра в электронной карте',
  'Автоматическое формирование отчётности для Росздравнадзора',
  'Пациент получает заключение профосмотра в личном кабинете',
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

        <div className="overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex-1 min-w-0 w-full" style={{ maxWidth: width }}>
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

function BenefitsCard({ title, color, benefits }: { title: string; color: string; benefits: string[] }) {
  return (
    <div className="rounded-xl bg-white border p-6" style={{ borderColor: `${color}40` }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-base font-semibold" style={{ color }}>{title}</h3>
      </div>
      <ul className="space-y-3">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}

function InfoNote({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 flex items-start gap-3" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}40` }}>
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}20` }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">
        <span className="font-semibold" style={{ color }}>{title}:</span>{' '}{children}
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
            {/* ==================== STEP 1 ==================== */}
            {step === 1 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Пациент записывается в очередь регистратуры с помощью мобильного приложения «МИАЦ ЯНАО» или с помощью терминала, установленного в медицинской организации.
                </p>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#E91E8C]">Мобильное приложение «МИАЦ ЯНАО»</h3>
                    </div>
                    <Carousel slides={mobileSlides} width={250} />
                  </div>
                  <div className="hidden lg:block w-px bg-slate-200 self-stretch" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#3A9BD9] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                          <h3 className="text-base font-semibold text-[#3A9BD9]">Терминал самозаписи</h3>
                    </div>
                    <Carousel slides={terminalSlides} width={1100} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Мобильное приложение «МИАЦ ЯНАО»" color="#E91E8C" benefits={mobileBenefits} />
                  <BenefitsCard title="Терминал самозаписи" color="#3A9BD9" benefits={terminalBenefits} />
                </div>
                <InfoNote color="#E91E8C" title="Примечание">
                  Указание при записи своих персональных данных является необязательной опцией, но позволяет избавиться от бумажных талонов.
                </InfoNote>
              </div>
            )}

            {/* ==================== STEP 2 ==================== */}
            {step === 2 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Регистратор через виджет «ВнеОчереди» на рабочем столе вызывает пациента в окно. Система автоматически обновляет статус на ТВ-экране и отправляет push-уведомление в мобильное приложение пациента.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#E91E8C]">Виджет оператора «ВнеОчереди» поверх МИС</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Виджет отображается поверх интерфейса МИС ЕЦП. Регистратору и врачу не нужно переключаться между программами — управление очередью всегда под рукой.
                  </p>
                  <WidgetShowcase images={widgetImages} interval={3000} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Виджет оператора" color="#E91E8C" benefits={step2Benefits} />
                  <BenefitsCard title="ТВ-экран и мобильное приложение" color="#3A9BD9" benefits={step3TVBenefits} />
                </div>
              </div>
            )}

            {/* ==================== STEP 3 ==================== */}
            {step === 3 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Пациент получает уведомление о вызове через push в мобильном приложении «ВнеОчереди» и видит свой вызов на ТВ-экране в зале ожидания. Голосовой вызов производится по имени и отчеству.
                </p>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#E91E8C]">Мобильное приложение «ВнеОчереди»</h3>
                    </div>
                    <Carousel slides={step3MobileSlides} width={250} />
                  </div>
                  <div className="hidden lg:block w-px bg-slate-200 self-stretch" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#3A9BD9] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#3A9BD9]">ТВ-экран вызова</h3>
                    </div>
                    <Carousel slides={step3TVSlides} width={700} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Уведомления пациенту" color="#E91E8C" benefits={step3Benefits} />
                  <BenefitsCard title="ТВ-экран вызова" color="#3A9BD9" benefits={step3TVBenefits} />
                </div>
              </div>
            )}

            {/* ==================== STEP 4 ==================== */}
            {step === 4 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Регистратор в МИС ЕЦП выбирает пациента из очереди, оформляет услуги профосмотра, формирует направления на исследования и привязывает электронный талон к медицинской карте.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#0052CC] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#0052CC]">Интерфейс МИС ЕЦП — оформление услуг</h3>
                  </div>
                  <Carousel slides={step4Slides} width={700} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Оформление в МИС ЕЦП" color="#0052CC" benefits={step4Benefits} />
                  <InfoNote color="#0052CC" title="Интеграция">
                    Данные о записи автоматически синхронизируются между МИС ЕЦП и «ВнеОчередию» через API. Электронный талон становится частью медицинской карты пациента.
                  </InfoNote>
                </div>
              </div>
            )}

            {/* ==================== STEP 5 ==================== */}
            {step === 5 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Регистратор завершает обслуживание пациента. Виджет «ВнеОчереди» переводит талон в статус «Обслуживание завершено» и архивирует его. Пациент направляется в кабинет врача для профосмотра.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#E91E8C]">Завершение обслуживания в регистратуре</h3>
                  </div>
                  <Carousel slides={step5Slides} width={700} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Виджет «ВнеОчереди»" color="#E91E8C" benefits={step5Benefits} />
                  <InfoNote color="#E91E8C" title="Маршрутизация">
                    После завершения в регистратуре МИС ЕЦП автоматически формирует маршрут пациента и передаёт данные во «ВнеОчереди» для следующего этапа — вызова в кабинет врача.
                  </InfoNote>
                </div>
              </div>
            )}

            {/* ==================== STEP 6 ==================== */}
            {step === 6 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Интеграция через API ВнеОчереди: МИС ЕЦП автоматически передаёт данные о маршруте пациента — кабинет врача, услуги профосмотра и временной слот — создавая предварительную запись в электронную очередь без участия регистратора.
                </p>

                <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-6 overflow-x-auto">
                  <h3 className="text-sm font-semibold text-[#2EC4B6] mb-4">Пример API-запроса (МИС → ВнеОчереди)</h3>
                  <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`POST /integration/api/v1/customer/appointments/create
Content-Type: application/json

{
  "apiKey": "3dfdc1ed-ce72-46d1-89c9-376df0f83237",
  "customerId": "e3c53333-2552-46ce-b2de-752c094b9cf6",
  "officeId": "0fcab951-92e8-49a0-af78-f95c459f74bc",
  "lineId": "33add1ef-2d42-4d67-b098-56d87a2f988f",
  "serviceId": "da204cee-98ad-4a3e-872d-9f9b7c5d89e7",
  "timeSlotId": 123245346346,
  "units": 1,
  "deviceType": "Browser"
}`}
                  </pre>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-400">
                      <span className="text-[#2EC4B6] font-semibold">Ответ:</span>{' '}
                      appointment.id, shortCode (например, «С7Я6»), дата и время записи.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-slate-900">Этапы интеграции</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrationSteps.map((item, i) => (
                      <div key={i} className="rounded-xl bg-white border border-slate-200 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#2EC4B6]/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#2EC4B6]">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.label}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <BenefitsCard title="Преимущества интеграции МИС → ВнеОчереди" color="#2EC4B6" benefits={integrationBenefits} />

                <InfoNote color="#2EC4B6" title="API ВнеОчереди">
                  Полная документация:{' '}
                  <a href="https://docs.ocheredi.com/api/" target="_blank" rel="noopener noreferrer" className="underline text-[#0052CC]">
                    docs.ocheredi.com/api/
                  </a>
                  {' '}— endpoints для создания, изменения и отмены записей, получения статусов очереди и статистики.
                </InfoNote>
              </div>
            )}

            {/* ==================== STEP 7 ==================== */}
            {step === 7 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Врач через виджет «ВнеОчереди» на рабочем столе вызывает пациента в кабинет. Система автоматически обновляет статус на ТВ-экране перед кабинетом и отправляет push-уведомление в мобильное приложение.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#E91E8C]">Вызов в кабинет — виджет врача «ВнеОчереди»</h3>
                  </div>
                  <Carousel slides={step7Slides} width={700} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Виджет врача" color="#E91E8C" benefits={step7Benefits} />
                  <InfoNote color="#E91E8C" title="API интеграции — порядок вызовов">
                    <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700">
                      <li><span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#E91E8C]">GET /doctor/lines</span> — список кабинетов врача</li>
                      <li><span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#E91E8C]">GET /process/activeTalon</span> — текущий талон в кабинете</li>
                      <li><span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#E91E8C]">POST /process/call</span> — вызов в кабинет (статус: вызов)</li>
                      <li><span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#E91E8C]">POST /process/start</span> — начало осмотра (статус: в кабинете)</li>
                      <li><span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#E91E8C]">POST /process/finish</span> — завершение осмотра</li>
                    </ol>
                    <p className="mt-3 text-xs text-slate-500">
                      Все статусы синхронизируются с ТВ-экраном перед кабинетом и мобильным приложением.
                      {' '}<a href="https://docs.ocheredi.com/api/" target="_blank" rel="noopener noreferrer" className="underline text-[#0052CC]">docs.ocheredi.com/api/</a>
                    </p>
                  </InfoNote>
                </div>
              </div>
            )}

            {/* ==================== STEP 8 ==================== */}
            {step === 8 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Пациент получает push-уведомление в мобильном приложении «ВнеОчереди» и видит свой вызов на ТВ-экране в зале ожидания перед кабинетом врача. Голосовой вызов по имени-отчеству.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#E91E8C]">Уведомление о вызове в кабинет</h3>
                  </div>
                  <Carousel slides={step8Slides} width={700} />
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#3A9BD9] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#3A9BD9]">ТВ-экран вызова — анимация</h3>
                  </div>
                  <div className="overflow-hidden rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src="./images/step3/tv-call.gif"
                      alt="ТВ-экран вызова — анимация"
                      className="w-full h-auto object-contain mx-auto"
                      style={{ maxHeight: '480px' }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 text-center mt-3">
                    Голосовой и экранный вызов пациента в кабинет по имени-отчеству
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Уведомления пациенту" color="#E91E8C" benefits={step8Benefits} />
                  <InfoNote color="#E91E8C" title="Важно">
                    Уведомление в кабинет использует тот же механизм, что и в регистратуре, но с персонализацией под конкретного врача и кабинет.
                  </InfoNote>
                </div>
              </div>
            )}

            {/* ==================== STEP 9 ==================== */}
            {step === 9 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Врач проводит осмотр пациента в МИС ЕЦП: заполняет форму профосмотра, вносит результаты исследований, оформляет заключение и назначения. Все данные сохраняются в электронной медицинской карте.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#0052CC] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#0052CC]">Интерфейс врача — осмотр в МИС ЕЦП</h3>
                  </div>
                  <Carousel slides={step9Slides} width={700} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Осмотр в МИС ЕЦП" color="#0052CC" benefits={step9Benefits} />
                  <InfoNote color="#0052CC" title="Заключение">
                    По завершении осмотра МИС формирует заключение профосмотра с электронной подписью врача. Данные автоматически передаются в Росздравнадзор.
                  </InfoNote>
                </div>
              </div>
            )}

            {/* ==================== STEP 10 ==================== */}
            {step === 10 && (
              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
                  Врач завершает обслуживание пациента через виджет «ВнеОчереди». Система архивирует талон, обновляет статус в очереди и формирует отчётность. МИС ЕЦП фиксирует завершение профосмотра и выдаёт направления на дополнительные обследования при необходимости.
                </p>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[#E91E8C] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#E91E8C]">Завершение профосмотра — виджет и МИС</h3>
                  </div>
                  <Carousel slides={step10Slides} width={700} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BenefitsCard title="Завершение в «ВнеОчереди» и МИС" color="#E91E8C" benefits={step10Benefits} />
                  <InfoNote color="#E91E8C" title="Отчётность">
                    По завершении профосмотра система автоматически формирует отчёты для Росздравнадзора, статистику загруженности кабинетов и аналитику по времени обслуживания.
                  </InfoNote>
                </div>
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
      </div>
    </div>
  )
}
