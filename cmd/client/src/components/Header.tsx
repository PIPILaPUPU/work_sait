import { Link } from 'react-router-dom'
import { useState } from 'react'
import QuickBookingModal from './QuickBookingModal'
import { useBookings } from '../context/BookingsContext'
import { Group } from '../types/group'
import { BookingFormData } from './BookingModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false)
  const { groups, createBooking } = useBookings()

  const navItems = [
    { path: '/groups', label: 'Группы' },
    { path: '/pricing', label: 'Стоимость' },
  ]

  const handleQuickBookingConfirm = async (group: Group, bookingData: BookingFormData) => {
    try {
      await createBooking({
        groupId: group.id,
        planId: bookingData.planId,
        participantName: bookingData.participantName,
        participantPhone: bookingData.participantPhone,
        participantEmail: bookingData.participantEmail,
      })
      setIsQuickBookingOpen(false)
      alert(`Вы успешно записались на группу ${group.time}!`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка при записи'
      alert(msg)
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">Скалодром</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => setIsQuickBookingOpen(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Записаться
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsQuickBookingOpen(true)
                  setIsMenuOpen(false)
                }}
                className="block w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium text-center"
              >
                Записаться
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Quick Booking Modal */}
      <QuickBookingModal
        isOpen={isQuickBookingOpen}
        onClose={() => setIsQuickBookingOpen(false)}
        onConfirm={handleQuickBookingConfirm}
        groups={groups}
      />
    </>
  )
}

export default Header
