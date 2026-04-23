export default function Step4Detail() {
  const pages = [
    { num: 3, label: 'Выбор пациента' },
    { num: 4, label: 'Поиск в базе' },
    { num: 5, label: 'Карточка пациента' },
    { num: 6, label: 'Назначение услуг' },
    { num: 7, label: 'Список услуг' },
    { num: 8, label: 'Добавление услуги' },
    { num: 9, label: 'Подтверждение' },
    { num: 10, label: 'Сохранение' },
    { num: 11, label: 'Результат' },
    { num: 12, label: 'Печать направления' },
    { num: 13, label: 'Сертификат' },
    { num: 14, label: 'Завершение' },
  ]

  return (
    <div className="space-y-8">
      <div className="card p-6 md:p-8">
        <h3 className="text-lg font-bold text-dark mb-3">Описание процесса</h3>
        <p className="text-muted leading-relaxed">
          Регистратор оформляет услуги пациента непосредственно в МИС «ЕЦП». Система автоматически проверяет полис,
          прикрепление к МО и доступность выбранных услуг. После оформления данные синхронизируются с «ВнеОчередию»
          для дальнейшего управления очередью.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <div key={page.num} className="card overflow-hidden">
            <img
              src={`/images/step4/page-${page.num}.png`}
              alt={`ЕЦП МИС — ${page.label}`}
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-4">
              <div className="text-sm font-semibold text-dark">{page.label}</div>
              <div className="text-xs text-muted">Страница {page.num}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
