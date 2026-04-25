# MIAC Website — Структура проекта

> Дата: 2026-04-25
> Путь на сервере: `/var/www/miac/`
> Репозиторий: `gitrews/miac`
> Сайт: https://yamiac.ru

---

## 1. Общая архитектура

- **Фреймворк:** React + Vite + TypeScript
- **Стили:** Tailwind CSS
- **Анимации:** Framer Motion
- **Сборка:** `npm run build` → `/dist/`
- **Деплой:** Caddy серверит `/var/www/miac/dist/`

---

## 2. Файловая структура

```
/var/www/miac/
├── index.html              # Точка входа (Vite)
├── step2.html              # Отдельная страница шага 2 (рабочий стол регистратора)
├── vite.config.ts          # Конфиг Vite
├── src/
│   ├── main.tsx            # Точка входа React
│   ├── App.tsx             # Главная страница (сборка всех секций)
│   ├── index.css           # Глобальные стили
│   ├── pages/              # Страницы (если появятся)
│   ├── components/
│   │   ├── sections/       # Большие секции страницы
│   │   │   ├── ProcessScheme.tsx    # SVG-схема процесса (блоки + стрелки)
│   │   │   ├── Hero.tsx             # Шапка сайта
│   │   │   ├── KPICards.tsx         # KPI-карточки
│   │   │   ├── Cases.tsx            # Кейсы
│   │   │   ├── CTA.tsx              # Призыв к действию
│   │   │   └── StepsTimeline.tsx    # Старый таймлайн (не используется?)
│   │   ├── Layout.tsx        # Обёртка страницы
│   │   ├── Navbar.tsx        # Навигация
│   │   ├── Hero.tsx          # Главный баннер
│   │   ├── ProcessOverview.tsx # Схема процесса (SVG + кликабельные блоки)
│   │   ├── StepTimeline.tsx  # Этапы процесса (10 карточек)
│   │   ├── RolesInteractions.tsx # Роли и задачи (5 карточек)
│   │   ├── CasesSection.tsx  # Раздел кейсов
│   │   ├── StepModal.tsx     # Модальное окно шагов (1-10)
│   │   ├── StepOverlay.tsx   # Оверлей шагов (альтернатива модалу)
│   │   ├── WidgetShowcase.tsx # Карусель виджетов
│   │   ├── FinalCTA.tsx      # Финальный CTA
│   │   ├── Footer.tsx        # Подвал
│   │   └── icons/            # SVG-иконки
│   └── scripts/              # Вспомогательные скрипты
└── dist/                     # Production build (генерируется автоматически)
```

---

## 3. Как открываются шаги

### 3.1 Главная страница
- URL: `https://yamiac.ru/`
- Компонент: `App.tsx` → собирает все секции

### 3.2 Модальное окно шага (1-10)
- URL: `https://yamiac.ru/?step=N` (где N = 1..10)
- Компонент: `StepModal.tsx`
- Логика в `App.tsx`:
  - `activeStep` (state) — текущий открытый шаг
  - `openStep(step)` — открывает шаг и меняет URL
  - `closeStep()` — закрывает и убирает `?step` из URL

### 3.3 Отдельная страница шага 2
- URL: `https://yamiac.ru/step2.html`
- Файл: `step2.html` (статический HTML, вне React)

---

## 4. Где что менять

### 4.1 Текст карточек «Этапы процесса» (главная страница)
- **Файл:** `src/components/StepTimeline.tsx`
- **Массив:** `steps[]` (10 элементов, шаги 1-10)
- **Поля:** `title`, `system`, `role`, `description`
- **Пример:**
  ```typescript
  {
    step: 6,
    title: 'Запись на Профосмотр',
    system: 'Интеграция ЕЦП→ВнеОчереди',
    systemColor: '#0052CC',
    role: 'ЕЦП.МИС',
    roleColor: '#0052CC',
    description: 'ЕЦП.МИС создаёт запись в системе ВнеОчереди, передавая перечень услуг пациента',
  }
  ```

### 4.2 Текст карточек «Роли и задачи»
- **Файл:** `src/components/RolesInteractions.tsx`
- **Массив:** `roles[]` (5 элементов)
- **Роли:** Пациент, Регистратор, Врач, ВнеОчереди, ЕЦП.МИС
- **Поля:** `title`, `description`, `actions[]` (4 пункта под каждой ролью)

### 4.3 Содержимое модальных окон шагов (1-10)
- **Файл:** `src/components/StepModal.tsx`
- **Функция:** `renderStepContent(step)` — switch по шагам
- **Контент каждого шага:**
  | Шаг | Компонент | Описание |
  |-----|-----------|----------|
  | 1 | `StepOneContent()` | Запись: мобильное приложение + терминал |
  | 2 | `QueueWidgetContent("регистратор")` | Виджет вызова для регистратора |
  | 3 | `NotificationContent()` | Уведомления (ТВ + мобильное) |
  | 4 | `MisContent(title)` | Интерфейс МИС ЕЦП (оформление услуг) |
  | 5 | `CompletionContent(title)` | Завершение в регистратуре |
  | **6** | **`IntegrationContent()`** | **Интеграция API МИС→ВнеОчереди** |
  | 7 | `QueueWidgetContent("врач")` | Виджет вызова для врача |
  | 8 | `NotificationContent()` | Уведомления в кабинет |
  | 9 | `MisContent(title)` | Интерфейс врача в МИС |
  | 10 | `CompletionContent(title)` | Завершение профосмотра |

### 4.4 Шаг 6 — интеграция API (важно!)
- **Компонент:** `IntegrationContent()` (строка ~650 в StepModal.tsx)
- **Состоит из:**
  1. Вводный текст (параграф)
  2. Блок с кодом — пример API-запроса (`POST /integration/api/v1/customer/appointments/create`)
  3. Карточки этапов — массив `integrationSteps[]` (строка ~115)
  4. Преимущества — массив `integrationBenefits[]` (строка ~122)
  5. Ссылка на документацию API

- **Массив `integrationSteps`:**
  ```typescript
  const integrationSteps = [
    { label: '1. МИС ЕЦП формирует маршрут пациента', desc: 'Определяются кабинет, поток, услуга и слот приёма.' },
    { label: '2. Создаётся запись во «ВнеОчереди»', desc: 'МИС отправляет API-запрос на создание электронного талона.' },
    { label: '3. Возвращается shortCode и идентификатор записи', desc: 'Система очереди подтверждает создание талона и время обслуживания.' },
    { label: '4. Статусы синхронизируются между системами', desc: 'Дальнейший вызов и завершение отражаются и в МИС, и во «ВнеОчереди».' },
  ]
  ```

- **Массив `integrationBenefits`:**
  ```typescript
  const integrationBenefits = [
    'Автоматическая запись в нужную очередь без участия сотрудника',
    'Единый цифровой маршрут от регистратуры до кабинета врача',
    'Снижение ошибок при ручной маршрутизации пациента',
    'Одинаковый источник правды для МИС и электронной очереди',
  ]
  ```

### 4.5 SVG-схема процесса
- **Файл:** `src/components/sections/ProcessScheme.tsx`
- **Формат:** Inline SVG (HTML-строка внутри JS)
- **Структура:** Блоки с `data-step="N"` для кликабельности
- **Примечание:** Шаги в SVG пронумерованы иначе (6 → "Вызов пациента в кабинет", нет шага интеграции)

---

## 5. Рабочий процесс правок

1. **Править** нужный файл в `src/`
2. **Собрать:** `npm run build` (генерирует `dist/`)
3. **Проверить:** `https://yamiac.ru/?step=N` (если менял шаг)
4. **Закоммитить:** `git add -A && git commit -m "..." && git push`

---

## 6. Быстрые ссылки

| Что менять | Файл | Строки |
|---|---|---|
| Карточки этапов (10 шт.) | `src/components/StepTimeline.tsx` | ~20-90 |
| Карточки ролей (5 шт.) | `src/components/RolesInteractions.tsx` | ~15-80 |
| Модальное окно шага 6 | `src/components/StepModal.tsx` | ~650-700 (IntegrationContent) |
| Этапы интеграции (4 шт.) | `src/components/StepModal.tsx` | ~115-120 (integrationSteps) |
| Преимущества интеграции | `src/components/StepModal.tsx` | ~122-127 (integrationBenefits) |
| Заголовки шагов (1-10) | `src/components/StepModal.tsx` | ~11-25 (stepTitles) |
| Лейблы ролей шагов | `src/components/StepModal.tsx` | ~30-55 (stepLabels) |
| SVG-схема | `src/components/sections/ProcessScheme.tsx` | весь SVG |
