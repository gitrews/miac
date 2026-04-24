import { useEffect, useRef } from 'react'

interface ProcessOverviewProps {
  onOpenStep: (step: number) => void
}

export default function ProcessOverview({ onOpenStep }: ProcessOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      const g = (e.target as HTMLElement).closest('g[data-step]')
      if (g) {
        const step = parseInt(g.getAttribute('data-step') || '0', 10)
        if (step > 0) onOpenStep(step)
      }
    }

    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [onOpenStep])

  const svgHTML = `<svg viewBox="0 0 886 762" preserveAspectRatio="xMinYMin meet" style="width:100%;height:auto;display:block">
<defs><linearGradient id="intGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0052CC"/><stop offset="100%" stop-color="#E91E8C"/></linearGradient></defs>
<style>
  svg text {
    font-family: var(--font-sans);
  }
  g[data-step] rect,
  g[data-step] text {
    transition: transform 0.18s ease, filter 0.18s ease, stroke 0.18s ease;
  }
  g[data-step] > rect:first-child {
    transform-box: fill-box;
    transform-origin: center;
  }
  g[data-step]:hover > rect:first-child {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 6px rgba(15, 23, 42, 0.12));
    stroke: rgba(148, 163, 184, 0.45);
  }
</style>
<g opacity="1"><rect x="283" y="2" width="188" height="36" rx="8" fill="#E91E8C12" stroke="#E91E8C35" stroke-width="1"/><text x="377" y="25" text-anchor="middle" fill="#E91E8C" font-size="12" font-weight="700">Пациент</text></g>
<g opacity="1"><rect x="493" y="2" width="188" height="36" rx="8" fill="#2EC4B612" stroke="#2EC4B635" stroke-width="1"/><text x="587" y="25" text-anchor="middle" fill="#2EC4B6" font-size="12" font-weight="700">Регистратор</text></g>
<g opacity="1"><rect x="693" y="2" width="188" height="36" rx="8" fill="#3A9BD912" stroke="#3A9BD935" stroke-width="1"/><text x="787" y="25" text-anchor="middle" fill="#3A9BD9" font-size="12" font-weight="700">Врач</text></g>
<g><rect x="0" y="58" width="44" height="346" rx="6" fill="#F0FDF9" stroke="#2EC4B630" stroke-width="1"/><text x="22" y="235" text-anchor="middle" fill="#2EC4B6" font-size="9" font-weight="700" transform="rotate(-90, 22, 235)">РЕГИСТРАТУРА</text></g>
<g><rect x="0" y="408" width="44" height="346" rx="6" fill="#EFF6FF" stroke="#3A9BD930" stroke-width="1"/><text x="22" y="581" text-anchor="middle" fill="#3A9BD9" font-size="9" font-weight="700" transform="rotate(-90, 22, 581)">ПРОФОСМОТР</text></g>
<g opacity="1">
  <rect x="272" y="44" width="200" height="710" rx="16" fill="#E91E8C08"/>
  <rect x="482" y="44" width="200" height="710" rx="16" fill="#2EC4B608"/>
  <rect x="692" y="44" width="194" height="710" rx="16" fill="#3A9BD908"/>
</g>
<g data-step="1" style="cursor:pointer"><rect x="50" y="60" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="92" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">1. Запись в Регистратуру</text><text x="230" y="92" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="2" style="cursor:pointer"><rect x="50" y="130" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="162" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">2. Вызов пациента в окно</text><text x="230" y="162" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="3" style="cursor:pointer"><rect x="50" y="200" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="232" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">3. Уведомление пациента</text><text x="230" y="232" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="4" style="cursor:pointer"><rect x="50" y="270" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="302" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">4. Оформление услуг</text><text x="230" y="302" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="5" style="cursor:pointer"><rect x="50" y="340" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="372" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">5. Завершение обслуживания</text><text x="230" y="372" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>

<g data-step="6" style="cursor:pointer"><rect x="50" y="410" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="442" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">6. Запись на Профосмотр</text><text x="230" y="442" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="7" style="cursor:pointer"><rect x="50" y="480" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="512" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">7. Вызов пациента в кабинет</text><text x="230" y="512" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="8" style="cursor:pointer"><rect x="50" y="550" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="582" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">8. Уведомление пациента</text><text x="230" y="582" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="9" style="cursor:pointer"><rect x="50" y="620" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="652" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">9. Осмотр пациента</text><text x="230" y="652" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>
<g data-step="10" style="cursor:pointer"><rect x="50" y="690" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="135" y="722" text-anchor="middle" dominant-baseline="middle" fill="#2D6A4F" font-size="10" font-weight="600">10. Завершение обслуживания</text><text x="230" y="722" dominant-baseline="middle" fill="#2D6A4F" font-size="12" style="pointer-events:none">›</text></g>



<g opacity="1" style="cursor:pointer" data-step="1"><rect x="283" y="65" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2.5" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="372" y="91" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="372" dy="-6">Мобильное приложение</tspan><tspan x="372" dy="14">Терминал</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="2"><rect x="493" y="135" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="582" y="161" text-anchor="middle" dominant-baseline="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none">Виджет на рабочем столе</text></g>
<g opacity="1" style="cursor:pointer" data-step="3"><rect x="283" y="205" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="372" y="231" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="372" dy="-6">Мобильное приложение</tspan><tspan x="372" dy="14">Экран вызова на ТВ</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="4"><rect x="493" y="275" width="178" height="52" rx="10" fill="#0052CC10" stroke="#0052CC" stroke-width="2" style="filter:drop-shadow(rgba(0,82,204,0.094) 0px 2px 6px)"/><text x="582" y="301" text-anchor="middle" dominant-baseline="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none">ЕЦП.МИС</text></g>
<g opacity="1" style="cursor:pointer" data-step="5"><rect x="493" y="345" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="582" y="371" text-anchor="middle" dominant-baseline="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none">Виджет на рабочем столе</text></g>
<g opacity="1" data-step="6" style="cursor:pointer"><rect x="280" y="418" width="604" height="50" rx="12" fill="url(#intGrad)" fill-opacity="0.22" stroke="url(#intGrad)" stroke-width="3" style="filter:drop-shadow(rgba(0,0,0,0.12) 0px 2px 8px)"/><text x="534" y="446" text-anchor="middle" fill="#0052CC" font-size="11" font-weight="700">ЕЦП МИС</text><text x="582" y="446" text-anchor="middle" fill="#4A5568" font-size="11">›</text><text x="630" y="446" text-anchor="middle" fill="#E91E8C" font-size="11" font-weight="700">ВнеОчереди</text></g>
<g data-step="7" style="cursor:pointer"><rect x="703" y="485" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="792" y="511" text-anchor="middle" dominant-baseline="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none">Виджет на рабочем столе</text></g>
<g opacity="1" style="cursor:pointer" data-step="8"><rect x="283" y="555" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="372" y="581" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="372" dy="-6">Мобильное приложение</tspan><tspan x="372" dy="14">Экран вызова на ТВ</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="9"><rect x="703" y="625" width="178" height="52" rx="10" fill="#0052CC10" stroke="#0052CC" stroke-width="2" style="filter:drop-shadow(rgba(0,82,204,0.094) 0px 2px 6px)"/><text x="792" y="651" text-anchor="middle" dominant-baseline="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none">ЕЦП.МИС</text></g>
<g opacity="1" style="cursor:pointer" data-step="10"><rect x="703" y="695" width="178" height="52" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="792" y="721" text-anchor="middle" dominant-baseline="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none">Виджет на рабочем столе</text></g>
</svg>`

  return (
    <section id="process" className="section-padding bg-light">
      <div className="section-container">
        <div className="mb-8 md:mb-10">
          <h2 className="type-section-title text-dark">
            Схема процесса
          </h2>
        </div>

        <div ref={containerRef} className="overflow-x-auto pb-4 -mx-2 px-2 md:mx-0 md:px-0">
          <div className="rounded-2xl bg-white border border-black/5 shadow-soft px-4 md:px-[62px] py-[18px]">
            <div className="w-full" dangerouslySetInnerHTML={{ __html: svgHTML }} />
          </div>
        </div>
      </div>
    </section>
  )
}
