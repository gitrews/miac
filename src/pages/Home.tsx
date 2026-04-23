import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Fi = '#2EC4B6'
const bc = '#0052CC'

const nodes = [
  { id: 'n0', role: 0, phase: 0, label: 'Регистратура', systemColor: Fi, route: '/step/1' },
  { id: 'n1', role: 0, phase: 1, label: 'Рабочее место регистратора', systemColor: Fi, route: '/step/2' },
  { id: 'n2', role: 0, phase: 2, label: 'ТВ экран', systemColor: Fi, route: '/step/3' },
  { id: 'n3', role: 0, phase: 3, label: 'ЕЦП.МИС', systemColor: bc, route: '/step/4' },
  { id: 'n4', role: 0, phase: 4, label: 'Регистратура', systemColor: Fi, route: '/step/5' },
  { id: 'n5', role: 1, phase: 5, label: 'ЕЦП.МИС', systemColor: bc, route: '/step/6', isBanner: true, bannerSpan: 3 },
  { id: 'n6', role: 1, phase: 6, label: 'ТВ экран', systemColor: Fi, route: '/step/7' },
  { id: 'n7', role: 1, phase: 7, label: 'ЕЦП.МИС', systemColor: bc, route: '/step/8' },
  { id: 'n8', role: 2, phase: 8, label: 'ТВ экран', systemColor: Fi, route: '/step/9' },
  { id: 'n9', role: 2, phase: 9, label: 'Виджет на рабочем столе', systemColor: bc, route: '/step/10' },
]

const roles = [
  { id: 'registrar', label: 'Регистратура', color: Fi },
  { id: 'doctor', label: 'Врач', color: bc },
  { id: 'patient', label: 'Пациент', color: Fi },
]

const phases = [
  { id: 'registration', label: 'Регистратура' },
  { id: 'call', label: 'Вызов' },
  { id: 'notification', label: 'Уведомление' },
  { id: 'service', label: 'Услуги' },
  { id: 'complete', label: 'Завершение' },
  { id: 'exam', label: 'Профосмотр' },
  { id: 'cabinet', label: 'Кабинет' },
  { id: 'notify2', label: 'Уведомление' },
  { id: 'exam2', label: 'Осмотр' },
  { id: 'complete2', label: 'Завершение' },
]

const na = 44
const Gn = 50
const os = 210
const Nb = 178
const Ef = 46
const ra = 200
const ls = 70
const Xo = 10
const pi = 12
const xg = 100

function u8(i: number, e: number) {
  return {
    cx: Gn + os + pi + i * (ra + Xo) + ra / 2,
    cy: na + pi + e * ls + ls / 2,
  }
}

function f8(i: number, e: number, s = 0) {
  const a = Gn + os + pi + s * (ra + Xo)
  const o = a + e * ra + (e - 1) * Xo
  return {
    cx: (a + o) / 2,
    cy: na + pi + i * ls + ls / 2,
    width: o - a - 16,
  }
}

const sc = Gn + os + pi + roles.length * (ra + Xo) + xg
const Em = na + pi + phases.length * ls + 20

export default function Home() {
  const navigate = useNavigate()

  const scrollHint = (
    <motion.div
      className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer rounded-full px-4 py-2.5 bg-white/70 border border-black/5 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onClick={() => {
        const target = document.getElementById('scheme-section')
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
    >
      <motion.svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M1 1L10 10L19 1" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
      <span className="text-xs text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>
        Схема процесса
      </span>
    </motion.div>
  )

  return (
    <>
      <section
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 50%, #d1dce8 100%)' }}
      >
        <motion.span
          className="uppercase tracking-[0.12em] mb-5"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1E3A5F' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Процесс обслуживания пациентов
        </motion.span>

        <motion.h1
          className="font-bold text-[#1A2B3C] max-w-[900px]"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Ямальский чек-ап
        </motion.h1>

        <motion.p
          className="mt-4 max-w-[700px]"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: '#4A5568' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Описание процесса обслуживания пациентов в рамках проекта Ямальский чек-ап
        </motion.p>

        {scrollHint}
      </section>

      <section id="scheme-section" className="relative py-16" style={{ background: '#F7FAFC' }}>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2
              className="text-[#1A2B3C]"
              style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}
            >
              Схема процесса
            </h2>
          </motion.div>

          <motion.div
            className="overflow-x-auto pb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="lg:hidden flex items-center gap-2 mb-4 text-sm text-[#718096]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Листайте вправо
            </div>

            <svg viewBox={`0 0 ${sc} ${Em}`} style={{ minWidth: sc }} className="block">
              <defs>
                <linearGradient id="intGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={bc} />
                  <stop offset="100%" stopColor={Fi} />
                </linearGradient>
              </defs>

              {/* Role headers */}
              {roles.map((role, s) => {
                const x = Gn + os + pi + s * (ra + Xo)
                return (
                  <motion.g
                    key={role.id}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ delay: s * 0.06, duration: 0.4 }}
                  >
                    <rect
                      x={x + 2}
                      y={2}
                      width={ra - 4}
                      height={na - 4}
                      rx="12"
                      fill={role.color}
                      fillOpacity="0.1"
                      stroke={role.color}
                      strokeWidth="1"
                    />
                    <text
                      x={x + ra / 2}
                      y={na / 2 + 3}
                      textAnchor="middle"
                      fill={role.color}
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      {role.label}
                    </text>
                  </motion.g>
                )
              })}

              {/* Phase rows */}
              {phases.map((phase, s) => {
                const y = na + pi + s * ls
                const centerY = y + ls / 2
                return (
                  <g key={phase.id}>
                    <rect
                      x={Gn}
                      y={y}
                      width={os}
                      height={ls}
                      rx="8"
                      fill="rgba(255,255,255,0.6)"
                      stroke="rgba(0,0,0,0.08)"
                      strokeWidth="1"
                    />
                    <text
                      x={Gn + os / 2 - 5}
                      y={centerY + 4}
                      textAnchor="middle"
                      fill="#4A5568"
                      fontSize="12"
                      fontFamily="Inter, sans-serif"
                    >
                      {phase.label.split(' ').map((word, u) => (
                        <tspan key={u} x={Gn + os / 2 - 5} dy={u === 0 ? 0 : 14}>
                          {word.length > 28 ? word.slice(0, 28) + '…' : word}
                        </tspan>
                      ))}
                    </text>
                  </g>
                )
              })}

              {/* Horizontal lines */}
              {phases.map((_, s) => {
                const y = na + pi + s * ls
                return (
                  <g key={`hline-${s}`}>
                    <line
                      x1={Gn + os}
                      y1={y}
                      x2={sc - xg}
                      y2={y}
                      stroke="rgba(0,0,0,0.08)"
                      strokeWidth="1"
                    />
                  </g>
                )
              })}

              {/* Vertical role separators */}
              {roles.map((_, s) => {
                const x = Gn + os + pi + s * (ra + Xo)
                return (
                  <line
                    key={`vline-${s}`}
                    x1={x}
                    y1={na}
                    x2={x}
                    y2={Em - 20}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="1"
                  />
                )
              })}

              {/* Nodes / Cards */}
              {nodes.filter((n) => n.route).map((node) => {
                const { cx, cy } = u8(node.phase, node.role || 0)
                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{
                      delay: node.phase * 0.06,
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                      cursor: node.route ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      if (node.route) navigate(node.route)
                    }}
                  >
                    <rect
                      x={cx - Nb / 2}
                      y={cy - Ef / 2}
                      width={Nb}
                      height={Ef}
                      rx="12"
                      fill="rgba(255,255,255,0.92)"
                      stroke={node.systemColor}
                      strokeWidth="1.5"
                      style={{ filter: `drop-shadow(0 0 12px ${node.systemColor}18)` }}
                    />
                    <text
                      x={cx}
                      y={cy - 2}
                      textAnchor="middle"
                      fill="#1A2B3C"
                      fontSize="12"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.label.split(' ').map((word, f) => (
                        <tspan key={f} x={cx} dy={f === 0 ? 0 : 14}>
                          {word.length > 28 ? word.slice(0, 28) + '…' : word}
                        </tspan>
                      ))}
                    </text>
                  </motion.g>
                )
              })}

              {/* Integration Banner */}
              {(() => {
                const bannerNode = nodes.find((n) => n.isBanner)
                if (!bannerNode) return null
                const { cx, cy, width } = f8(
                  bannerNode.phase,
                  bannerNode.bannerSpan || 3,
                  bannerNode.role || 0
                )
                return (
                  <motion.g
                    initial={{ opacity: 0, scaleX: 0.2 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{
                      delay: bannerNode.phase * 0.06,
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  >
                    <rect
                      x={cx - width / 2}
                      y={cy - Ef / 2 - 2}
                      width={width}
                      height={Ef + 4}
                      rx="12"
                      fill="url(#intGrad)"
                      fillOpacity="0.12"
                      stroke="url(#intGrad)"
                      strokeWidth={2.5}
                      style={{ filter: `drop-shadow(0 0 12px ${Fi}25)` }}
                    />
                    <text
                      x={cx - 48}
                      y={cy + 3}
                      textAnchor="middle"
                      fill={bc}
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="Inter, sans-serif"
                    >
                      ЕЦП
                    </text>
                    <text
                      x={cx}
                      y={cy + 3}
                      textAnchor="middle"
                      fill="#4A5568"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Inter, sans-serif"
                    >
                      →
                    </text>
                    <text
                      x={cx + 48}
                      y={cy + 3}
                      textAnchor="middle"
                      fill={Fi}
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="Inter, sans-serif"
                    >
                      ВнеОчереди
                    </text>
                  </motion.g>
                )
              })()}

              {/* Legend */}
              <g transform={`translate(${sc - 104}, 18)`}>
                <rect x="0" y="0" width="96" height="68" rx="8" fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                <text x="10" y="16" fill="#1A2B3C" fontSize="10" fontWeight="800" fontFamily="Inter, sans-serif">
                  СИСТЕМА
                </text>
                <rect x="10" y="25" width="12" height="12" rx="3" fill={Fi} opacity="0.7" />
                <text x="28" y="35" fill="#4A5568" fontSize="10" fontFamily="Inter, sans-serif">
                  ВнеОчереди
                </text>
                <rect x="10" y="47" width="12" height="12" rx="3" fill={bc} opacity="0.7" />
                <text x="28" y="57" fill="#4A5568" fontSize="10" fontFamily="Inter, sans-serif">
                  ЕЦП МИС
                </text>
              </g>
            </svg>
          </motion.div>
        </div>
      </section>
    </>
  )
}
