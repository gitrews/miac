import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const cases = [
  {
    title: 'Регистратура без очередей',
    description: 'Автоматическая запись и вызов пациентов сокращает нагрузку на регистраторов и исключает хаос в зале ожидания.',
    image: '/images/mis-registrar-select-patient.jpg',
    tag: 'Регистратура',
    tagColor: 'bg-accent-50 text-accent-600 border-accent-200',
  },
  {
    title: 'Электронная очередь в кабинет',
    description: 'Пациент видит своё место в очереди на ТВ-экране и получает уведомление о вызове прямо на телефон.',
    image: '/images/mis-registrar-schedule.jpg',
    tag: 'Пациент',
    tagColor: 'bg-primary-50 text-primary-600 border-primary-200',
  },
  {
    title: 'Рабочий стол врача',
    description: 'Врач получает полную картину по пациенту из ЕЦП МИС и управляет очередью без отрыва от осмотра.',
    image: '/images/mis-registrar-extra-checkups.jpg',
    tag: 'Врач',
    tagColor: 'bg-secondary-50 text-secondary-600 border-secondary-200',
  },
]

export default function Cases() {
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
            Примеры
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Сценарии использования
          </h2>
          <p className="text-muted text-lg">
            Как интеграция меняет работу поликлиники на практике
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.title}
              className="card overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-4 left-4 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark mb-2 flex items-center gap-2">
                  {item.title}
                  <ArrowUpRight size={16} className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
