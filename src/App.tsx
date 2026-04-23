import { useState, useCallback } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProcessOverview from './components/ProcessOverview'
import RolesInteractions from './components/RolesInteractions'
import StepTimeline from './components/StepTimeline'
import KPICards from './components/KPICards'
import CasesSection from './components/CasesSection'
import FinalCTA from './components/FinalCTA'
import StepModal from './components/StepModal'

function App() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const openStep = useCallback((step: number) => {
    setActiveStep(step)
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(step))
    window.history.replaceState({ step }, '', url.toString())
  }, [])

  const closeStep = useCallback(() => {
    setActiveStep(null)
    const url = new URL(window.location.href)
    url.searchParams.delete('step')
    window.history.replaceState({}, '', url.pathname + url.search)
  }, [])

  const nextStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev !== null && prev < 10 ? prev + 1 : prev
      if (next !== prev && next !== null) {
        const url = new URL(window.location.href)
        url.searchParams.set('step', String(next))
        window.history.replaceState({ step: next }, '', url.toString())
      }
      return next
    })
  }, [])

  const prevStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev !== null && prev > 1 ? prev - 1 : prev
      if (next !== prev && next !== null) {
        const url = new URL(window.location.href)
        url.searchParams.set('step', String(next))
        window.history.replaceState({ step: next }, '', url.toString())
      }
      return next
    })
  }, [])

  return (
    <Layout>
      <Hero />
      <ProcessOverview onOpenStep={openStep} />
      <RolesInteractions />
      <StepTimeline onOpenStep={openStep} />
      <KPICards />
      <CasesSection />
      <FinalCTA />
      <StepModal
        step={activeStep}
        onClose={closeStep}
        onNext={nextStep}
        onPrev={prevStep}
      />
    </Layout>
  )
}

export default App
