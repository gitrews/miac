import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const flowSteps = [
  { num: 1, title: 'Запись в регистратуру', system: 'ВнеОчереди', actor: 'Пациент / Регистратор' },
  { num: 2, title: 'Вызов пациента в окно', system: 'ВнеОчереди', actor: 'Регистратор' },
  { num: 3, title: 'Уведомление пациента', system: 'ВнеОчереди', actor: 'Система' },
  { num: 4, title: 'Оформление услуг', system: 'ЕЦП МИС', actor: 'Регистратор' },
  { num: 5, title: 'Завершение обслуживания', system: 'ВнеОчереди', actor: 'Регистратор' },
  { num: 6, title: 'Запись на Профосмотр', system: 'ЕЦП МИС → ВнеОчереди', actor: 'Система' },
  { num: 7, title: 'Вызов пациента в кабинет', system: 'ВнеОчереди', actor: 'Врач' },
  { num: 8, title: 'Уведомление пациента', system: 'ВнеОчереди', actor: 'Система' },
  { num: 9, title: 'Осмотр пациента', system: 'ЕЦП МИС', actor: 'Врач' },
  { num: 10, title: 'Завершение обслуживания', system: 'ВнеОчереди', actor: 'Врач' },
]

export default function CompleteFlow() {
  const navigate = useNavigate()

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
            End-to-end
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Полный процесс
          </h1>
          <p className="text-muted text-lg">
            Все этапы от записи пациента до завершения приёма врача
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {flowSteps.map((step, index) => {
            const isLast = index === flowSteps.length - 1
            return (
              <motion.div
                key={step.num}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <button
                  onClick={() => navigate(`/step/${step.num}`)}
                  className="w-full text-left group"
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-white hover:shadow-soft">
                    <div className="relative flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 border border-primary-200 flex items-center justify-center text-sm font-bold shrink-0 z-10 transition-transform group-hover:scale-110">
                        {step.num}
                      </div>
                      {!isLast && (
                        <div className="w-px h-full bg-primary-200 absolute top-10 bottom-[-16px]" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-dark group-hover:text-primary-600 transition-colors">
                          {step.title}
                        </span>
                        <ArrowRight size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span className="px-2 py-0.5 rounded-full bg-light border border-black/5">
                          {step.system}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-primary-500" />
                          {step.actor}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
