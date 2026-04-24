import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToProcess = () => {
    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center overflow-hidden px-4 pb-24 md:px-6 md:pb-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto -translate-y-8 md:-translate-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="type-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 mb-6 text-sm">
            Описание процесса обслуживания пациентов
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Ямальский{' '}
          <span className="gradient-text">чек-ап</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Пользовательские пути пациента, регистратора, врача, а также описание точек интеграции АИС УЭО ВнеОчереди и ЕЦП.МИС
        </motion.p>
      </div>

      <div className="absolute inset-x-0 bottom-8 md:bottom-10 flex justify-center">
        <motion.button
          onClick={scrollToProcess}
          className="flex flex-col items-center gap-3 text-slate-500 hover:text-slate-700 transition-colors"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
        <motion.span
            className="text-xs text-slate-400 text-center tracking-wide"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            Листайте вниз
          </motion.span>
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/70 shadow-lg shadow-slate-300/30 backdrop-blur-sm"
            animate={{
              y: [0, 8, 0],
              boxShadow: [
                '0 8px 24px rgba(148,163,184,0.18)',
                '0 14px 32px rgba(148,163,184,0.28)',
                '0 8px 24px rgba(148,163,184,0.18)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
