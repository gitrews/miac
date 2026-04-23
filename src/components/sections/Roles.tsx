import { motion } from 'framer-motion'
import { User, Stethoscope, Users } from 'lucide-react'

const roles = [
  {
    id: 'patient',
    label: 'Пациент',
    description: 'Запись через портал, получение уведомлений, прохождение осмотра без очередей',
    icon: User,
    color: 'bg-primary-50 text-primary-600 border-primary-200',
    accent: 'bg-primary-500',
    features: ['Онлайн-запись', 'SMS-уведомления', 'Электронная очередь'],
  },
  {
    id: 'registrar',
    label: 'Регистратор',
    description: 'Приём и регистрация пациентов, управление потоком, взаимодействие с МИС',
    icon: Users,
    color: 'bg-accent-50 text-accent-600 border-accent-200',
    accent: 'bg-accent-500',
    features: ['ЕЦП МИС интеграция', 'Вызов пациентов', 'Оформление услуг'],
  },
  {
    id: 'doctor',
    label: 'Врач',
    description: 'Осмотр пациента, ведение электронной медицинской карты, завершение приёма',
    icon: Stethoscope,
    color: 'bg-secondary-50 text-secondary-600 border-secondary-200',
    accent: 'bg-secondary-500',
    features: ['Электронная карта', 'Рабочий стол врача', 'Завершение приёма'],
  },
]

export default function Roles() {
  return (
    <section className="section-padding bg-gradient-surface">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-full px-3 py-1 mb-4">
            Участники
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Роли в процессе
          </h2>
          <p className="text-muted text-lg">
            Три ключевые роли, взаимодействующие в едином цифровом контуре
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.id}
                className="card p-8 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${role.color} transition-transform group-hover:scale-110`}>
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{role.label}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{role.description}</p>
                <div className="space-y-3">
                  {role.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${role.accent}`} />
                      <span className="text-sm text-dark/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
