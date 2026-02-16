export interface Group {
  id: string
  day: 'thursday' | 'saturday' | 'sunday'
  time: string
  startTime: string
  endTime: string
  maxParticipants: number
  currentParticipants: number
  instructor?: string
}

export interface Booking {
  id: string
  groupId: string
  participantName: string
  participantPhone: string
  participantEmail: string
  bookingDate: string
}

export const GROUP_SCHEDULE: Group[] = [
  // Четверг 17:00-20:00
  {
    id: 'thu-17-18',
    day: 'thursday',
    time: '17:00-18:00',
    startTime: '17:00',
    endTime: '18:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Иван Петров',
  },
  {
    id: 'thu-18-19',
    day: 'thursday',
    time: '18:00-19:00',
    startTime: '18:00',
    endTime: '19:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Иван Петров',
  },
  {
    id: 'thu-19-20',
    day: 'thursday',
    time: '19:00-20:00',
    startTime: '19:00',
    endTime: '20:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Иван Петров',
  },
  // Суббота 10:00-13:00
  {
    id: 'sat-10-11',
    day: 'saturday',
    time: '10:00-11:00',
    startTime: '10:00',
    endTime: '11:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Мария Сидорова',
  },
  {
    id: 'sat-11-12',
    day: 'saturday',
    time: '11:00-12:00',
    startTime: '11:00',
    endTime: '12:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Мария Сидорова',
  },
  {
    id: 'sat-12-13',
    day: 'saturday',
    time: '12:00-13:00',
    startTime: '12:00',
    endTime: '13:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Мария Сидорова',
  },
  // Воскресенье 10:00-13:00
  {
    id: 'sun-10-11',
    day: 'sunday',
    time: '10:00-11:00',
    startTime: '10:00',
    endTime: '11:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Алексей Козлов',
  },
  {
    id: 'sun-11-12',
    day: 'sunday',
    time: '11:00-12:00',
    startTime: '11:00',
    endTime: '12:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Алексей Козлов',
  },
  {
    id: 'sun-12-13',
    day: 'sunday',
    time: '12:00-13:00',
    startTime: '12:00',
    endTime: '13:00',
    maxParticipants: 5,
    currentParticipants: 0,
    instructor: 'Алексей Козлов',
  },
]

export const DAY_NAMES = {
  thursday: 'Четверг',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
}
