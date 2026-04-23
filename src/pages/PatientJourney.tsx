import { motion } from 'framer-motion'
import { Smartphone, Bell, UserCheck, Calendar } from 'lucide-react'

const steps = [
  {
    icon: Calendar,
    title: 'Запись на приём',
    desc: 'Через портал, мобильное приложение или терминал в поликлинике',
  },
  {
    icon: Bell,
    title: 'Уведомления',
    desc: 'SMS и push-уведомления о статусе очереди и вызове в кабинет',
  },
  {
    icon: Smartphone,
    title: 'Мобильный портал',
    desc: 'Просмотр записей, результатов анализов и назначений в одном месте',
  },
  {
    icon: UserCheck,
    title: 'Прохождение осмотра',
    desc: 'Осмотр врача без лишнего ожидания благодаря электронной очереди',
  },
]

export default function PatientJourney() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-full px-3 py-1 mb-4">
            Путь пациента
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Как проходит визит
          </h1>
          <p className="text-muted text-lg">
            Удобный и понятный процесс от записи до завершения обслуживания
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
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
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
            <img src="/images/step1-mp-1.png" alt="Мобильный портал" className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Запись через портал</div>
              <div className="text-xs text-muted">Выбор услуги и времени</div>
            </div>
          </motion.div>
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img src="/images/step3/mp-notification.png" alt="Уведомление" className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Push-уведомление</div>
              <div className="text-xs text-muted">Оповещение о вызове</div>
            </div>
          </motion.div>
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <img src="/images/step3/mp-awaiting.jpg" alt="Ожидание" className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Экран ожидания</div>
              <div className="text-xs text-muted">Просмотр очереди</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
