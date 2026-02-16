import { useState, useMemo } from 'react'
import { Group, GROUP_SCHEDULE, DAY_NAMES, Booking } from '../types/group'
import GroupCard from '../components/GroupCard'
import BookingModal, { BookingFormData } from '../components/BookingModal'
import { useBookings } from '../context/BookingsContext'

const GroupsPage = () => {
  const { bookings, addBooking } = useBookings()
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterDay, setFilterDay] = useState<'all' | 'thursday' | 'saturday' | 'sunday'>('all')

  // Обновляем группы с учетом текущих записей
  const groupsWithBookings = useMemo(() => {
    return GROUP_SCHEDULE.map((group) => {
      const groupBookings = bookings.filter((b) => b.groupId === group.id)
      return {
        ...group,
        currentParticipants: groupBookings.length,
      }
    })
  }, [bookings])

  // Фильтруем группы по дню
  const filteredGroups = useMemo(() => {
    if (filterDay === 'all') return groupsWithBookings
    return groupsWithBookings.filter((g) => g.day === filterDay)
  }, [groupsWithBookings, filterDay])

  // Группируем по дням для отображения
  const groupedByDay = useMemo(() => {
    const grouped: Record<string, Group[]> = {}
    filteredGroups.forEach((group) => {
      if (!grouped[group.day]) {
        grouped[group.day] = []
      }
      grouped[group.day].push(group)
    })
    return grouped
  }, [filteredGroups])

  const handleBook = (group: Group) => {
    setSelectedGroup(group)
    setIsModalOpen(true)
  }

  const handleConfirmBooking = (group: Group, bookingData: BookingFormData) => {
    const newBooking: Booking = {
      id: `booking-${Date.now()}-${Math.random()}`,
      groupId: group.id,
      ...bookingData,
      bookingDate: new Date().toISOString(),
    }
    addBooking(newBooking)
    setIsModalOpen(false)
    setSelectedGroup(null)
    
    // Показываем уведомление об успешной записи
    alert(`Вы успешно записались на группу ${group.time}!`)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGroup(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Группы и занятия</h1>
        <p className="text-xl text-gray-600 mb-6">
          Выберите удобное время и запишитесь на групповое занятие
        </p>

        {/* Фильтр по дням */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterDay('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterDay === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Все дни
          </button>
          <button
            onClick={() => setFilterDay('thursday')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterDay === 'thursday'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Четверг
          </button>
          <button
            onClick={() => setFilterDay('saturday')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterDay === 'saturday'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Суббота
          </button>
          <button
            onClick={() => setFilterDay('sunday')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterDay === 'sunday'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Воскресенье
          </button>
        </div>

        {/* Информация о расписании */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Расписание работы:</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• <strong>Четверг:</strong> 17:00-20:00 (групповые занятия по 1 часу)</li>
            <li>• <strong>Суббота:</strong> 10:00-13:00 (групповые занятия по 1 часу)</li>
            <li>• <strong>Воскресенье:</strong> 10:00-13:00 (групповые занятия по 1 часу)</li>
          </ul>
        </div>
      </div>

      {/* Группы по дням */}
      {Object.keys(groupedByDay).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Нет доступных групп для выбранного дня</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByDay).map(([day, groups]) => (
            <div key={day}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {DAY_NAMES[day as keyof typeof DAY_NAMES]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                  <GroupCard key={group.id} group={group} onBook={handleBook} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно записи */}
      <BookingModal
        group={selectedGroup}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmBooking}
      />
    </div>
  )
}

export default GroupsPage
