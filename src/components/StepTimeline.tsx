import { motion } from 'framer-motion'

const steps = [
  {
    step: 1,
    title: 'Запись в регистратуру',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Регистратура',
    description: 'Пациент записывается на профосмотр через систему «ВнеОчереди». Создаётся электронный талон с уникальным номером.',
  },
  {
    step: 2,
    title: 'Вызов пациента в окно',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Регистратура',
    description: 'Регистратор вызывает пациента в окно через рабочее место оператора. Информация отображается на ТВ-экране.',
  },
  {
    step: 3,
    title: 'Уведомление пациента',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Пациент',
    description: 'Пациент получает уведомление о вызове через ТВ-экран в зале ожидания и SMS-оповещение.',
  },
  {
    step: 4,
    title: 'Оформление услуг',
    system: 'ЕЦП МИС',
    systemColor: '#0052CC',
    role: 'Регистратура',
    description: 'Регистратор оформляет услуги в МИС ЕЦП, привязывает талон к медицинской карте пациента.',
  },
  {
    step: 5,
    title: 'Завершение обслуживания',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Регистратура',
    description: 'Завершение первичного этапа обслуживания в регистратуре. Пациент направляется в кабинет врача.',
  },
  {
    step: 6,
    title: 'Запись на Профосмотр',
    system: 'ЕЦП → ВнеОчереди',
    systemColor: '#2EC4B6',
    role: 'Интеграция',
    description: 'Данные о записи на профосмотр синхронизируются из МИС ЕЦП в систему «ВнеОчереди» для управления очередью в кабинетах.',
  },
  {
    step: 7,
    title: 'Вызов пациента в кабинет',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Врач',
    description: 'Врач вызывает пациента в кабинет через систему «ВнеОчереди». Статус обновляется на ТВ-экране.',
  },
  {
    step: 8,
    title: 'Уведомление пациента',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Пациент',
    description: 'Пациент получает уведомление о готовности к приёму врача через ТВ-экран и push-уведомление.',
  },
  {
    step: 9,
    title: 'Осмотр пациента',
    system: 'ЕЦП МИС',
    systemColor: '#0052CC',
    role: 'Врач',
    description: 'Врач проводит осмотр пациента, вносит данные в МИС ЕЦП, оформляет заключение и назначения.',
  },
  {
    step: 10,
    title: 'Завершение обслуживания',
    system: 'ВнеОчереди',
    systemColor: '#E91E8C',
    role: 'Врач',
    description: 'Врач завершает обслуживание пациента. Система обновляет статус в очереди и архивирует талон.',
  },
]

interface StepTimelineProps {
  onOpenStep: (step: number) => void
}

export default function StepTimeline({ onOpenStep }: StepTimelineProps) {
  return (
    <section id="timeline" className="section bg-slate-50 px-4 sm:px-6">
      <div className="container-wide">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-600 text-sm font-bold tracking-wider uppercase mb-3 block">
            Пошагово
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            Этапы процесса
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Десять ключевых шагов от записи пациента до завершения обслуживания. Нажмите на этап для подробностей.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((item, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={item.step}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-white border-2 border-primary-400 md:-translate-x-1.5 mt-6 z-10" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <button
                      onClick={() => onOpenStep(item.step)}
                      className="w-full text-left group"
                    >
                      <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold">
                            {item.step}
                          </span>
                          <span
                            className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: item.systemColor + '18',
                              color: item.systemColor,
                            }}
                          >
                            {item.system}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                        <div className="mt-3 text-xs text-slate-400 font-medium">
                          Роль: {item.role}
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
