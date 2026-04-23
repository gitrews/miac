import { motion } from 'framer-motion'
import { Monitor, Users, FileCheck, Printer } from 'lucide-react'

const steps = [
  {
    icon: Users,
    title: 'Приём пациента',
    desc: 'Регистратор вызывает пациента из очереди и идентифицирует его в МИС',
  },
  {
    icon: FileCheck,
    title: 'Оформление услуг',
    desc: 'Создание записи в ЕЦП МИС, проверка полиса и назначение услуг',
  },
  {
    icon: Printer,
    title: 'Печать документов',
    desc: 'Формирование и печать направлений, сертификатов и талонов',
  },
  {
    icon: Monitor,
    title: 'Управление очередью',
    desc: 'Контроль потока пациентов и передача в кабинеты через ВнеОчереди',
  },
]

export default function RegistrarJourney() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-accent-600 bg-accent-50 rounded-full px-3 py-1 mb-4">
            Работа регистратора
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Рабочее место регистратора
          </h1>
          <p className="text-muted text-lg">
            Автоматизация приёма и снижение нагрузки на персонал
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
                <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center shrink-0">
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

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img src="/images/mis-registrar-select-patient.jpg" alt="Выбор пациента" className="w-full h-64 object-cover object-top" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Выбор пациента</div>
              <div className="text-xs text-muted">Интерфейс ЕЦП МИС</div>
            </div>
          </motion.div>
          <motion.div
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img src="/images/mis-registrar-service-form.jpg" alt="Форма услуг" className="w-full h-64 object-cover object-top" />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">Оформление услуг</div>
              <div className="text-xs text-muted">Заполнение данных в МИС</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
