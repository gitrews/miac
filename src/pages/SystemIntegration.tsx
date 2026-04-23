import { motion } from 'framer-motion'
import { ArrowRight, Server, ShieldCheck, RefreshCw, Database } from 'lucide-react'

const features = [
  {
    icon: Server,
    title: 'Двусторонняя синхронизация',
    desc: 'Данные о пациентах, талонах и очередях передаются между ЕЦП МИС и ВнеОчередью в реальном времени',
  },
  {
    icon: ShieldCheck,
    title: 'Безопасность',
    desc: 'Все обмены данными происходят через защищённые каналы с шифрованием и аутентификацией',
  },
  {
    icon: RefreshCw,
    title: 'Автоматизация',
    desc: 'Исключены ручные операции по переносу записей между системами — всё происходит автоматически',
  },
  {
    icon: Database,
    title: 'Единый реестр',
    desc: 'Пациент, записанный через любой канал, сразу попадает в общую очередь всех подсистем',
  },
]

export default function SystemIntegration() {
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
            Архитектура
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Системная интеграция
          </h1>
          <p className="text-muted text-lg">
            Связь между МИС «ЕЦП» и АИС УЭО «ВнеОчереди» для бесшовного обслуживания
          </p>
        </motion.div>

        <motion.div
          className="card p-8 md:p-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-secondary-50 border border-secondary-200 flex items-center justify-center">
                <Database size={32} className="text-secondary-600" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-dark">МИС «ЕЦП»</div>
                <div className="text-xs text-muted">Медицинская информационная система</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <ArrowRight size={18} className="text-primary-500" />
                <div className="px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-xs font-bold text-primary-700">
                  API
                </div>
                <ArrowRight size={18} className="text-primary-500 rotate-180" />
              </div>
              <div className="text-[11px] text-muted uppercase tracking-wider">Обмен данными</div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-primary-50 border border-primary-200 flex items-center justify-center">
                <Server size={32} className="text-primary-600" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-dark">АИС УЭО «ВнеОчереди»</div>
                <div className="text-xs text-muted">Автоматизированная информационная система</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="card p-6 flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-dark mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
