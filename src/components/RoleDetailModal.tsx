import { useEffect } from 'react'
import {
  Bell,
  CheckCircle2,
  ClipboardCheck,
  Database,
  GitBranch,
  MapPinned,
  Monitor,
  PlugZap,
  Route,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Timer,
  Tv,
  UserCheck,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react'

export type RoleDetailId = 'patient' | 'registrar' | 'doctor' | 'vneocheredi' | 'ecp'

interface RolePage {
  id: RoleDetailId
  title: string
  eyebrow: string
  badge: string
  color: string
  bg: string
  icon: LucideIcon
  intro: string
  outcome: string
  flow: Array<{ title: string; text: string }>
  capabilities: Array<{ icon: LucideIcon; title: string; text: string }>
  interfaces: string[]
  data: string[]
  controls: string[]
  steps: Array<{ step: number; label: string }>
}

const rolePages: Record<RoleDetailId, RolePage> = {
  patient: {
    id: 'patient',
    title: 'Пациент',
    eyebrow: 'Маршрут пациента',
    badge: 'Мобильное приложение, терминал, ТВ-экран',
    color: '#E91E8C',
    bg: 'rgba(233,30,140,0.10)',
    icon: Users,
    intro:
      'Пациент взаимодействует с АИС УЭО «ВнеОчереди» через понятные каналы: мобильное приложение МИАЦ ЯНАО, терминал самозаписи, экран вызова и push-уведомления. Система снижает необходимость повторных обращений в регистратуру и ведет пациента по маршруту профосмотра.',
    outcome:
      'Пациент понимает, где он находится в очереди, куда идти дальше и какой кабинет является следующей точкой обслуживания.',
    flow: [
      {
        title: 'Самостоятельная запись',
        text: 'Пациент выбирает медицинскую организацию, причину обращения и доступный сценарий профосмотра в мобильном приложении или на терминале.',
      },
      {
        title: 'Постановка в электронную очередь',
        text: 'АИС УЭО создает позицию в очереди, присваивает номер талона и связывает пациента с маршрутом обслуживания.',
      },
      {
        title: 'Ожидание вызова',
        text: 'Пациент получает вызов через push-уведомление, ТВ-экран в зоне ожидания и голосовое оповещение.',
      },
      {
        title: 'Переход между кабинетами',
        text: 'После завершения обслуживания система показывает следующую точку маршрута и помогает пройти профосмотр без лишних возвратов.',
      },
      {
        title: 'Прозрачный статус',
        text: 'Пациент видит номер талона, ориентир по времени ожидания, текущий вызов и следующую точку обслуживания.',
      },
    ],
    capabilities: [
      { icon: Smartphone, title: 'Мобильный канал', text: 'Запись, статус ожидания и уведомление о вызове доступны на смартфоне.' },
      { icon: Monitor, title: 'Терминал самозаписи', text: 'Альтернативный сценарий записи на месте без обращения к регистратору.' },
      { icon: Tv, title: 'Экран вызова', text: 'В зоне ожидания отображаются имя пациента, талон и кабинет или окно вызова.' },
      { icon: Route, title: 'Маршрут профосмотра', text: 'Система подсказывает следующую точку обслуживания после каждого этапа.' },
    ],
    interfaces: [
      'Мобильное приложение МИАЦ ЯНАО',
      'Терминал самозаписи пациента',
      'Экран вызова ТВ и голосовое оповещение',
      'Талон или цифровой код записи',
    ],
    data: [
      'ФИО пациента и идентификатор записи',
      'Номер талона и статус позиции',
      'Текущий кабинет, окно или следующая точка маршрута',
      'Время ожидания, вызова и обслуживания',
    ],
    controls: [
      'Понятный статус без обращения к персоналу',
      'Уведомления в момент вызова',
      'Единая логика вызова на ТВ и в приложении',
    ],
    steps: [
      { step: 1, label: 'Запись в регистратуру' },
      { step: 3, label: 'Уведомление пациента' },
      { step: 8, label: 'Уведомление у врача' },
    ],
  },
  registrar: {
    id: 'registrar',
    title: 'Регистратор',
    eyebrow: 'Рабочее место регистратора',
    badge: 'ЕЦП.МИС + виджет ВнеОчереди',
    color: '#2EC4B6',
    bg: 'rgba(46,196,182,0.12)',
    icon: UserCheck,
    intro:
      'Регистратор работает в ЕЦП.МИС и управляет очередью через виджет «ВнеОчереди», который расположен поверх интерфейса МИС. Основная цель роли - быстро оформить услуги, поставить пациента в маршрут профосмотра и передать ему следующую точку обслуживания.',
    outcome:
      'Регистратор не переключается между системами, видит актуальный статус пациента и завершает обслуживание в один сценарий.',
    flow: [
      {
        title: 'Вызов пациента в окно',
        text: 'Через виджет «ВнеОчереди» регистратор вызывает следующего пациента, а система синхронно обновляет ТВ-экран и push-уведомление.',
      },
      {
        title: 'Оформление услуг в ЕЦП.МИС',
        text: 'Регистратор формирует набор услуг профосмотра, проверяет состав и сохраняет оформление в МИС.',
      },
      {
        title: 'Интеграция с очередью',
        text: 'МИС передает во «ВнеОчереди» данные пациента, услуги, кабинет, очередь и параметры записи через API.',
      },
      {
        title: 'Следующий кабинет',
        text: 'После завершения обслуживания система определяет следующую точку маршрута и показывает ее регистратору.',
      },
      {
        title: 'Ручной сценарий',
        text: 'Если интеграция недоступна, регистратор может перенаправить пациента вручную через административную панель.',
      },
    ],
    capabilities: [
      { icon: Workflow, title: 'Виджет поверх МИС', text: 'Вызов, старт и завершение обслуживания доступны без переключения окна.' },
      { icon: Database, title: 'API-интеграция', text: 'Создание пациента, запись в очередь и получение справочников мест, очередей и услуг.' },
      { icon: Timer, title: 'Контроль времени', text: 'Система фиксирует ожидание, вызов, обслуживание и превышение нормативов.' },
      { icon: Bell, title: 'Оповещения', text: 'Пациент получает вызов на ТВ-экране и в мобильном приложении.' },
    ],
    interfaces: [
      'Виджет регистратора «ВнеОчереди» поверх ЕЦП.МИС',
      'ЕЦП.МИС для оформления услуг',
      'Административная панель для ручного перенаправления',
      'ТВ-экран и мобильные уведомления пациента',
    ],
    data: [
      'customerId, externalId и ФИО пациента',
      'placeId, lineId и serviceId для записи в очередь',
      'Список услуг и признак приоритетного обслуживания',
      'Идентификатор регистратора и статус обслуживания',
    ],
    controls: [
      'Автоматическое создание позиции в очереди',
      'Вызов следующего пациента из компактного виджета',
      'Ручное перенаправление как резервный сценарий',
      'Сообщение пациенту следующего кабинета',
    ],
    steps: [
      { step: 2, label: 'Вызов пациента в окно' },
      { step: 4, label: 'Оформление услуг' },
      { step: 5, label: 'Завершение у регистратора' },
      { step: 6, label: 'Интеграция' },
    ],
  },
  doctor: {
    id: 'doctor',
    title: 'Врач',
    eyebrow: 'Рабочее место врача',
    badge: 'Осмотр, вызов, завершение маршрута',
    color: '#3A9BD9',
    bg: 'rgba(58,155,217,0.12)',
    icon: Stethoscope,
    intro:
      'Врач использует «ВнеОчереди» как слой управления пациентским потоком поверх ЕЦП.МИС. Виджет помогает вызвать пациента, контролировать статус обслуживания, завершить прием и передать пациента в следующий кабинет.',
    outcome:
      'Врач фокусируется на осмотре и фиксации результата в МИС, а АИС УЭО берет на себя вызов, статусы и маршрутизацию.',
    flow: [
      {
        title: 'Ожидание пациента возле кабинета',
        text: 'Система показывает врачу пациента, готового к вызову, и может напоминать о превышении времени ожидания.',
      },
      {
        title: 'Вызов в кабинет',
        text: 'Врач нажимает вызов в виджете, а пациент видит приглашение на ТВ-экране и получает уведомление.',
      },
      {
        title: 'Осмотр в ЕЦП.МИС',
        text: 'Результат приема фиксируется в медицинской системе без ручного дублирования статуса очереди.',
      },
      {
        title: 'Завершение обслуживания',
        text: 'После приема врач завершает обслуживание в виджете, а система рассчитывает следующую точку маршрута.',
      },
      {
        title: 'Передача пациента дальше',
        text: 'Врач сообщает пациенту следующий кабинет, а очередь обновляет статус позиции и маршрут.',
      },
    ],
    capabilities: [
      { icon: UserCheck, title: 'Вызов из виджета', text: 'Вызов пациента доступен поверх МИС и не требует отдельного рабочего окна.' },
      { icon: ClipboardCheck, title: 'Связь с результатом осмотра', text: 'Медицинская часть фиксируется в ЕЦП.МИС, очередь управляет маршрутом.' },
      { icon: MapPinned, title: 'Следующий кабинет', text: 'После завершения приема система показывает, куда направить пациента.' },
      { icon: ShieldCheck, title: 'Контроль процесса', text: 'Статусы вызова, обслуживания и завершения остаются синхронизированными.' },
    ],
    interfaces: [
      'Виджет врача «ВнеОчереди» поверх ЕЦП.МИС',
      'ЕЦП.МИС для фиксации результатов осмотра',
      'ТВ-экран вызова в зоне ожидания',
      'Уведомление пациента о вызове и маршруте',
    ],
    data: [
      'Талон пациента и текущий кабинет',
      'Статус ожидания, вызова и обслуживания',
      'Назначенная услуга и длительность приема',
      'Следующая точка маршрута после завершения',
    ],
    controls: [
      'Вызов пациента в кабинет',
      'Старт и завершение обслуживания',
      'Напоминания врачу о пациенте возле кабинета',
      'Передача пациента на следующий этап',
    ],
    steps: [
      { step: 7, label: 'Вызов пациента в кабинет' },
      { step: 9, label: 'Осмотр пациента' },
      { step: 10, label: 'Завершение у врача' },
    ],
  },
  vneocheredi: {
    id: 'vneocheredi',
    title: 'ВнеОчереди',
    eyebrow: 'АИС УЭО',
    badge: 'Управление очередью и маршрутом',
    color: '#E91E8C',
    bg: 'rgba(233,30,140,0.10)',
    icon: Monitor,
    intro:
      'АИС УЭО «ВнеОчереди» является контуром управления пациентским потоком: принимает записи из мобильного приложения, терминала и ЕЦП.МИС, ведет статусы очереди, показывает вызовы на ТВ-экранах и помогает персоналу направлять пациента по маршруту профосмотра.',
    outcome:
      'Система делает обслуживание управляемым: каждый пациент имеет позицию, статус, текущую точку обслуживания и следующий кабинет маршрута.',
    flow: [
      {
        title: 'Создание позиции',
        text: 'Позиция создается через приложение, терминал или API-интеграцию с ЕЦП.МИС с передачей пациента, услуг и нужной очереди.',
      },
      {
        title: 'Управление вызовом',
        text: 'Виджеты регистратора и врача меняют статус позиции, а ТВ-экран и мобильные уведомления синхронно показывают вызов пациенту.',
      },
      {
        title: 'Маршрутизация',
        text: 'После завершения обслуживания система определяет следующую точку маршрута с учетом назначенных услуг и кабинетов.',
      },
      {
        title: 'Мониторинг',
        text: 'ВнеОчереди фиксирует ожидание, вызов, обслуживание, простои и превышения нормативов по точкам обслуживания.',
      },
      {
        title: 'Резервный ручной сценарий',
        text: 'При отсутствии полной интеграции администратор или регистратор может вручную перенаправить позицию на нужную очередь.',
      },
    ],
    capabilities: [
      { icon: Route, title: 'Маршрут пациента', text: 'Расчет следующей точки обслуживания и поддержка переходов между кабинетами.' },
      { icon: Bell, title: 'Оповещения', text: 'Push, ТВ-экран и голосовое оповещение работают из одного статуса очереди.' },
      { icon: Monitor, title: 'Виджеты персонала', text: 'Регистратор и врач управляют вызовом поверх ЕЦП.МИС без отдельного рабочего места.' },
      { icon: Timer, title: 'Операционный контроль', text: 'Время ожидания и обслуживания становится прозрачным для управления потоком.' },
    ],
    interfaces: [
      'Виджет регистратора и врача поверх МИС',
      'Терминал самозаписи и мобильное приложение',
      'Экран вызова ТВ и голосовое оповещение',
      'Административная панель ВнеОчереди',
      'Интеграционный API для ЕЦП.МИС',
    ],
    data: [
      'Позиция в очереди, талон, customerId и positionId',
      'Место обслуживания, очередь, услуга и длительность',
      'Статусы waiting, calling, serving, completed',
      'Время создания, вызова, начала и завершения обслуживания',
    ],
    controls: [
      'Создать или обновить пациента',
      'Записать пациента в очередь',
      'Вызвать, начать и завершить обслуживание',
      'Перенаправить позицию вручную или автоматически',
      'Показать вызов на ТВ и отправить push',
    ],
    steps: [
      { step: 1, label: 'Запись пациента' },
      { step: 2, label: 'Вызов в окно' },
      { step: 6, label: 'Интеграция' },
      { step: 7, label: 'Вызов в кабинет' },
      { step: 10, label: 'Завершение маршрута' },
    ],
  },
  ecp: {
    id: 'ecp',
    title: 'ЕЦП.МИС',
    eyebrow: 'Медицинская информационная система',
    badge: 'Оформление услуг и результаты осмотра',
    color: '#0052CC',
    bg: 'rgba(0,82,204,0.10)',
    icon: Database,
    intro:
      'ЕЦП.МИС остается основной медицинской системой: в ней оформляются услуги, фиксируются результаты осмотров и формируется медицинская документация. Интеграция с «ВнеОчереди» нужна, чтобы медицинские действия автоматически превращались в управляемый маршрут пациента.',
    outcome:
      'МИС не заменяется электронной очередью: ЕЦП.МИС хранит медицинский контекст, а ВнеОчереди синхронизирует поток, вызовы и переходы между кабинетами.',
    flow: [
      {
        title: 'Оформление пациента',
        text: 'В ЕЦП.МИС регистратор выбирает пациента, медосмотр, услуги и проверяет состав назначений.',
      },
      {
        title: 'Передача в очередь',
        text: 'МИС через API передает во ВнеОчереди данные пациента, список услуг, очередь, место обслуживания и параметры записи.',
      },
      {
        title: 'Работа персонала',
        text: 'Регистратор и врач продолжают работать в МИС, а виджет ВнеОчереди дает действия по вызову и завершению обслуживания.',
      },
      {
        title: 'Фиксация результата',
        text: 'Врач сохраняет медицинский результат в ЕЦП.МИС, не дублируя управление очередью в отдельной системе.',
      },
      {
        title: 'Закрытие этапа',
        text: 'После завершения обслуживания очередь получает статус и показывает следующую точку маршрута пациента.',
      },
    ],
    capabilities: [
      { icon: Database, title: 'Медицинские данные', text: 'Пациент, услуги, согласия, результаты и заключения остаются в ЕЦП.МИС.' },
      { icon: PlugZap, title: 'API-связка', text: 'Интеграция создает пациента и записывает его в очередь без ручного переноса данных.' },
      { icon: ServerCog, title: 'Справочники', text: 'Сопоставляются услуги МИС, очереди, кабинеты и точки обслуживания ВнеОчереди.' },
      { icon: GitBranch, title: 'Единый маршрут', text: 'Набор услуг из МИС становится маршрутом прохождения профосмотра.' },
    ],
    interfaces: [
      'Журнал и карточка пациента в ЕЦП.МИС',
      'Форма оформления услуг профосмотра',
      'Формирование согласий и медицинских документов',
      'Виджет ВнеОчереди поверх интерфейса МИС',
      'API-интеграция с АИС УЭО',
    ],
    data: [
      'ФИО и идентификатор пациента в МИС',
      'Внешний идентификатор externalId для связки систем',
      'Состав услуг профосмотра и параметры оплаты',
      'Идентификаторы услуг, кабинетов и очередей для API',
    ],
    controls: [
      'Оформить услуги и согласия',
      'Передать пациента и услуги во ВнеОчереди',
      'Сохранить результаты осмотра',
      'Получить единый маршрут без ручного дублирования',
    ],
    steps: [
      { step: 4, label: 'Оформление услуг' },
      { step: 6, label: 'API-интеграция' },
      { step: 9, label: 'Осмотр пациента' },
    ],
  },
}

interface RoleDetailModalProps {
  role: RoleDetailId | null
  onClose: () => void
  onOpenStep: (step: number) => void
}

function InfoList({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RoleDetailModal({ role, onClose, onOpenStep }: RoleDetailModalProps) {
  const page = role ? rolePages[role] : null

  useEffect(() => {
    if (!page) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [page, onClose])

  if (!page) return null

  const Icon = page.icon

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-0 flex flex-col bg-slate-50 overflow-hidden">
        <header className="px-4 md:px-6 py-4 border-b border-slate-200 bg-white/90 backdrop-blur-md flex-shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="type-kicker mb-1" style={{ color: page.color }}>
                {page.eyebrow}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{page.title}</h2>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full border"
                  style={{ color: page.color, backgroundColor: page.bg, borderColor: `${page.color}40` }}
                >
                  {page.badge}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
              aria-label="Закрыть страницу роли"
            >
              <X size={18} />
              <span className="hidden sm:inline">Закрыть</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ color: page.color, backgroundColor: page.bg }}
                  >
                    <Icon size={30} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                      Роль в АИС УЭО «ВнеОчереди»
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{page.intro}</p>
                  </div>
                </div>
                <div className="rounded-2xl p-5 border" style={{ backgroundColor: page.bg, borderColor: `${page.color}30` }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" style={{ color: page.color }} />
                    <p className="text-sm md:text-base text-slate-800 leading-relaxed">{page.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 overflow-hidden relative">
                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: page.color }} />
                <h3 className="text-lg font-semibold mb-5 relative">Ключевой сценарий</h3>
                <div className="space-y-4 relative">
                  {page.flow.map((item, index) => (
                    <div key={item.title} className="flex gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ backgroundColor: page.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-5">Что делает «ВнеОчереди» для этой роли</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {page.capabilities.map((item) => {
                  const CapabilityIcon = item.icon

                  return (
                    <div key={item.title} className="rounded-2xl bg-white border border-slate-200 p-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ color: page.color, backgroundColor: page.bg }}
                      >
                        <CapabilityIcon size={22} />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="grid lg:grid-cols-3 gap-5">
              <InfoList title="Интерфейсы" items={page.interfaces} color={page.color} />
              <InfoList title="Данные и статусы" items={page.data} color={page.color} />
              <InfoList title="Контрольные действия" items={page.controls} color={page.color} />
            </section>

            <section className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Связанные шаги процесса</h3>
                  <p className="text-sm text-slate-600">
                    Откройте конкретный экран процесса, чтобы увидеть интерфейс и сценарий в деталях.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {page.steps.map((step) => (
                  <button
                    key={step.step}
                    onClick={() => onOpenStep(step.step)}
                    className="px-4 py-2.5 rounded-xl border text-sm font-semibold bg-white hover:shadow-sm transition-all"
                    style={{ color: page.color, borderColor: `${page.color}40`, backgroundColor: page.bg }}
                  >
                    Шаг {step.step}: {step.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
