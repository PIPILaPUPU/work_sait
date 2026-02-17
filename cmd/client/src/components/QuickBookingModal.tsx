import { useState, FormEvent, useMemo } from 'react'
import { Group, DAY_NAMES } from '../types/group'
import { GROUP_PLANS } from '../types/pricing'
import { BookingFormData } from './BookingModal'
import SubscriptionSelect from './SubscriptionSelect'

interface QuickBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (group: Group, bookingData: BookingFormData) => void | Promise<void>
  groups: Group[]
}

const QuickBookingModal = ({ isOpen, onClose, onConfirm, groups }: QuickBookingModalProps) => {
  const [selectedDay, setSelectedDay] = useState<'thursday' | 'saturday' | 'sunday' | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [formData, setFormData] = useState<BookingFormData>({
    planId: 'group-single',
    participantName: '',
    participantPhone: '',
    participantEmail: '',
  })
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [step, setStep] = useState<'day' | 'time' | 'form'>('day')

  // Фильтруем группы по выбранному дню (groups уже содержат currentParticipants с API)
  const availableGroups = useMemo(() => {
    if (!selectedDay) return []
    return groups.filter((g) => g.day === selectedDay)
  }, [selectedDay, groups])

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}

    if (!formData.participantName.trim()) {
      newErrors.participantName = 'Имя обязательно'
    }

    if (!formData.participantPhone.trim()) {
      newErrors.participantPhone = 'Телефон обязателен'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.participantPhone)) {
      newErrors.participantPhone = 'Неверный формат телефона'
    }

    if (!formData.participantEmail.trim()) {
      newErrors.participantEmail = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.participantEmail)) {
      newErrors.participantEmail = 'Неверный формат email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDaySelect = (day: 'thursday' | 'saturday' | 'sunday') => {
    setSelectedDay(day)
    setStep('time')
    setSelectedGroup(null)
  }

  const handleGroupSelect = (group: Group) => {
    if (group.currentParticipants >= group.maxParticipants) {
      return // Группа заполнена
    }
    setSelectedGroup(group)
    setStep('form')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm() && selectedGroup) {
      await onConfirm(selectedGroup, formData)
      setFormData({ planId: 'group-single', participantName: '', participantPhone: '', participantEmail: '' })
      setErrors({})
      setSelectedDay(null)
      setSelectedGroup(null)
      setStep('day')
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({ planId: 'group-single', participantName: '', participantPhone: '', participantEmail: '' })
    setErrors({})
    setSelectedDay(null)
    setSelectedGroup(null)
    setStep('day')
    onClose()
  }

  const handleBack = () => {
    if (step === 'form') {
      setStep('time')
      setSelectedGroup(null)
    } else if (step === 'time') {
      setStep('day')
      setSelectedDay(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Быстрая запись</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step 1: Выбор дня */}
        {step === 'day' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Выберите день</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['thursday', 'saturday', 'sunday'] as const).map((day) => {
                const dayGroups = groups.filter((g) => g.day === day)
                const availableCount = dayGroups.filter(
                  (g) => g.currentParticipants < g.maxParticipants
                ).length

                return (
                  <button
                    key={day}
                    onClick={() => handleDaySelect(day)}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                  >
                    <div className="font-semibold text-lg text-gray-900 mb-2">
                      {DAY_NAMES[day]}
                    </div>
                    <div className="text-sm text-gray-600">
                      {availableCount > 0 ? (
                        <span className="text-green-600 font-medium">
                          {availableCount} групп{availableCount === 1 ? 'а' : availableCount < 5 ? 'ы' : ''} доступно
                        </span>
                      ) : (
                        <span className="text-red-600">Нет свободных мест</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Выбор времени */}
        {step === 'time' && selectedDay && (
          <div>
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="mr-3 text-gray-600 hover:text-gray-900"
                aria-label="Назад"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                Выберите время ({DAY_NAMES[selectedDay]})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableGroups.map((group) => {
                const freeSpots = group.maxParticipants - group.currentParticipants
                const isFull = freeSpots === 0

                return (
                  <button
                    key={group.id}
                    onClick={() => handleGroupSelect(group)}
                    disabled={isFull}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      isFull
                        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                        : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{group.time}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Инструктор: {group.instructor}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          isFull
                            ? 'text-red-600'
                            : freeSpots <= 2
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {isFull ? 'Заполнено' : `${freeSpots} мест${freeSpots === 1 ? 'о' : ''}`}
                      </span>
                      <span className="text-xs text-gray-500">
                        {group.currentParticipants}/{group.maxParticipants}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Форма */}
        {step === 'form' && selectedGroup && (
          <div>
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="mr-3 text-gray-600 hover:text-gray-900"
                aria-label="Назад"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">Ваши данные</h3>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Выбранная группа:</p>
              <p className="font-semibold text-gray-900">
                {DAY_NAMES[selectedGroup.day]}, {selectedGroup.time}
              </p>
              <p className="text-sm text-gray-600">Инструктор: {selectedGroup.instructor}</p>
              <p className="text-sm text-gray-600 mt-2">
                Свободных мест: {selectedGroup.maxParticipants - selectedGroup.currentParticipants}
              </p>
            </div>

            <div className="mb-6">
              <SubscriptionSelect
                plans={GROUP_PLANS}
                value={formData.planId}
                onChange={(planId) => setFormData({ ...formData, planId })}
                compact
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="quick-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя и фамилия *
                </label>
                <input
                  type="text"
                  id="quick-name"
                  value={formData.participantName}
                  onChange={(e) => setFormData({ ...formData, participantName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.participantName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Иван Иванов"
                />
                {errors.participantName && (
                  <p className="mt-1 text-sm text-red-600">{errors.participantName}</p>
                )}
              </div>

              <div>
                <label htmlFor="quick-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="quick-phone"
                  value={formData.participantPhone}
                  onChange={(e) => setFormData({ ...formData, participantPhone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.participantPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.participantPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.participantPhone}</p>
                )}
              </div>

              <div>
                <label htmlFor="quick-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="quick-email"
                  value={formData.participantEmail}
                  onChange={(e) => setFormData({ ...formData, participantEmail: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.participantEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ivan@example.com"
                />
                {errors.participantEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.participantEmail}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Записаться
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuickBookingModal
