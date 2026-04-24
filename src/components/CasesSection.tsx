import { motion } from 'framer-motion'

const cases = [
  {
    title: 'Мобильное приложение МИАЦ ЯНАО для пациента',
    description: 'Пациент записывается на профосмотр, получает вызов и отслеживает маршрут обслуживания без бумажного талона.',
    images: [
      './images/screens/step1-mp-1.png',
      './images/screens/step1-mp-2.png',
      './images/screens/step3-mp-notification.png',
    ],
  },
  {
    title: 'Терминал для самозаписи пациента',
    description: 'Альтернативный сценарий записи на месте: выбор услуги, ввод данных и печать талона в единой цифровой очереди.',
    images: [
      './images/screens/step1-term-1.jpg',
      './images/screens/step1-term-2.jpg',
      './images/screens/step1-term-3.jpg',
    ],
  },
  {
    title: 'Экран вызова ТВ',
    description: 'ТВ-экран в зоне ожидания показывает вызов, номер окна или кабинета и помогает пациенту ориентироваться по маршруту.',
    images: [
      './images/screens/step3-tv-calling.jpg',
      './images/step3/mp-awaiting.jpg',
      './images/step3/mp-notification.png',
    ],
  },
  {
    title: 'Рабочее место регистратора и врача',
    description: 'МИС ЕЦП и виджет «ВнеОчереди» работают рядом: оформление услуг, вызов пациента и завершение обслуживания идут в одном контуре.',
    images: [
      './images/mis-registrar-select-patient.jpg',
      './images/step2-widget-1.jpg',
      './images/mis-registrar-exam-form.jpg',
    ],
  },
]

export default function CasesSection() {
  return (
    <section id="cases" className="section bg-slate-50 px-4 sm:px-6">
      <div className="container-wide">
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="type-section-title">
            Интерфейсы
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {cases.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-5 md:p-6 border-b border-slate-100">
                <h3 className="type-card-title mb-1">{item.title}</h3>
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
                        className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-500"
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
