import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  onOpenStep?: (step: number) => void
}

export default function Layout({ children, onOpenStep }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenStep={onOpenStep} />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  )
}
