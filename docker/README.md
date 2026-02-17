# Docker — PostgreSQL и pgAdmin

## Запуск

```bash
cd docker
docker-compose up -d
```

Проверка, что контейнеры работают:

```bash
docker-compose ps
```

Оба сервиса должны быть в состоянии `Up`. Подождите 10–15 секунд после старта.

- **PostgreSQL**: `localhost:5432`
- **pgAdmin (веб)**: http://localhost:5050

## Подключение к БД в pgAdmin (браузер, localhost:5050)

### 1. Вход в pgAdmin

1. Откройте в браузере: **http://localhost:5050**
2. **Email**: `admin@admin.com`
3. **Password**: `Admin123!`

### 2. Добавление сервера PostgreSQL

1. В левой панели: правый клик по **Servers** → **Register** → **Server**.
2. Вкладка **General**:
   - **Name**: `Climbing Gym` (любое имя).
3. Вкладка **Connection** (обязательно заполните так):
   - **Host name/address**: **`postgres`** (именно имя сервиса из docker-compose, не localhost)
   - **Port**: **5432**
   - **Maintenance database**: **climbing_gym**
   - **Username**: **postgres**
   - **Password**: **postgres**
   - Отметьте **Save password**.
4. Нажмите **Save**.

После этого в дереве слева появится сервер и база `climbing_gym`.

### 3. Создание таблиц (схема БД)

База `climbing_gym` уже создана контейнером. Чтобы создать таблицы и начальные данные:

1. В дереве слева: **Servers** → **Climbing Gym** → **Databases** → правый клик по **climbing_gym** → **Query Tool**.
2. Откройте файл **`migrations/000001_init_schema.up.sql`** из корня проекта (папка `work_sait`) и скопируйте весь текст.
3. Вставьте скрипт в окно Query Tool и нажмите **Execute** (F5) или кнопку ▶️.

Будут созданы:
- таблица **groups** — расписание групп (четверг, суббота, воскресенье);
- таблица **bookings** — записи клиентов (имя, телефон, email, группа, абонемент);
- индексы и начальные 9 строк в `groups`.

Альтернатива из терминала (если установлен [golang-migrate](https://github.com/golang-migrate/migrate)):

```bash
migrate -path migrations -database "postgres://postgres:postgres@localhost:5432/climbing_gym?sslmode=disable" up
```

Важно: при работе pgAdmin в Docker (через браузер на localhost:5050) в поле Host нужно указывать **`postgres`**, а не `localhost`. Иначе подключение к серверу не удастся.

## Подключение к PostgreSQL с вашего ПК (вне Docker)

Если подключаетесь к БД **не из pgAdmin в браузере**, а из приложения, DBeaver, psql или установленного на ПК pgAdmin:

- **Host**: `localhost` (или `127.0.0.1`)
- **Port**: `5432`
- **Database**: `climbing_gym`
- **User**: `postgres`
- **Password**: `postgres`

Строка подключения:  
`postgresql://postgres:postgres@localhost:5432/climbing_gym?sslmode=disable`

## Если не удаётся подключиться

1. **Проверьте контейнеры:**
   ```bash
   docker-compose ps
   docker-compose logs postgres
   ```
   В логах не должно быть ошибок.

2. **Проверьте порты:**
   - На ПК не должно быть другого PostgreSQL на порту 5432.
   - Проверка: `netstat -an | findstr 5432` (Windows) или `ss -tlnp | grep 5432` (Linux/macOS).

3. **В pgAdmin в браузере (localhost:5050):**
   - В поле Host указано именно **postgres** (без пробелов, маленькими буквами).
   - Port: **5432**, Username: **postgres**, Password: **postgres**, Database: **climbing_gym**.

4. **Перезапуск:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```
   Подождите 15–20 секунд и повторите попытку входа в pgAdmin и добавления сервера.

5. **Фаервол/антивирус:** временно отключите или добавьте исключение для Docker и портов 5432, 5050.

### Если не входится в pgAdmin (логин/пароль не подходят)

Такое бывает, если контейнер pgAdmin уже запускался раньше и сохранил другие данные в том. Сбросьте данные pgAdmin и примените новые логин/пароль из docker-compose:

```bash
docker-compose down
docker volume rm docker_pgadmin_data
docker-compose up -d
```

Подождите 15–20 секунд и откройте http://localhost:5050. Войдите с **admin@admin.com** / **Admin123!**

(Имя тома может быть с префиксом папки, например `work_sait_pgadmin_data`. Проверить: `docker volume ls`.)

## Остановка

```bash
docker-compose down
```

Данные БД и pgAdmin сохраняются в томах `postgres_data` и `pgadmin_data`.
