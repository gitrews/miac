import { motion } from 'framer-motion'
import { UserCheck, Stethoscope, Users, Monitor, Database } from 'lucide-react'

const roles = [
  {
    id: 'patient',
    icon: Users,
    title: 'Пациент',
    color: 'bg-[#FCE7F3] text-[#BE185D]',
    borderColor: 'border-[#F9A8D4]',
    dotColor: 'bg-[#E91E8C]',
    description: 'Записывается на чек-ап, получает вызов и проходит маршрут без бумажного талона.',
    actions: [
      'Запись через мобильное приложение',
      'Запись через терминал самозаписи',
      'Получение push-уведомлений',
      'Переход между этапами по подсказкам системы',
    ],
  },
  {
    id: 'registrar',
    icon: UserCheck,
    title: 'Регистратор',
    color: 'bg-[#CCFBF1] text-[#0F766E]',
    borderColor: 'border-[#99F6E4]',
    dotColor: 'bg-[#2EC4B6]',
    description: 'Управляет первым этапом маршрута пациента и оформляет услуги в связке с МИС.',
    actions: [
      'Вызов пациента в окно',
      'Оформление услуг в МИС',
      'Передача пациента на профосмотр',
      'Завершение этапа регистратуры',
    ],
  },
  {
    id: 'doctor',
    icon: Stethoscope,
    title: 'Врач',
    color: 'bg-[#DBEAFE] text-[#1E6FA8]',
    borderColor: 'border-[#93C5FD]',
    dotColor: 'bg-[#3A9BD9]',
    description: 'Вызывает пациента в кабинет, проводит осмотр и завершает медицинский этап процесса.',
    actions: [
      'Вызов пациента в кабинет',
      'Работа с картой в ЕЦП.МИС',
      'Формирование заключения',
      'Завершение обслуживания',
    ],
  },
  {
    id: 'vneocheredi',
    icon: Monitor,
    title: 'ВнеОчереди',
    color: 'bg-[#FFF1F2] text-[#BE123C]',
    borderColor: 'border-[#FDA4AF]',
    dotColor: 'bg-[#E91E8C]',
    description: 'Управляет электронной очередью, вызовами, уведомлениями и общим сценарием движения пациента.',
    actions: [
      'Электронная постановка в очередь',
      'Вызов в окно и кабинет',
      'Push и экранные уведомления',
      'Обновление статусов маршрута',
    ],
  },
  {
    id: 'ecp',
    icon: Database,
    title: 'ЕЦП.МИС',
    color: 'bg-[#EFF6FF] text-[#1E6FA8]',
    borderColor: 'border-[#93C5FD]',
    dotColor: 'bg-[#3A9BD9]',
    description: 'Хранит медицинские данные пациента и обеспечивает оформление услуг, осмотра и итоговых результатов.',
    actions: [
      'Оформление услуг и карты пациента',
      'Фиксация этапов профосмотра',
      'Передача данных в интеграцию',
      'Сохранение результата осмотра',
    ],
  },
]

const firstRow = roles.slice(0, 3)
const secondRow = roles.slice(3)

function RoleCard({ role, index }: { role: typeof roles[number]; index: number }) {
  return (
    <motion.div
      className={`relative rounded-2xl border ${role.borderColor} bg-slate-50/50 p-6 lg:p-8 hover:shadow-lg transition-shadow`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${role.color} mb-5`}>
        <role.icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{role.title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-5">{role.description}</p>
      <ul className="space-y-2.5">
        {role.actions.map((action) => (
          <li key={action} className="flex items-start gap-2 text-sm text-slate-700">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${role.dotColor}`} />
            {action}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function RolesInteractions() {
  return (
    <section id="roles" className="section bg-slate-50 px-4 sm:px-6">
      <div className="container-wide">
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="type-section-title">
            Роли и задачи
          </h2>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-6">
            {firstRow.map((role, index) => (
              <RoleCard key={role.id} role={role} index={index} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-6 max-w-5xl mx-auto">
            {secondRow.map((role, index) => (
              <RoleCard key={role.id} role={role} index={index + firstRow.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
