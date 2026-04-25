import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

const stepLabels: Record<number, { text: string; color: string; bg?: string; border?: string; split?: boolean }> = {
  1: { text: 'Пациент', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  2: { text: 'Регистратор', color: '#2EC4B6', bg: 'rgba(46,196,182,0.12)', border: 'rgba(46,196,182,0.24)' },
  3: { text: 'Пациент', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  4: { text: 'Регистратор', color: '#2EC4B6', bg: 'rgba(46,196,182,0.12)', border: 'rgba(46,196,182,0.24)' },
  5: { text: 'Регистратор', color: '#2EC4B6', bg: 'rgba(46,196,182,0.12)', border: 'rgba(46,196,182,0.24)' },
  6: { text: 'ЕЦП МИС + ВнеОчереди', color: '#0052CC', split: true },
  7: { text: 'Врач', color: '#3A9BD9', bg: 'rgba(58,155,217,0.12)', border: 'rgba(58,155,217,0.24)' },
  8: { text: 'Пациент', color: '#E91E8C', bg: 'rgba(233,30,140,0.12)', border: 'rgba(233,30,140,0.24)' },
  9: { text: 'Врач', color: '#3A9BD9', bg: 'rgba(58,155,217,0.12)', border: 'rgba(58,155,217,0.24)' },
  10: { text: 'Врач', color: '#3A9BD9', bg: 'rgba(58,155,217,0.12)', border: 'rgba(58,155,217,0.24)' },
}

const mobileSlides = [
  { src: '/images/screens/step1-mp-1.png', caption: 'Главный экран приложения МИАЦ ЯНАО для записи на профосмотр' },
  { src: '/images/screens/step1-mp-2.png', caption: 'Ввод данных пациента для постановки в электронную очередь' },
  { src: '/images/screens/step1-mp-3.png', caption: 'Подтверждение записи с прогнозом времени ожидания' },
  { src: '/images/screens/step1-mp-4.png', caption: 'Экран талона с номером очереди и ожидаемым временем вызова' },
]

const terminalSlides = [
  { src: '/images/screens/step1-term-1.jpg', caption: 'Терминал самозаписи: выбор сценария обращения' },
  { src: '/images/screens/step1-term-2.jpg', caption: 'Терминал: ввод данных пациента через экранную клавиатуру' },
  { src: '/images/screens/step1-term-3.jpg', caption: 'Терминал: печать талона и подтверждение постановки в очередь' },
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

const widgetImages = [
  { src: '/images/widgets/Widget0.png', className: 'w-2/5 ml-auto' },
  { src: '/images/widgets/WidgetContent1.png', className: 'w-5/6 ml-auto' },
  { src: '/images/widgets/WidgetContent2.png', className: 'w-5/6 ml-auto' },
  { src: '/images/widgets/agentCompact.png', className: 'w-2/5 ml-auto' },
  { src: '/images/widgets/WidgetContent.png', className: 'w-5/6 ml-auto' },
]

const queueBenefits = [
  'Виджет всегда доступен поверх интерфейса МИС',
  'Один клик на вызов следующего пациента',
  'Синхронное обновление статуса на ТВ-экране',
  'Push-уведомление уходит пациенту автоматически',
]

const queueSideBenefits = [
  'Регистратор и врач не переключаются между окнами',
  'Очередь видна в компактном рабочем виджете',
  'Смена статуса занимает секунды',
  'Карусель можно остановить кликом по индикатору',
]

const notificationSlides = [
  { src: '/images/screens/step3-mp-waiting.jpg', caption: 'Мобильное приложение: пациент ожидает вызова и видит ориентир по времени' },
  { src: '/images/screens/step3-mp-notification.png', caption: 'Push-уведомление сообщает, что пациенту нужно подойти к окну или кабинету' },
]

const notificationBenefits = [
  'Push-уведомление приходит прямо на смартфон',
  'Пациент видит статус вызова без бумажного талона',
  'Текст вызова синхронизирован с ТВ-экраном',
  'Маршрут читается одинаково на всех каналах',
]

const tvBenefits = [
  'На экране видно имя пациента и точку вызова',
  'Оповещение можно показывать в зоне ожидания',
  'Видео демонстрирует живой сценарий вызова',
  'Темп воспроизведения ускорен для плавного показа',
]

const step4Slides = [
  { src: '/images/step4/page-3.png', caption: 'Выбор пациента из потока в МИС ЕЦП' },
  { src: '/images/step4/page-5.png', caption: 'Открытие карточки пациента для оформления' },
  { src: '/images/step4/page-6.png', caption: 'Подбор и добавление услуг профосмотра' },
  { src: '/images/step4/page-8.png', caption: 'Проверка состава оформляемых услуг' },
  { src: '/images/step4/page-10.png', caption: 'Подтверждение оформления и сохранение в МИС' },
  { src: '/images/step4/page-14.png', caption: 'Финальный экран завершения оформления' },
]

const completionBenefits = [
  'Используются те же рабочие экраны, что и на шаге вызова',
  'Сотрудник завершает действие в том же виджете',
  'Переход к следующему этапу маршрута остаётся прозрачным',
  'Этот экран позже можно скорректировать без смены структуры',
]

const integrationSteps = [
  { label: '1. Создание или обновление пациента', desc: 'МИС создаёт или обновляет пациента в системе «ВнеОчереди». Возвращается customerId.' },
  { label: '2. Запись в очередь', desc: 'МИС отправляет customerId и список услуг. Система создаёт позицию в очереди.' },
]

const integrationBenefits = [
  'Автоматическая запись в живую очередь без участия регистратора',
  'Снижение ошибок при ручной маршрутизации пациента',
]

interface StepModalProps {
  step: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

interface Slide {
  src: string
  caption: string
}

function renderLabel(label: { text: string; color: string; bg?: string; border?: string; split?: boolean }) {
  if (label.split) {
    return (
      <span
        className="text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap text-slate-900"
        style={{
          background: 'linear-gradient(90deg, rgba(0,82,204,0.12) 0%, rgba(0,82,204,0.12) 48%, rgba(233,30,140,0.12) 52%, rgba(233,30,140,0.12) 100%)',
          borderColor: 'rgba(99,102,241,0.18)',
        }}
      >
        <span style={{ color: '#0052CC' }}>ЕЦП МИС</span>
        <span className="mx-1 text-slate-500">+</span>
        <span style={{ color: '#E91E8C' }}>ВнеОчереди</span>
      </span>
    )
  }

  return (
    <span
      className="text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap"
      style={{
        color: label.color,
        backgroundColor: label.bg,
        borderColor: label.border,
      }}
    >
      {label.text}
    </span>
  )
}

function Carousel({
  slides,
  frameMaxWidth,
  frameHeight,
  className = '',
  slideClassName = 'p-4 md:p-5',
  imageClassName = 'h-full w-auto max-w-full object-contain mx-auto',
  overlayControls = false,
  autoPlayDelay = 2500,
}: {
  slides: Slide[]
  frameMaxWidth?: number
  frameHeight: number
  className?: string
  slideClassName?: string
  imageClassName?: string
  overlayControls?: boolean
  autoPlayDelay?: number
}) {
  const [current, setCurrent] = useState(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)
  const isAnimatingRef = useRef(false)
  const displaySlides = useMemo(
    () => (slides.length > 1 ? [...slides, slides[0]] : slides),
    [slides]
  )

  const next = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setIsTransitionEnabled(true)
    setCurrent((prev) => prev + 1)
    window.setTimeout(() => {
      isAnimatingRef.current = false
    }, 500)
  }, [slides.length])

  const prev = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setIsTransitionEnabled(true)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    window.setTimeout(() => {
      isAnimatingRef.current = false
    }, 500)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1 || !autoPlayEnabled) return

    let intervalId: number | undefined
    const timeout = window.setTimeout(() => {
      next()
      intervalId = window.setInterval(next, 6500)
    }, autoPlayDelay)

    return () => {
      window.clearTimeout(timeout)
      if (intervalId !== undefined) window.clearInterval(intervalId)
    }
  }, [next, slides.length, autoPlayEnabled, autoPlayDelay])

  const handlePrev = () => {
    setAutoPlayEnabled(false)
    prev()
  }

  const handleNext = () => {
    setAutoPlayEnabled(false)
    next()
  }

  return (
    <div className={`flex flex-col items-center gap-3 w-full ${className}`}>
      <div className={`relative w-full ${overlayControls ? '' : 'flex items-center gap-3 justify-center'}`}>
        {slides.length > 1 && !overlayControls && (
          <button
            onClick={handlePrev}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div
          className="overflow-hidden rounded-2xl bg-white border border-slate-200 flex-1 min-w-0 w-full shadow-sm"
          style={frameMaxWidth ? { maxWidth: frameMaxWidth } : undefined}
        >
          {slides.length > 1 && overlayControls && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm transition-colors"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm transition-colors"
                aria-label="Следующий слайд"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <div
            className="flex duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transitionProperty: isTransitionEnabled ? 'transform' : 'none',
            }}
            onTransitionEnd={() => {
              if (current === slides.length) {
                setIsTransitionEnabled(false)
                setCurrent(0)
              }
            }}
          >
            {displaySlides.map((slide, index) => (
              <div
                key={`${slide.src}-${index}`}
                className={`flex-shrink-0 w-full flex items-center justify-center bg-slate-50 ${slideClassName}`}
                style={{ height: frameHeight }}
              >
                <img
                  src={slide.src}
                  alt={slide.caption}
                  className={imageClassName}
                />
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && !overlayControls && (
          <button
            onClick={handleNext}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Следующий слайд"
          >
            <ChevronRight size={16} />
          </button>
        )}

      </div>

      {slides.length > 1 && (
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === current ? 'bg-primary-600' : 'bg-slate-300'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      <p className="text-sm text-slate-500 text-center min-h-[48px] max-w-2xl flex items-start justify-center">
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
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}



function SectionHeader({
  color,
  title,
  icon,
  className = '',
  titleClassName = '',
}: {
  color: string
  title: string
  icon: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${className}`}>
      <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <h3 className={`text-base font-semibold ${titleClassName}`} style={{ color }}>{title}</h3>
    </div>
  )
}

function DeviceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function StepVideo({ src, poster, frameHeight = 520, caption }: { src: string; poster: string; frameHeight?: number; caption?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = 1.1
    void video.play().catch(() => {})
  }, [src])

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm w-full">
        <div className="flex items-center justify-center bg-slate-50" style={{ height: frameHeight }}>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="h-full w-auto max-w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
      <div className="h-2.5" />
      {caption && (
        <p className="text-sm text-slate-500 text-center min-h-[48px] max-w-2xl flex items-start justify-center">
          {caption}
        </p>
      )}
    </div>
  )
}

function StepOneContent() {
  return (
    <div className="space-y-10">
      <p className="text-slate-700 leading-relaxed max-w-8xl text-base">
        Пациент записывается в очередь регистратуры через мобильное приложение «МИАЦ ЯНАО» или через терминал самозаписи в медицинской организации.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-start">
        <div className="w-full flex flex-col items-center justify-start">
          <SectionHeader
            color="#E91E8C"
            title="Мобильное приложение «МИАЦ ЯНАО»"
            icon={<DeviceIcon />}
            className="justify-center min-h-[40px]"
            titleClassName="whitespace-nowrap text-[15px] xl:text-base"
          />
          <Carousel
            slides={mobileSlides}
            frameHeight={520}
            className="justify-start"
            slideClassName="p-2 md:p-3"
            overlayControls
          />
        </div>
        <div className="w-full flex flex-col items-center justify-start">
          <SectionHeader
            color="#3A9BD9"
            title="Терминал самозаписи"
            icon={<MonitorIcon />}
            className="justify-center min-h-[40px]"
          />
          <Carousel
            slides={terminalSlides}
            frameHeight={520}
            className="justify-start"
            slideClassName="p-1.5 md:p-2"
            imageClassName="w-full h-full object-contain mx-auto"
            overlayControls
            autoPlayDelay={5750}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BenefitsCard title="Мобильное приложение" color="#E91E8C" benefits={mobileBenefits} />
        <BenefitsCard title="Терминал самозаписи" color="#3A9BD9" benefits={terminalBenefits} />
      </div>
    </div>
  )
}

function QueueWidgetContent({ actor }: { actor: 'регистратор' | 'врач' }) {
  const actorTitle = actor === 'регистратор' ? 'регистратора' : 'врача'
  const roleTitle = actor === 'регистратор' ? 'Регистратор' : 'Врач'
  const target = actor === 'регистратор' ? 'в окно' : 'в кабинет'

  return (
    <div className="space-y-10">
      <p className="text-slate-700 leading-relaxed max-w-4xl text-base">
        {roleTitle} через виджет «ВнеОчереди» вызывает пациента {target}. Виджет расположен поверх интерфейса МИС и не требует переключения между окнами.
      </p>

      <div className="max-w-6xl mx-auto">
        <SectionHeader color="#E91E8C" title={`Виджет ${actorTitle} «ВнеОчереди» поверх МИС`} icon={<MonitorIcon />} />
        <WidgetShowcase
          images={widgetImages}
          interval={3200}
          overlayLabel={`Виджет ${actorTitle} поверх МИС`}
          clickToAdvance
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BenefitsCard title={`Виджет ${actorTitle}`} color="#E91E8C" benefits={queueBenefits} />
        <BenefitsCard title="Сценарий вызова" color="#3A9BD9" benefits={queueSideBenefits} />
      </div>
    </div>
  )
}

function NotificationContent() {
  return (
    <div className="space-y-10">
      <p className="text-slate-700 leading-relaxed max-w-4xl text-base">
        Когда регистратор вызывает пациента, система «ВнеОчереди» автоматически направляет push-уведомление на смартфон пациента, отображает вызов на экранах в зоне ожидания и голосовым оповещением приглашает пациента в нужный кабинет, обращаясь по имени и отчеству.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-start">
        <div className="w-full flex flex-col items-center justify-start">
          <SectionHeader
            color="#3A9BD9"
            title="Экран вызова (ТВ)"
            icon={<MonitorIcon />}
            className="justify-center min-h-[40px]"
          />
          <StepVideo
            src="/images/step3/tv-call.mp4"
            poster="/images/screens/step3-tv-calling.jpg"
            frameHeight={520}
            caption="Видеосценарий вызова пациента по имени и точке обслуживания"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-start">
          <SectionHeader
            color="#E91E8C"
            title="Мобильное приложение"
            icon={<DeviceIcon />}
            className="justify-center min-h-[40px]"
            titleClassName="whitespace-nowrap text-[15px] xl:text-base"
          />
          <Carousel
            slides={notificationSlides}
            frameHeight={520}
            className="justify-start"
            slideClassName="p-2 md:p-3"
            overlayControls
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BenefitsCard title="Уведомление пациенту" color="#E91E8C" benefits={notificationBenefits} />
        <BenefitsCard title="Экран вызова (ТВ)" color="#3A9BD9" benefits={tvBenefits} />
      </div>
    </div>
  )
}

function MisContent({ title }: { title: string }) {
  return (
    <div className="space-y-8">
      <p className="text-slate-700 leading-relaxed max-w-4xl text-base">
        Скриншоты на этом шаге показываются крупнее и собраны из PDF-материала по процессу оформления в МИС ЕЦП.
      </p>

      <div className="max-w-[1180px] mx-auto">
        <SectionHeader color="#0052CC" title={title} icon={<DocumentIcon />} />
        <Carousel slides={step4Slides} frameMaxWidth={1120} frameHeight={700} />
      </div>
    </div>
  )
}

function CompletionContent({ title }: { title: string }) {
  return (
    <div className="space-y-10">
      <p className="text-slate-700 leading-relaxed max-w-4xl text-base">
        Для этого шага используются те же визуальные экраны, что и на шаге 2. Структура оставлена одинаковой, чтобы позже можно было быстро внести точечные корректировки.
      </p>

      <div className="max-w-6xl mx-auto">
        <SectionHeader color="#E91E8C" title={title} icon={<MonitorIcon />} />
        <WidgetShowcase images={widgetImages} interval={3200} overlayLabel={title} pauseAtIndex={2} />
      </div>

      <BenefitsCard title="Текущая версия экрана" color="#E91E8C" benefits={completionBenefits} />
    </div>
  )
}

function IntegrationContent() {
  return (
    <div className="space-y-10">
      <p className="text-slate-700 leading-relaxed max-w-3xl text-base">
        Интеграция МИС ЕЦП с системой электронной очереди «ВнеОчереди» позволяет автоматизировать запись пациента на профосмотр без участия регистратора. После оформления услуг в МИС система сама создаёт запись в электронную очередь, передавая ФИО пациента и перечень назначенных кабинетов.
      </p>

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-900">Этапы интеграции</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationSteps.map((item, i) => (
            <div key={item.label} className="rounded-xl bg-white border border-slate-200 p-5">
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
      <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(46,196,182,0.08)', border: '1px solid rgba(46,196,182,0.25)' }}>
        <h4 className="text-sm font-semibold text-[#2EC4B6] mb-3">Подготовка к интеграции</h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#2EC4B6' }} />
            <span><strong>Ключ доступа (accessKey)</strong> — предоставляется командой «ВнеОчереди» при подключении интеграции.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#2EC4B6' }} />
            <span><strong>Идентификаторы места, очереди и услуг</strong> (placeId, lineId, serviceId) — фиксированы для конкретной клиники</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#2EC4B6' }} />
            <span>Два API-вызова: создание пациента и запись в очередь.</span>
          </li>
        </ul>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Параметры запроса</h4>
        <ul className="space-y-1.5 text-xs text-slate-600">
          <li><code className="text-[#2EC4B6] font-mono">accessKey</code> — ключ доступа для аутентификации в API.</li>
          <li><code className="text-[#2EC4B6] font-mono">customerId</code> — идентификатор пациента. <code className="bg-slate-100 px-1 rounded">null</code> при создании нового.</li>
          <li><code className="text-[#2EC4B6] font-mono">externalId</code> — внешний идентификатор в МИС. <code className="bg-slate-100 px-1 rounded">null</code>, если не используется.</li>
          <li><code className="text-[#2EC4B6] font-mono">person.firstName</code> — имя пациента.</li>
          <li><code className="text-[#2EC4B6] font-mono">person.middleName</code> — отчество пациента.</li>
          <li><code className="text-[#2EC4B6] font-mono">person.lastName</code> — фамилия пациента.</li>
          <li><code className="text-[#2EC4B6] font-mono">person.phone</code> — номер телефона (необязательно).</li>
        </ul>
      </div>

      <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-6 overflow-x-auto">
        <h3 className="text-sm font-semibold text-[#2EC4B6] mb-4">Шаг 1. Создание или обновление пациента</h3>
        <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`POST /api/integration/customer/createOrUpdate
Content-Type: application/json

{
  "accessKey": "your-access-key",
  "customerId": null,
  "externalId": null,
  "person": {
    "firstName": "Иван",
    "middleName": "Иванович",
    "lastName": "Иванов",
    "phone": "+79991234567"
  }
}`}
        </pre>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Пример ответа</h4>
        <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-4 overflow-x-auto">
          <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "customerId": "0c52c445020145b40760d99f12000000"
}`}
          </pre>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Параметры запроса</h4>
        <ul className="space-y-1.5 text-xs text-slate-600">
          <li><code className="text-[#2EC4B6] font-mono">accessKey</code> — ключ доступа для аутентификации в API.</li>
          <li><code className="text-[#2EC4B6] font-mono">customerId</code> — идентификатор пациента, полученный на шаге 1.</li>
          <li><code className="text-[#2EC4B6] font-mono">placeId</code> — идентификатор места (кабинета), фиксированный для клиники.</li>
          <li><code className="text-[#2EC4B6] font-mono">lineId</code> — идентификатор очереди, фиксированный для клиники.</li>
          <li><code className="text-[#2EC4B6] font-mono">services</code> — массив услуг. Каждая услуга содержит <code className="bg-slate-100 px-1 rounded">serviceId</code> — название или идентификатор услуги.</li>
          <li><code className="text-[#2EC4B6] font-mono">deviceType</code> — тип устройства. <code className="bg-slate-100 px-1 rounded">Browser</code> для записи из МИС.</li>
          <li><code className="text-[#2EC4B6] font-mono">priority</code> — флаг приоритетной записи. <code className="bg-slate-100 px-1 rounded">false</code> по умолчанию.</li>
        </ul>
      </div>

      <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-6 overflow-x-auto">
        <h3 className="text-sm font-semibold text-[#2EC4B6] mb-4">Шаг 2. Запись в очередь</h3>
        <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`POST /api/integration/line/join
Content-Type: application/json

{
  "accessKey": "your-access-key",
  "customerId": "0c52c445020145b40760d99f12000000",
  "placeId": "8ca734a1-f3b4-4b9e-a9d4-838dfbf9008b",
  "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1",
  "services": [
    { "serviceId": "Забор биоматериала" },
    { "serviceId": "Терапевт" }
  ],
  "deviceType": "Browser",
  "priority": false
}`}
        </pre>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Пример ответа</h4>
        <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-4 overflow-x-auto">
          <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "positionId": "pos-123456789",
  "queueNumber": 42,
  "estimatedWaitTime": 15
}`}
          </pre>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <details className="group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors list-none">
            <span className="text-sm font-semibold text-slate-700">Дополнительные методы API</span>
            <svg className="w-4 h-4 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="px-5 py-5 space-y-6 bg-white border-t border-slate-200">

            <div>
              <h4 className="text-sm font-semibold text-[#2EC4B6] mb-2">POST /api/integration/places</h4>
              <p className="text-xs text-slate-600 mb-3">Возвращает список мест, очередей (линий) и услуг, зарегистрированных на сервере. Используется при первоначальной настройке для получения идентификаторов.</p>
              <div className="rounded-lg bg-[#0F172A] border border-slate-700 p-4 overflow-x-auto mb-3">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`POST /api/integration/places
Content-Type: application/json

{
  "accessKey": "your-access-key"
}`}
                </pre>
              </div>
              <h5 className="text-xs font-semibold text-slate-500 mb-1">Пример ответа</h5>
              <div className="rounded-lg bg-[#0F172A] border border-slate-700 p-4 overflow-x-auto">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "places": [
    {
      "placeId": "8ca734a1-f3b4-4b9e-a9d4-838dfbf9008b",
      "name": "Кабинет №1",
      "lines": [
        {
          "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1",
          "name": "Основная очередь",
          "services": [
            { "serviceId": "Терапевт", "name": "Приём терапевта" }
          ]
        }
      ]
    }
  ]
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#2EC4B6] mb-2">POST /api/integration/line/todayPositions</h4>
              <p className="text-xs text-slate-600 mb-3">Возвращает текущую очередь на приём для конкретной линии.</p>
              <div className="rounded-lg bg-[#0F172A] border border-slate-700 p-4 overflow-x-auto mb-3">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`POST /api/integration/line/todayPositions
Content-Type: application/json

{
  "accessKey": "your-access-key",
  "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1"
}`}
                </pre>
              </div>
              <h5 className="text-xs font-semibold text-slate-500 mb-1">Пример ответа</h5>
              <div className="rounded-lg bg-[#0F172A] border border-slate-700 p-4 overflow-x-auto">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "positions": [
    {
      "positionId": "pos-123456789",
      "queueNumber": 42,
      "status": "waiting",
      "customerName": "Иванов И.И."
    }
  ]
}`}
                </pre>
              </div>
            </div>

          </div>
        </details>
      </div>

      <BenefitsCard title="Преимущества интеграции" color="#2EC4B6" benefits={integrationBenefits} />

      <div className="rounded-xl p-5 flex items-start gap-3" style={{ backgroundColor: 'rgba(233,30,140,0.08)', border: '1px solid rgba(233,30,140,0.25)' }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(233,30,140,0.15)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold" style={{ color: '#E91E8C' }}>Важно!{' '}</span>
          Для полноценной интеграции МИС и ЭО необходимо обсудить с командой ВнеОчереди соответствие справочников услуг МИС и ЭО, а также передачу идентификатора регистратора.
        </p>
      </div>
    </div>
  )
}

function renderStepContent(step: number) {
  switch (step) {
    case 1:
      return <StepOneContent />
    case 2:
      return <QueueWidgetContent actor="регистратор" />
    case 3:
      return <NotificationContent />
    case 4:
      return <MisContent title="Интерфейс МИС ЕЦП — оформление услуг" />
    case 5:
      return <CompletionContent title="Завершение обслуживания в регистратуре" />
    case 6:
      return <IntegrationContent />
    case 7:
      return <QueueWidgetContent actor="врач" />
    case 8:
      return <NotificationContent />
    case 9:
      return <MisContent title="Интерфейс врача в МИС ЕЦП" />
    case 10:
      return <CompletionContent title="Завершение профосмотра у врача" />
    default:
      return null
  }
}

export default function StepModal({ step, onClose, onNext, onPrev }: StepModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
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
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
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
        <div className="px-4 md:px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md flex-shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <div className="type-kicker text-primary-600 min-w-[4.5rem] tabular-nums">
                  Шаг {step}
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={onPrev}
                    disabled={step <= 1}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-default transition-colors"
                    aria-label="Назад"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={step >= 10}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-default transition-colors"
                    aria-label="Дальше"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="type-card-title md:text-xl truncate">
                  {stepTitles[step]}
                </h2>
                {renderLabel(stepLabels[step])}
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              Закрыть
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50">
          <div className={`${'max-w-7xl'} mx-auto px-4 md:px-6 py-6 md:py-10`}>
            {renderStepContent(step)}

            <div className="flex items-center justify-between gap-4 mt-8 sm:hidden">
              <button
                onClick={onPrev}
                disabled={step <= 1}
                className="type-button inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-default"
              >
                <ChevronLeft size={16} /> Назад
              </button>
              <button
                onClick={onNext}
                disabled={step >= 10}
                className="type-button inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-default"
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
