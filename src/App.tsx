import { useState, useCallback } from 'react'
import ProcessOverview from './components/ProcessOverview'
import ProcessScheme from './components/sections/ProcessScheme'
import StepModal from './components/StepModal'

function App() {
  const [activeStep, setActiveStep] = useState<number | null>(() => {
    const params = new URLSearchParams(window.location.search)
    const step = parseInt(params.get('step') || '', 10)
    return isNaN(step) ? null : step
  })

  const handleOpenStep = useCallback((step: number) => {
    setActiveStep(step)
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(step))
    window.history.replaceState({}, '', url)
  }, [])

  const handleCloseStep = useCallback(() => {
    setActiveStep(null)
    const url = new URL(window.location.href)
    url.searchParams.delete('step')
    window.history.replaceState({}, '', url)
  }, [])

  const handleNextStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev !== null && prev < 10 ? prev + 1 : prev
      if (next !== null && next !== prev) {
        const url = new URL(window.location.href)
        url.searchParams.set('step', String(next))
        window.history.replaceState({}, '', url)
      }
      return next
    })
  }, [])

  const handlePrevStep = useCallback(() => {
    setActiveStep((prev) => {
      const prevStep = prev !== null && prev > 1 ? prev - 1 : prev
      if (prevStep !== null && prevStep !== prev) {
        const url = new URL(window.location.href)
        url.searchParams.set('step', String(prevStep))
        window.history.replaceState({}, '', url)
      }
      return prevStep
    })
  }, [])

  return (
    <div className="min-h-screen bg-light">
      <main>
        <ProcessOverview onOpenStep={handleOpenStep} />
        <ProcessScheme />
      </main>

      <StepModal
        step={activeStep}
        onClose={handleCloseStep}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
      />
    </div>
  )
}

export default App
