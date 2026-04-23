import { motion } from 'framer-motion'
import { Clock, Users, Zap, TrendingUp } from 'lucide-react'

const kpis = [
  {
    icon: Clock,
    value: '40%',
    label: 'Сокращение времени ожидания',
    description: 'Оптимизация очереди и автоматические уведомления сокращают время ожидания пациентов.',
    color: 'bg-primary-100 text-primary-700',
  },
  {
    icon: Users,
    value: '15 000+',
    label: 'Пациентов в год',
    description: 'Ежегодно через систему проходят профосмотры более 15 тысяч жителей округа.',
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    icon: Zap,
    value: '99.8%',
    label: 'Доступность системы',
    description: 'Высокая надёжность интеграции обеспечивает бесперебойную работу круглый год.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: TrendingUp,
    value: '2×',
    label: 'Рост пропускной способности',
    description: 'Автоматизация процессов позволила удвоить количество пациентов без увеличения персонала.',
    color: 'bg-emerald-100 text-emerald-700',
  },
]

export default function KPICards() {
  return (
    <section id="kpi" className="section bg-white">
      <div className="container-wide">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-600 text-sm font-bold tracking-wider uppercase mb-3 block">
            Результаты
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            Ключевые показатели
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Реальные метрики эффективности, достигнутые после внедрения интеграции систем.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6 lg:p-8 hover:shadow-lg hover:border-slate-200 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${kpi.color} mb-5`}>
                <kpi.icon size={22} />
              </div>
              <div className="font-display text-4xl font-bold text-slate-900 mb-2">
                {kpi.value}
              </div>
              <div className="text-sm font-semibold text-slate-800 mb-2">{kpi.label}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{kpi.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
