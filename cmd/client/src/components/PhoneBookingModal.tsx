interface Contact {
  name: string
  phone: string
  role?: string
}

interface PhoneBookingModalProps {
  isOpen: boolean
  onClose: () => void
  contacts: Contact[]
}

const PhoneBookingModal = ({ isOpen, onClose, contacts }: PhoneBookingModalProps) => {
  if (!isOpen) return null

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Запись по телефону</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Позвоните нам для записи на индивидуальное занятие. Мы подберем удобное время специально для вас.
        </p>

        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {contact.name}
                  </h3>
                  {contact.role && (
                    <p className="text-sm text-gray-500 mb-2">{contact.role}</p>
                  )}
                  <p className="text-primary-600 font-medium text-lg">
                    {contact.phone}
                  </p>
                </div>
                <button
                  onClick={() => handleCall(contact.phone)}
                  className="ml-4 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors flex-shrink-0"
                  aria-label={`Позвонить ${contact.name}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Рабочее время: Пн-Вс 10:00 - 20:00
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default PhoneBookingModal
