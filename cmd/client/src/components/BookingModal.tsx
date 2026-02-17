import { useState, FormEvent } from 'react'
import { Group } from '../types/group'
import { GROUP_PLANS } from '../types/pricing'
import SubscriptionSelect from './SubscriptionSelect'

interface BookingModalProps {
  group: Group | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (group: Group, bookingData: BookingFormData) => void | Promise<void>
}

export interface BookingFormData {
  planId: string
  participantName: string
  participantPhone: string
  participantEmail: string
}

const DEFAULT_PLAN_ID = 'group-single'

const BookingModal = ({ group, isOpen, onClose, onConfirm }: BookingModalProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    planId: DEFAULT_PLAN_ID,
    participantName: '',
    participantPhone: '',
    participantEmail: '',
  })
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})

  if (!isOpen || !group) return null

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await onConfirm(group, formData)
        setFormData({ planId: DEFAULT_PLAN_ID, participantName: '', participantPhone: '', participantEmail: '' })
        setErrors({})
        onClose()
      } catch {
        // Ошибка — остаёмся в модалке, родитель уже показал alert
      }
    }
  }

  const handleClose = () => {
    setFormData({ planId: DEFAULT_PLAN_ID, participantName: '', participantPhone: '', participantEmail: '' })
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Запись на группу</h2>
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

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Группа:</p>
          <p className="font-semibold text-gray-900">{group.time}</p>
          <p className="text-sm text-gray-600">Инструктор: {group.instructor}</p>
        </div>

        <div className="mb-6">
          <SubscriptionSelect
            plans={GROUP_PLANS}
            value={formData.planId}
            onChange={(planId) => setFormData({ ...formData, planId })}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Имя и фамилия *
            </label>
            <input
              type="text"
              id="name"
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <input
              type="tel"
              id="phone"
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
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
    </div>
  )
}

export default BookingModal
