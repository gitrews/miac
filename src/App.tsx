import { useState, useCallback, useEffect } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProcessOverview from './components/ProcessOverview'
import RolesInteractions from './components/RolesInteractions'
import StepTimeline from './components/StepTimeline'
import StepModal from './components/StepModal'
import ImagePreloader from './components/ImagePreloader'

function App() {
  const [activeStep, setActiveStep] = useState<number | null>(() => {
    const params = new URLSearchParams(window.location.search)
    const step = parseInt(params.get('step') || '', 10)
    return isNaN(step) ? null : step
  })

  const openStep = useCallback((step: number) => {
    setActiveStep(step)
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(step))
    window.history.pushState({ step }, '', url.toString())
  }, [])

  const closeStep = useCallback(() => {
    setActiveStep(null)
    const url = new URL(window.location.href)
    if (url.searchParams.has('step')) {
      url.searchParams.delete('step')
      window.history.replaceState({}, '', url.pathname + url.search)
    }
  }, [])

  const nextStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev !== null && prev < 10 ? prev + 1 : prev
      if (next !== prev && next !== null) {
        const url = new URL(window.location.href)
        url.searchParams.set('step', String(next))
        window.history.pushState({ step: next }, '', url.toString())
      }
      return next
    })
  }, [])

  const prevStep = useCallback(() => {
    setActiveStep((prev) => {
      const prevStep = prev !== null && prev > 1 ? prev - 1 : prev
      if (prevStep !== prev && prevStep !== null) {
        const url = new URL(window.location.href)
        url.searchParams.set('step', String(prevStep))
        window.history.pushState({ step: prevStep }, '', url.toString())
      }
      return prevStep
    })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const step = parseInt(params.get('step') || '', 10)
      if (isNaN(step)) {
        setActiveStep(null)
      } else {
        setActiveStep(step)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <Layout onOpenStep={openStep}>
      <ImagePreloader />
      <Hero />
      <ProcessOverview onOpenStep={openStep} />
      <StepTimeline onOpenStep={openStep} />
      <RolesInteractions />
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
