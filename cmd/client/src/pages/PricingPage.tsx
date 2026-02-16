import { useState } from 'react'
import { GROUP_PLANS, INDIVIDUAL_PLANS, PricingPlan } from '../types/pricing'
import PricingCard from '../components/PricingCard'
import PhoneBookingModal from '../components/PhoneBookingModal'
import { useNavigate } from 'react-router-dom'

const CONTACTS = [
  {
    name: 'Анна Иванова',
    phone: '+7 (999) 123-45-67',
    role: 'Администратор',
  },
  {
    name: 'Дмитрий Петров',
    phone: '+7 (999) 765-43-21',
    role: 'Администратор',
  },
]

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState<'group' | 'individual'>('group')
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.type === 'group') {
      // Переход на страницу групп для записи
      navigate('/groups')
    } else {
      // Для индивидуальных занятий открываем модальное окно с контактами
      setIsPhoneModalOpen(true)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Стоимость занятий
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Выберите удобный для вас вариант посещения. Мы предлагаем гибкие тарифы для групповых и индивидуальных занятий.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('group')}
            className={`px-6 py-3 rounded-md font-semibold transition-all ${
              activeTab === 'group'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Групповые занятия
          </button>
          <button
            onClick={() => setActiveTab('individual')}
            className={`px-6 py-3 rounded-md font-semibold transition-all ${
              activeTab === 'individual'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Индивидуальные занятия
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mb-12">
        {activeTab === 'group' ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Групповые занятия
              </h2>
              <p className="text-gray-600">
                Занимайтесь в группах до 5 человек с опытным инструктором
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GROUP_PLANS.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onSelect={handleSelectPlan}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Индивидуальные занятия
              </h2>
              <p className="text-gray-600">
                Персональный подход и индивидуальная программа тренировок
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INDIVIDUAL_PLANS.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onSelect={handleSelectPlan}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Важная информация
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg
                className="w-5 h-5 text-primary-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Срок действия абонементов
            </h4>
            <p className="text-gray-600 text-sm">
              Абонемент на 4 занятия действителен 1 месяц, на 8 занятий — 2 месяца с момента покупки.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg
                className="w-5 h-5 text-primary-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Групповые занятия
            </h4>
            <p className="text-gray-600 text-sm">
              Запись на групповые занятия доступна онлайн через наш сайт. Выберите удобное время и группу.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg
                className="w-5 h-5 text-primary-600 mr-2"
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
              Индивидуальные занятия
            </h4>
            <p className="text-gray-600 text-sm">
              Запись на индивидуальные занятия проводится только по телефону. Мы подберем удобное время специально для вас.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg
                className="w-5 h-5 text-primary-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Длительность занятий
            </h4>
            <p className="text-gray-600 text-sm">
              Все занятия (групповые и индивидуальные) длятся 1 час. Приходите за 10 минут до начала.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">Готовы начать?</h3>
        <p className="text-primary-100 mb-6">
          Выберите подходящий тариф и запишитесь на первое занятие
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/groups')}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Записаться на групповое занятие
          </button>
          <button
            onClick={() => setIsPhoneModalOpen(true)}
            className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
          >
            Записаться на индивидуальное занятие
          </button>
        </div>
      </div>

      {/* Phone Booking Modal */}
      <PhoneBookingModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        contacts={CONTACTS}
      />
    </div>
  )
}

export default PricingPage
