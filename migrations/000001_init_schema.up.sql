-- Таблица групп (расписание занятий)
CREATE TABLE IF NOT EXISTS groups (
    id VARCHAR(50) PRIMARY KEY,
    day VARCHAR(20) NOT NULL,
    time VARCHAR(20) NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    max_participants INTEGER NOT NULL DEFAULT 5,
    instructor VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица записей на занятия
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(100) PRIMARY KEY,
    group_id VARCHAR(50) NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    plan_id VARCHAR(50) NOT NULL,
    participant_name VARCHAR(200) NOT NULL,
    participant_phone VARCHAR(50) NOT NULL,
    participant_email VARCHAR(200) NOT NULL,
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_bookings_group_id ON bookings(group_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_plan_id ON bookings(plan_id);
CREATE INDEX IF NOT EXISTS idx_groups_day ON groups(day);

-- Начальные данные: расписание групп
INSERT INTO groups (id, day, time, start_time, end_time, max_participants, instructor) VALUES
('thu-17-18', 'thursday', '17:00-18:00', '17:00', '18:00', 5, 'Иван Петров'),
('thu-18-19', 'thursday', '18:00-19:00', '18:00', '19:00', 5, 'Иван Петров'),
('thu-19-20', 'thursday', '19:00-20:00', '19:00', '20:00', 5, 'Иван Петров'),
('sat-10-11', 'saturday', '10:00-11:00', '10:00', '11:00', 5, 'Мария Сидорова'),
('sat-11-12', 'saturday', '11:00-12:00', '11:00', '12:00', 5, 'Мария Сидорова'),
('sat-12-13', 'saturday', '12:00-13:00', '12:00', '13:00', 5, 'Мария Сидорова'),
('sun-10-11', 'sunday', '10:00-11:00', '10:00', '11:00', 5, 'Алексей Козлов'),
('sun-11-12', 'sunday', '11:00-12:00', '11:00', '12:00', 5, 'Алексей Козлов'),
('sun-12-13', 'sunday', '12:00-13:00', '12:00', '13:00', 5, 'Алексей Козлов')
ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE groups IS 'Группы занятий (расписание)';
COMMENT ON TABLE bookings IS 'Записи клиентов на групповые занятия';
COMMENT ON COLUMN bookings.plan_id IS 'ID абонемента: group-single, group-4, group-8';
