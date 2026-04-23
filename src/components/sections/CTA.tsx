import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готовы оптимизировать процесс обслуживания?
          </h2>
          <p className="text-lg text-white/70 mb-10 leading-relaxed">
            Интеграция АИС УЭО «ВнеОчереди» и МИС «ЕЦП» уже работает в медицинских учреждениях Ямало-Ненецкого автономного округа
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#/flow"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary-500 text-white font-semibold text-sm transition-all duration-200 hover:bg-primary-400 hover:shadow-glow-primary focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark"
            >
              Смотреть полный процесс
              <ArrowRight size={16} />
            </a>
            <a
              href="#/integration"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/20 transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark"
            >
              <FileText size={16} />
              Документация интеграции
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
