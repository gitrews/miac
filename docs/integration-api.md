# Методы API

## Основной сценарий интеграции

1. **Настройка интеграции**  
   МИС получает список мест, очередей и услуг через `POST /api/integration/places`.

2. **Создание или обновление пациента**  
   МИС создаёт или обновляет пациента в системе «ВнеОчереди». Возвращается `customerId`.

3. **Запись в очередь**  
   МИС отправляет `customerId`, оператора, место, очередь и список услуг. Система создаёт позицию в очереди.

## Подготовка к интеграции

- **Ключ доступа (`accessKey`)** — предоставляется командой «ВнеОчереди» при подключении интеграции.
- **Идентификаторы места, очереди и услуг** (`placeId`, `lineId`, `serviceId`) — предоставляются командой «ВнеОчереди» или получаются через метод `POST /api/integration/places`.
- Три API-вызова: получение справочников интеграции, создание пациента и запись в очередь.

## Шаг 1. Настройка интеграции

Метод возвращает список мест обслуживания, очередей и услуг, зарегистрированных на сервере. Используется при первоначальной настройке, чтобы получить `placeId`, `lineId` и `serviceId` для последующей записи пациента в очередь.

### POST /api/integration/places

### Параметры запроса

- `accessKey` — ключ доступа для аутентификации в API.

### Пример запроса

```http
POST /api/integration/places
Content-Type: application/json
```

```json
{
  "accessKey": "your-access-key"
}
```

### Пример ответа

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "places": [
    {
      "placeId": "8ca734a1-f3b4-4b9e-a9d4-838dfbf9008b",
      "name": "ГБУЗ \"СОКБ\" г. Салехард ул. Мира 39/6",
      "city": "Салехард",
      "address": "ул. Мира 39/6",
      "openTime": "08:00",
      "closeTime": "20:00",
      "latitude": 66.529844,
      "longitude": 66.614507,
      "tags": [],
      "lines": [
        {
          "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1",
          "name": "Профосмотр",
          "openTime": "08:00",
          "closeTime": "20:00",
          "isActive": true,
          "services": [
            {
              "serviceId": "Терапевт",
              "name": "Приём терапевта",
              "maxUnits": 1
            }
          ]
        }
      ]
    }
  ]
}
```

> **Примечание.** Метод можно вызвать один раз для получения `placeId` и `lineId`, а затем использовать эти параметры в запросе `POST /api/integration/line/join` без повторного вызова `POST /api/integration/places`.

## Шаг 2. Создание или обновление пациента

### POST /api/integration/customer/createOrUpdate

### Параметры запроса

- `accessKey` — ключ доступа для аутентификации в API.
- `customerId` — идентификатор пациента. `null` при создании нового.
- `externalId` — внешний идентификатор в МИС. `null`, если не используется.
- `person.firstName` — имя пациента.
- `person.middleName` — отчество пациента.
- `person.lastName` — фамилия пациента.
- `person.phone` — номер телефона, необязательно.
- `person.email` — email пациента, необязательно.
- `person.companyName` — организация пациента, необязательно.

### Пример запроса

```http
POST /api/integration/customer/createOrUpdate
Content-Type: application/json
```

```json
{
  "accessKey": "your-access-key",
  "customerId": null,
  "externalId": null,
  "person": {
    "firstName": "Иван",
    "middleName": "Иванович",
    "lastName": "Иванов",
    "phone": "+79991234567",
    "email": "svist@test.com",
    "companyName": "ООО Общество"
  }
}
```

### Пример ответа

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "customerId": "0c52c445020145b40760d99f12000000"
}
```

> **Примечание.** Использование одного и того же `externalId` будет возвращать один и тот же `customerId`.

## Шаг 3. Запись в очередь

### POST /api/integration/line/join

### Параметры запроса

- `accessKey` — ключ доступа для аутентификации в API.
- `customerId` — идентификатор пациента, полученный на шаге 2.
- `operator` — ФИО оператора в МИС.
- `placeId` — идентификатор места или кабинета, фиксированный для клиники. Предоставляется командой «ВнеОчереди» или получается через метод `POST /api/integration/places`.
- `lineId` — идентификатор очереди, фиксированный для клиники. Предоставляется командой «ВнеОчереди» или получается через метод `POST /api/integration/places`.
- `services` — массив услуг. Каждая услуга содержит `serviceId` — название или идентификатор услуги, может быть использовано название услуги из МИС.
- `customerComment` — комментарий пациента, необязательно.
- `staffComment` — комментарий сотрудника, необязательно.
- `deviceType` — тип устройства. `Browser` для записи из МИС.
- `priority` — флаг приоритетной записи. `false` по умолчанию.
- `additionalFields` — дополнительные поля в свободном формате, необязательно.

### Пример запроса

```http
POST /api/integration/line/join
Content-Type: application/json
```

```json
{
  "accessKey": "your-access-key",
  "customerId": "0c52c445020145b40760d99f12000000",
  "operator": "Петров Пётр Петрович",
  "placeId": "8ca734a1-f3b4-4b9e-a9d4-838dfbf9008b",
  "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1",
  "services": [
    { "serviceId": "Общий анализ мочи" },
    { "serviceId": "Прием (осмотр) врача - нарколога" },
    { "serviceId": "Прием (осмотр) врача - кардиолога" },
    { "serviceId": "Прием (осмотр) врача - гематолога" }
  ],
  "customerComment": "комментарий пациента",
  "staffComment": "комментарий сотрудника",
  "deviceType": "Browser",
  "priority": false,
  "additionalFields": {
    "Диагноз": "Здоров"
  }
}
```

### Пример ответа

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "appointment": {
    "id": "10761"
  },
  "success": true
}
```

> **Примечание.** Если передаются идентификаторы услуг МИС, то в настройках очереди для каждой услуги должны быть заданы алиасы — названия услуг из МИС.

## Дополнительные методы API

### POST /api/integration/line/todayPositions

Возвращает список позиций (талонов) в указанной очереди и месте за текущую дату.

### Параметры запроса

- `accessKey` — ключ доступа для аутентификации в API.
- `placeId` — идентификатор места обслуживания.
- `lineId` — идентификатор очереди.

### Пример запроса

```http
POST /api/integration/line/todayPositions
Content-Type: application/json
```

```json
{
  "accessKey": "your-access-key",
  "placeId": "8ca734a1-f3b4-4b9e-a9d4-838dfbf9008b",
  "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1"
}
```

### Пример ответа

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "positions": [
    {
      "positionId": 9906,
      "placeId": "8ca734a1-f3b4-4b9e-a9d4-838dfbf9008b",
      "placeName": "ГБУЗ \"СОКБ\" г. Салехард ул. Мира 39/6",
      "lineId": "427a81a3-1a32-068c-a8a7-e3fe533e2fd1",
      "lineName": "Профосмотр",
      "customerName": "Иванов Иван Иванович",
      "additionalFields": {},
      "serviceName": "Периодический профосмотр",
      "units": 1,
      "creationTimeUtc": "2024-01-12T02:34:00.8054432",
      "servicePoint": "Окно № 3",
      "operatorName": "Регистратор 3",
      "callTimeUtc": "2024-01-12T02:58:41.4932386",
      "serviceStartTimeUtc": "2024-01-12T02:59:14.832917"
    }
  ]
}
```
