# Сервер (Go)

## Запуск

1. Убедитесь, что PostgreSQL запущен (Docker: `cd docker && docker-compose up -d`).
2. Примените миграции (см. `migrations/` и `docker/README.md`).
3. Задайте переменные окружения (или создайте `.env` в корне проекта):

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=climbing_gym
DB_SSLMODE=disable
PORT=8080
```

4. Запуск:

```bash
go run cmd/server/main.go
```

Сервер слушает на `http://localhost:8080`.

## API

- `GET /api/groups` — список групп с количеством записей
- `POST /api/bookings` — создание записи (body: groupId, planId, participantName, participantPhone, participantEmail)
- `GET /health` — проверка работы сервера
