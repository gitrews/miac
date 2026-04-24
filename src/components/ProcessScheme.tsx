export default function ProcessScheme() {
  const svgHTML = `<svg viewBox="0 0 1002 776" preserveAspectRatio="xMinYMin meet" style="width:100%;max-width:1002px;height:auto;display:block">
<defs><linearGradient id="intGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0052CC"/><stop offset="100%" stop-color="#E91E8C"/></linearGradient></defs>
<g opacity="1"><rect x="274" y="2" width="196" height="36" rx="8" fill="#2EC4B612" stroke="#2EC4B635" stroke-width="1"/><text x="372" y="25" text-anchor="middle" fill="#2EC4B6" font-size="12" font-weight="700">Пациент</text></g>
<g opacity="1"><rect x="484" y="2" width="196" height="36" rx="8" fill="#3A9BD912" stroke="#3A9BD935" stroke-width="1"/><text x="582" y="25" text-anchor="middle" fill="#3A9BD9" font-size="12" font-weight="700">Регистратор</text></g>
<g opacity="1"><rect x="694" y="2" width="196" height="36" rx="8" fill="#1E3A5F12" stroke="#1E3A5F35" stroke-width="1"/><text x="792" y="25" text-anchor="middle" fill="#1E3A5F" font-size="12" font-weight="700">Врач</text></g>
<g><rect x="0" y="58" width="44" height="346" rx="6" fill="#EBF5FF" stroke="#3A9BD930" stroke-width="1"/><text x="22" y="235" text-anchor="middle" fill="#3A9BD9" font-size="9" font-weight="700" transform="rotate(-90, 22, 235)">РЕГИСТРАТУРА</text></g>
<g><rect x="0" y="478" width="44" height="276" rx="6" fill="#E8EEF4" stroke="#1E3A5F30" stroke-width="1"/><text x="22" y="620" text-anchor="middle" fill="#1E3A5F" font-size="9" font-weight="700" transform="rotate(-90, 22, 620)">ПРОФОСМОТР</text></g>
<g data-step="1" style="cursor:pointer"><rect x="50" y="60" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="95" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">1. Запись в Регистратуру</text><line x1="260" y1="56" x2="902" y2="56" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="2" style="cursor:pointer"><rect x="50" y="130" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="165" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">2. Вызов пациентов в окно</text><line x1="260" y1="126" x2="902" y2="126" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="3" style="cursor:pointer"><rect x="50" y="200" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="235" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">3. Уведомление пациента</text><line x1="260" y1="196" x2="902" y2="196" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="4" style="cursor:pointer"><rect x="50" y="270" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="305" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">4. Оформление услуг</text><line x1="260" y1="266" x2="902" y2="266" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="5" style="cursor:pointer"><rect x="50" y="340" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="375" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">5. Завершение обслуживания</text><line x1="260" y1="336" x2="902" y2="336" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g><line x1="260" y1="406" x2="902" y2="406" stroke="rgba(0,0,0,0.03)" stroke-width="1"/></g>
<g data-step="6" style="cursor:pointer"><rect x="50" y="480" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="515" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">6. Вызов пациента в кабинет</text><line x1="260" y1="476" x2="902" y2="476" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="7" style="cursor:pointer"><rect x="50" y="550" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="585" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">7. Уведомление пациента</text><line x1="260" y1="546" x2="902" y2="546" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="8" style="cursor:pointer"><rect x="50" y="620" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="655" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">8. Осмотр пациента</text><line x1="260" y1="616" x2="902" y2="616" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<g data-step="9" style="cursor:pointer"><rect x="50" y="690" width="200" height="62" rx="6" fill="rgba(46,196,182,0.06)" stroke="rgba(46,196,182,0.15)" stroke-width="1"/><text x="150" y="725" text-anchor="middle" fill="#2D6A4F" font-size="10" font-weight="600">9. Завершение обслуживания</text><line x1="260" y1="686" x2="902" y2="686" stroke="rgba(0,0,0,0.06)" stroke-width="1"/></g>
<line x1="272" y1="44" x2="272" y2="761" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
<line x1="482" y1="44" x2="482" y2="761" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
<line x1="692" y1="44" x2="692" y2="761" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
<g opacity="1" style="cursor:pointer" data-step="1"><rect x="283" y="68" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2.5" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="372" y="89" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="372" dy="0">Мобильное приложение</tspan><tspan x="372" dy="14">Терминал</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="2"><rect x="493" y="138" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="582" y="159" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="582" dy="0">Виджет на рабочем столе</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="3"><rect x="283" y="208" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="372" y="229" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="372" dy="0">Мобильное приложение</tspan><tspan x="372" dy="14">Экран вызова на ТВ</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="4"><rect x="493" y="278" width="178" height="46" rx="10" fill="#0052CC10" stroke="#0052CC" stroke-width="2" style="filter:drop-shadow(rgba(0,82,204,0.094) 0px 2px 6px)"/><text x="582" y="299" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="582" dy="0">ЕЦП.МИС</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="5"><rect x="493" y="348" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="582" y="369" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="582" dy="0">Виджет на рабочем столе</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="7"><rect x="703" y="488" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="792" y="509" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="792" dy="0">Виджет на рабочем столе</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="7"><rect x="283" y="558" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="372" y="579" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="372" dy="0">Мобильное приложение</tspan><tspan x="372" dy="14">Экран вызова на ТВ</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="8"><rect x="703" y="628" width="178" height="46" rx="10" fill="#0052CC10" stroke="#0052CC" stroke-width="2" style="filter:drop-shadow(rgba(0,82,204,0.094) 0px 2px 6px)"/><text x="792" y="649" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="792" dy="0">ЕЦП.МИС</tspan></text></g>
<g opacity="1" style="cursor:pointer" data-step="9"><rect x="703" y="698" width="178" height="46" rx="10" fill="#E91E8C10" stroke="#E91E8C" stroke-width="2" style="filter:drop-shadow(rgba(233,30,140,0.094) 0px 2px 6px)"/><text x="792" y="719" text-anchor="middle" fill="#1A2B3C" font-size="11" font-weight="600" style="pointer-events:none"><tspan x="792" dy="0">Виджет на рабочем столе</tspan></text></g>
<g opacity="1"><rect x="280" y="416" width="604" height="50" rx="12" fill="url(#intGrad)" fill-opacity="0.12" stroke="url(#intGrad)" stroke-width="2.5" style="filter:drop-shadow(rgba(233,30,140,0.145) 0px 0px 12px)"/><text x="534" y="444" text-anchor="middle" fill="#0052CC" font-size="11" font-weight="700">ЕЦП МИС</text><text x="582" y="444" text-anchor="middle" fill="#4A5568" font-size="11">→</text><text x="630" y="444" text-anchor="middle" fill="#E91E8C" font-size="11" font-weight="700">ВнеОчереди</text></g>
<g transform="translate(922, 18)"><rect x="0" y="0" width="70" height="54" rx="8" fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.08)" stroke-width="1"/><text x="8" y="13" fill="#1A2B3C" font-size="8" font-weight="600">СИСТЕМА</text><rect x="8" y="20" width="10" height="10" rx="3" fill="#E91E8C" opacity="0.7"/><text x="22" y="29" fill="#4A5568" font-size="8">ВнеОчереди</text><rect x="8" y="36" width="10" height="10" rx="3" fill="#0052CC" opacity="0.7"/><text x="22" y="45" fill="#4A5568" font-size="8">ЕЦП МИС</text></g>
</svg>`;

  return (
    <section id="scheme-section" className="section-padding bg-light">
      <div className="section-container">
        <div className="mb-10">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-full px-3 py-1 mb-4">
            Схема
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">
            Процесс интеграции
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Столбец = роль. Строка = шаг процесса. Хронология: сверху вниз.
          </p>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="lg:hidden flex items-center gap-2 mb-4 text-sm text-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Листайте вправо
          </div>

          <div className="rounded-2xl bg-white border border-black/5 shadow-soft p-4 md:p-6">
            <div dangerouslySetInnerHTML={{ __html: svgHTML }} />
          </div>
        </div>
      </div>
    </section>
  )
}
