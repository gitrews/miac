import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="section bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-wide relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-400 text-sm font-bold tracking-wider uppercase mb-4 block">
            Начните сейчас
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готовы оптимизировать процесс обслуживания?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Интеграция АИС УЭО «ВнеОчереди» и МИС «ЕЦП» уже работает в медицинских учреждениях Ямало-Ненецкого автономного округа.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-900 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-colors"
            >
              Изучить схему процесса
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#timeline"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white rounded-xl font-semibold text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              Посмотреть этапы
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
