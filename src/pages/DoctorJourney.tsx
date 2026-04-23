import { motion } from 'framer-motion'
import { Stethoscope, ClipboardList, MonitorPlay, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: MonitorPlay,
    title: 'Вызов пациента',
    desc: 'Врач вызывает следующего пациента из электронной очереди на рабочем столе',
  },
  {
    icon: ClipboardList,
    title: 'Электронная карта',
    desc: 'Доступ к медицинской карте, анамнезу и результатам анализов в ЕЦП МИС',
  },
  {
    icon: Stethoscope,
    title: 'Осмотр и диагностика',
    desc: 'Проведение осмотра с одновременным ведением записей в электронной карте',
  },
  {
    icon: CheckCircle,
    title: 'Завершение приёма',
    desc: 'Формирование заключения, назначений и направлений для пациента',
  },
]

export default function DoctorJourney() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-secondary-600 bg-secondary-50 rounded-full px-3 py-1 mb-4">
            Работа врача
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Рабочий стол врача
          </h1>
          <p className="text-muted text-lg">
            Интеграция очереди и медицинской информационной системы
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                className="card p-6 flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img src="/images/widget-awaiting-call.png" alt="Вызов пациента" className="w-full h-52 object-cover" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Вызов из очереди</div>
              <div className="text-xs text-muted">Виджет на рабочем столе</div>
            </div>
          </motion.div>
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img src="/images/widget-called.png" alt="Пациент вызван" className="w-full h-52 object-cover" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Пациент вызван</div>
              <div className="text-xs text-muted">Статус обслуживания</div>
            </div>
          </motion.div>
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <img src="/images/widget-serving.png" alt="Приём" className="w-full h-52 object-cover" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Приём пациента</div>
              <div className="text-xs text-muted">Текущий статус приёма</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
