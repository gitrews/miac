import { Clock, FileText, Monitor, Bell, CheckCircle } from 'lucide-react'

const stepContent: Record<number, { icon: React.ElementType; desc: string; image?: string }> = {
  3: { icon: Bell, desc: 'Пациент получает уведомление о приближении своей очереди через SMS или push-уведомление в мобильном приложении.', image: '/images/step3/mp-notification.png' },
  5: { icon: CheckCircle, desc: 'Регистратор завершает обслуживание пациента, закрывает талон и передаёт информацию в очередь кабинета врача.', image: '/images/mis-registrar-queue-success.jpg' },
  6: { icon: FileText, desc: 'Из МИС ЕЦП автоматически создаётся запись на профосмотр в системе ВнеОчереди. Пациент получает уведомление с датой и временем.', image: '/images/mis-registrar-select-certificate.jpg' },
  7: { icon: Monitor, desc: 'Врач вызывает следующего пациента из электронной очереди. На ТВ-экране в коридоре отображается номер кабинета и ФИО пациента.', image: '/images/step3/mp-awaiting.jpg' },
  8: { icon: Bell, desc: 'Пациент получает повторное уведомление о вызове в кабинет врача для прохождения диспансеризации.', image: '/images/widget-awaiting-call.png' },
  9: { icon: FileText, desc: 'Врач проводит осмотр пациента, вносит данные в электронную медицинскую карту МИС ЕЦП и формирует заключение.', image: '/images/mis-registrar-exam-form.jpg' },
  10: { icon: CheckCircle, desc: 'Приём завершён. Система обновляет статус очереди и предлагает пациенту пройти дополнительные обследования при необходимости.', image: '/images/widget-serving.png' },
}

interface StepPlaceholderProps {
  step: number
}

export default function StepPlaceholder({ step }: StepPlaceholderProps) {
  const content = stepContent[step]
  const Icon = content?.icon || Clock

  return (
    <div className="space-y-8">
      <div className="card p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-dark mb-2">Описание шага</h3>
            <p className="text-muted leading-relaxed">
              {content?.desc || `Детальное описание шага ${step} находится в разработке. Здесь будет полноценный экран с пошаговым руководством и скриншотами интерфейса.`}
            </p>
          </div>
        </div>
      </div>

      {content?.image && (
        <div className="card overflow-hidden">
          <img src={content.image} alt={`Шаг ${step}`} className="w-full max-h-[70vh] object-contain bg-light" />
        </div>
      )}

      {!content?.image && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-8 flex flex-col items-center justify-center text-center min-h-[240px]">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-4">
              <FileText size={28} />
            </div>
            <div className="text-base font-semibold text-dark mb-1">Макет экрана 1</div>
            <div className="text-sm text-muted max-w-[240px]">Здесь позже появится основной контент шага.</div>
          </div>
          <div className="card p-8 flex flex-col items-center justify-center text-center min-h-[240px]">
            <div className="w-16 h-16 rounded-2xl bg-accent-50 text-accent-500 flex items-center justify-center mb-4">
              <Monitor size={28} />
            </div>
            <div className="text-base font-semibold text-dark mb-1">Макет экрана 2</div>
            <div className="text-sm text-muted max-w-[240px]">Пока используем заглушку, чтобы маршрут был доступен.</div>
          </div>
        </div>
      )}
    </div>
  )
}
