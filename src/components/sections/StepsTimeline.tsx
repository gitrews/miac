import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const steps = [
  {
    num: 1,
    title: 'Запись в регистратуру',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'Пациент записывается через портал или на ресепшене',
  },
  {
    num: 2,
    title: 'Вызов пациента в окно',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'Регистратор вызывает следующего пациента из очереди',
  },
  {
    num: 3,
    title: 'Уведомление пациента',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'SMS и push-уведомление о приближении очереди',
  },
  {
    num: 4,
    title: 'Оформление услуг',
    system: 'ЕЦП МИС',
    color: '#0052CC',
    desc: 'Регистратор оформляет услуги в МИС ЕЦП',
  },
  {
    num: 5,
    title: 'Завершение обслуживания',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'Закрытие талона и передача в кабинет врача',
  },
  {
    num: 6,
    title: 'Запись на Профосмотр',
    system: 'ЕЦП МИС → ВнеОчереди',
    color: '#2EC4B6',
    desc: 'Автоматическая запись на диспансеризацию',
  },
  {
    num: 7,
    title: 'Вызов пациента в кабинет',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'Врач вызывает пациента из очереди в кабинет',
  },
  {
    num: 8,
    title: 'Уведомление пациента',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'Повторное уведомление о вызове в кабинет',
  },
  {
    num: 9,
    title: 'Осмотр пациента',
    system: 'ЕЦП МИС',
    color: '#0052CC',
    desc: 'Врач проводит осмотр и ведёт ЭМК в ЕЦП',
  },
  {
    num: 10,
    title: 'Завершение обслуживания',
    system: 'ВнеОчереди',
    color: '#E91E8C',
    desc: 'Закрытие приёма и обновление статуса очереди',
  },
]

export default function StepsTimeline() {
  const navigate = useNavigate()

  return (
    <section className="section-padding bg-gradient-surface">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-full px-3 py-1 mb-4">
            Временная шкала
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Этапы процесса
          </h2>
          <p className="text-muted text-lg">
            10 шагов от записи до завершения обслуживания
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-secondary-200 to-primary-200 md:-translate-x-px" />

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.div
                key={step.num}
                className={`relative flex items-start gap-6 mb-10 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <div className="hidden md:block md:w-1/2" />

                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white border-2 flex items-center justify-center z-10 -translate-x-1.5 mt-2"
                  style={{ borderColor: step.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                </div>

                <div className="pl-14 md:pl-0 md:w-1/2">
                  <button
                    onClick={() => navigate(`/step/${step.num}`)}
                    className={`card p-5 text-left w-full group hover:shadow-soft-lg transition-all ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.num}
                      </span>
                      <span
                        className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                        style={{ color: step.color, borderColor: step.color + '40', backgroundColor: step.color + '10' }}
                      >
                        {step.system}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-dark mb-1 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
