import { useParams } from 'react-router-dom'
import StepOverlay from '../components/StepOverlay'
import Step1Detail from './Step1Detail'
import Step4Detail from './Step4Detail'
import StepPlaceholder from './StepPlaceholder'

export default function StepRouter() {
  const { stepId } = useParams<{ stepId: string }>()
  const step = Number(stepId)

  const renderContent = () => {
    if (step === 1) return <Step1Detail />
    if (step === 2) {
      return (
        <div className="card overflow-hidden" style={{ height: 'calc(100vh - 200px)', minHeight: '400px' }}>
          <iframe
            src="/step2.html"
            title="Шаг 2 — Работа регистратора"
            className="w-full h-full border-0"
          />
        </div>
      )
    }
    if (step === 4) return <Step4Detail />
    return <StepPlaceholder step={step} />
  }

  return (
    <StepOverlay>
      {renderContent()}
    </StepOverlay>
  )
}
