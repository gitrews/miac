export default function Step1Detail() {
  return (
    <div className="space-y-8">
      <div className="card p-6 md:p-8">
        <h3 className="text-lg font-bold text-dark mb-3">Описание процесса</h3>
        <p className="text-muted leading-relaxed">
          Пациент записывается на приём через портал или на ресепшене. Данные автоматически попадают в систему «ВнеОчереди»,
          где формируется электронный талон. Регистратор видит запись в своём рабочем месте и может управлять очередью
          в реальном времени.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card overflow-hidden">
          <img src="/images/step1-mp-1.png" alt="Мобильный портал — запись" className="w-full h-64 object-cover" />
          <div className="p-4">
            <div className="text-sm font-semibold text-dark">Мобильный портал</div>
            <div className="text-xs text-muted">Экран выбора услуги для записи</div>
          </div>
        </div>
        <div className="card overflow-hidden">
          <img src="/images/step1-mp-2.png" alt="Мобильный портал — подтверждение" className="w-full h-64 object-cover" />
          <div className="p-4">
            <div className="text-sm font-semibold text-dark">Подтверждение записи</div>
            <div className="text-xs text-muted">Выбор даты и времени приёма</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card overflow-hidden">
          <img src="/images/step1-term-1.jpg" alt="Терминал — начало" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="text-sm font-semibold text-dark">Терминал самозаписи</div>
            <div className="text-xs text-muted">Начальный экран</div>
          </div>
        </div>
        <div className="card overflow-hidden">
          <img src="/images/step1-term-2.jpg" alt="Терминал — услуги" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="text-sm font-semibold text-dark">Выбор услуги</div>
            <div className="text-xs text-muted">Список доступных направлений</div>
          </div>
        </div>
        <div className="card overflow-hidden">
          <img src="/images/step1-term-3.jpg" alt="Терминал — талон" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="text-sm font-semibold text-dark">Печать талона</div>
            <div className="text-xs text-muted">Финальный экран с номером очереди</div>
          </div>
        </div>
      </div>
    </div>
  )
}
