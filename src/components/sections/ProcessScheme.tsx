export default function ProcessScheme() {
  const svgHTML = '<svg viewBox="0 0 1002 776" preserveAspectRatio="xMinYMin meet" style="min-width:1002px;height:776px;display:block"><text x="500" y="200" text-anchor="middle" font-size="20">TEST SVG LOADED</text></svg>';
  return (
    <section id="process" className="section-padding bg-light">
      <div className="section-container">
        <h2 className="text-3xl font-bold">Схема процесса</h2>
        <div className="rounded-2xl bg-white border border-black/5 shadow-soft p-4">
          <div dangerouslySetInnerHTML={{ __html: svgHTML }} />
        </div>
      </div>
    </section>
  )
}
