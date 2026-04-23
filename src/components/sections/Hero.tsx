import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToScheme = () => {
    document.getElementById('scheme-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.span
          className="inline-block uppercase tracking-[0.15em] mb-6 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Процесс обслуживания пациентов
        </motion.span>

        <motion.h1
          className="font-display text-dark leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Ямальский чек-ап
        </motion.h1>

        <motion.p
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Интеграция АИС УЭО «ВнеОчереди» и МИС «ЕЦП» для&nbsp;оптимизации потока пациентов и повышения качества медицинского обслуживания
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button onClick={scrollToScheme} className="btn-primary gap-2">
            Изучить процесс
            <ChevronDown size={16} />
          </button>
          <a href="#/flow" className="btn-secondary">
            Полный сценарий
          </a>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToScheme}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 rounded-full px-5 py-3 bg-white/70 border border-black/5 backdrop-blur-md cursor-pointer hover:bg-white/90 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Прокрутить к схеме"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-muted" />
        </motion.div>
        <span className="text-xs text-muted font-medium">Схема процесса</span>
      </motion.button>
    </section>
  )
}
