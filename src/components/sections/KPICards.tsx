import { motion } from 'framer-motion'
import { Clock, Zap, Shield, TrendingUp } from 'lucide-react'

const kpis = [
  {
    label: 'Сокращение ожидания',
    value: '−40%',
    description: 'Среднее время ожидания пациента в очереди',
    icon: Clock,
    color: 'text-primary-600 bg-primary-50 border-primary-200',
  },
  {
    label: 'Ускорение регистрации',
    value: '2×',
    description: 'Рост скорости обработки одного пациента',
    icon: Zap,
    color: 'text-accent-600 bg-accent-50 border-accent-200',
  },
  {
    label: 'Надёжность интеграции',
    value: '99.9%',
    description: 'Доступность связки ЕЦП МИС ↔ ВнеОчереди',
    icon: Shield,
    color: 'text-secondary-600 bg-secondary-50 border-secondary-200',
  },
  {
    label: 'Прохождение профосмотра',
    value: '+35%',
    description: 'Рост доли пациентов, прошедших диспансеризацию',
    icon: TrendingUp,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
]

export default function KPICards() {
  return (
    <section className="section-padding bg-light">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-full px-3 py-1 mb-4">
            Эффективность
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Ключевые показатели
          </h2>
          <p className="text-muted text-lg">
            Измеримые результаты внедрения интеграции систем
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <motion.div
                key={kpi.label}
                className="card p-6 text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border ${kpi.color} transition-transform group-hover:scale-110`}>
                  <Icon size={22} />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">{kpi.value}</div>
                <div className="text-sm font-semibold text-dark mb-1">{kpi.label}</div>
                <div className="text-xs text-muted leading-relaxed">{kpi.description}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
