import { motion } from 'framer-motion'
import { UserCheck, Stethoscope, Users, ArrowRightLeft, Bell, ClipboardList } from 'lucide-react'

const roles = [
  {
    id: 'registrar',
    icon: UserCheck,
    title: 'Регистратура',
    color: 'bg-[#CCFBF1] text-[#0F766E]',
    borderColor: 'border-[#99F6E4]',
    description: 'Первичная регистрация пациентов, запись на профосмотр, управление очередью вызова.',
    actions: [
      'Регистрация через «ВнеОчереди»',
      'Вызов пациента в окно',
      'Формирование талона ЕЦП',
      'Управление статусом очереди',
    ],
  },
  {
    id: 'doctor',
    icon: Stethoscope,
    title: 'Врач',
    color: 'bg-[#DBEAFE] text-[#1E6FA8]',
    borderColor: 'border-[#93C5FD]',
    description: 'Приём пациентов, проведение осмотров, работа с медицинской документацией в МИС ЕЦП.',
    actions: [
      'Вызов пациента в кабинет',
      'Проведение осмотра в ЕЦП',
      'Оформление услуг и назначений',
      'Завершение обслуживания',
    ],
  },
  {
    id: 'patient',
    icon: Users,
    title: 'Пациент',
    color: 'bg-[#FCE8F3] text-[#B7156E]',
    borderColor: 'border-[#F9A8D4]',
    description: 'Получение уведомлений, прохождение осмотра, отслеживание статуса в очереди.',
    actions: [
      'Получение SMS-уведомлений',
      'Ожидание вызова на ТВ-экране',
      'Прохождение осмотра',
      'Получение результатов',
    ],
  },
]

const interactions = [
  {
    icon: ArrowRightLeft,
    title: 'Интеграция систем',
    description: 'Двусторонний обмен данными между АИС УЭО «ВнеОчереди» и МИС «ЕЦП» через защищённый API.',
  },
  {
    icon: Bell,
    title: 'Оповещения',
    description: 'Автоматические уведомления пациентам через SMS, push и голосовые сообщения о статусе очереди.',
  },
  {
    icon: ClipboardList,
    title: 'Единый талон',
    description: 'Единый электронный талон прохождения профосмотра синхронизируется между системами в реальном времени.',
  },
]

export default function RolesInteractions() {
  return (
    <section id="roles" className="section bg-slate-50 px-4 sm:px-6">
      <div className="container-wide">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            Роли и взаимодействия
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              className={`relative rounded-2xl border ${role.borderColor} bg-slate-50/50 p-6 lg:p-8 hover:shadow-lg transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${role.color} mb-5`}>
                <role.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{role.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{role.description}</p>
              <ul className="space-y-2.5">
                {role.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${role.id === 'patient' ? 'bg-[#E91E8C]' : role.id === 'registrar' ? 'bg-[#2EC4B6]' : 'bg-[#3A9BD9]'}`} />
                    {action}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {interactions.map((item, index) => (
            <motion.div
              key={item.title}
              className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-200/60 flex items-center justify-center text-slate-700">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
