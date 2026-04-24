export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./images/yamal-checkup-logo.svg" alt="Logo" className="h-7 w-auto opacity-70" />
            <a href="https://miac.yanao.ru/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              МИАЦ ЯНАО
            </a>
          </div>
          <a href="https://ocheredi.com" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
            2026 ВнеОчереди
          </a>
        </div>
      </div>
    </footer>
  )
}
