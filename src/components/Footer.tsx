export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-black/5 h-10 flex items-center justify-between px-6 text-xs text-[#4A5568]">
      <span style={{ fontFamily: 'Inter, sans-serif' }}>
        Интеграция АИС УЭО «ВнеОчереди» и МИС «ЕЦП»
      </span>
      <span style={{ fontFamily: 'Inter, sans-serif' }}>
        © {new Date().getFullYear()} МИАЦ ЯНАО
      </span>
    </footer>
  )
}
