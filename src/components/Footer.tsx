export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./images/yamal-checkup-logo.svg" alt="Logo" className="h-7 w-auto opacity-70" />
            <span className="text-sm font-medium text-slate-300">
              Интеграция АИС УЭО «ВнеОчереди» и МИС «ЕЦП»
            </span>
          </div>
          <span className="text-xs">
            © {new Date().getFullYear()} МИАЦ ЯНАО
          </span>
        </div>
      </div>
    </footer>
  )
}
