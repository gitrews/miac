import { useParams } from 'react-router-dom'
import Step1Detail from './Step1Detail'
import Step4Detail from './Step4Detail'

export default function StepRouter() {
  const { stepId } = useParams<{ stepId: string }>()
  const step = Number(stepId)

  if (step === 1) return <Step1Detail />
  if (step === 2) {
    return (
      <div className="pt-[72px] h-[100dvh]">
        <iframe
          src="/miac/step2.html"
          title="Шаг 2"
          className="w-full h-full border-0"
        />
      </div>
    )
  }
  if (step === 4) return <Step4Detail />

  return (
    <div className="pt-[72px] px-6 py-16 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(46,196,182,0.12)] border border-[rgba(46,196,182,0.24)] text-[#2EC4B6] text-xs font-bold tracking-wider uppercase mb-6">
        Заглушка
      </div>
      <h1 className="text-3xl font-bold text-[#1A2B3C] mb-4">
        Шаг {step} - Заглушка
      </h1>
      <p className="text-[#4A5568] max-w-xl mx-auto">
        Здесь будет полноценный экран шага {step}. Пока оставляем этот маршрут как временную заглушку.
      </p>
    </div>
  )
}
