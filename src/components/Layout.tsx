import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <main className="pb-10">{children}</main>
      <Footer />
    </div>
  )
}
