import { motion } from 'framer-motion'

const cases = [
  {
    title: 'Рабочее место регистратора',
    description: 'Интерфейс оператора для управления очередью, вызова пациентов и мониторинга статусов.',
    images: [
      './images/mis-registrar-select-patient.jpg',
      './images/mis-registrar-select-service.jpg',
      './images/mis-registrar-service-form.jpg',
    ],
  },
  {
    title: 'ТВ-экран и уведомления',
    description: 'Отображение очереди на экранах в зале ожидания и push-уведомления для пациентов.',
    images: [
      './images/step3/mp-awaiting.jpg',
      './images/step3/mp-notification.png',
    ],
  },
  {
    title: 'Виджеты оператора',
    description: 'Компактные виджеты для быстрого доступа к ключевым функциям рабочего места.',
    images: [
      './images/step2-widget-1.jpg',
      './images/step2-widget-2.jpg',
      './images/step2-widget-3.jpg',
    ],
  },
  {
    title: 'Оформление в МИС ЕЦП',
    description: 'Процесс оформления услуг и работы с медицинской документацией в системе ЕЦП.',
    images: [
      './images/step4/page-3.png',
      './images/step4/page-4.png',
      './images/step4/page-5.png',
    ],
  },
]

export default function CasesSection() {
  return (
    <section id="cases" className="section bg-slate-50">
      <div className="container-wide">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-600 text-sm font-bold tracking-wider uppercase mb-3 block">
            Примеры
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            Кейсы и интерфейсы
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Реальные скриншоты интерфейсов систем, используемых в процессе обслуживания пациентов.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-5 md:p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
              <div className="p-4 md:p-5">
                <div className="grid grid-cols-3 gap-3">
                  {item.images.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100"
                    >
                      <img
                        src={src}
                        alt={`${item.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
