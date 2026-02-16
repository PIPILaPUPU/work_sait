import { PricingPlan } from '../types/pricing'

interface PricingCardProps {
  plan: PricingPlan
  onSelect?: (plan: PricingPlan) => void
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  const savings = plan.visits > 1 
    ? (plan.pricePerVisit * plan.visits) - plan.price 
    : 0

  return (
    <div className={`relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
      plan.popular ? 'ring-2 ring-primary-500 ring-offset-2' : ''
    }`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
          Популярный
        </div>
      )}
      
      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 text-sm">{plan.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-gray-600 ml-2">₽</span>
          </div>
          {plan.visits > 1 && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                {plan.pricePerVisit.toFixed(0)}₽ за занятие
              </span>
              {savings > 0 && (
                <span className="ml-2 text-sm font-semibold text-green-600">
                  Экономия {savings.toFixed(0)}₽
                </span>
              )}
            </div>
          )}
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.bookingNote && (
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
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
              {plan.bookingNote}
            </p>
          </div>
        )}

        <button
          onClick={() => onSelect?.(plan)}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            plan.popular
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {plan.type === 'group' ? 'Записаться онлайн' : 'Записаться по телефону'}
        </button>
      </div>
    </div>
  )
}

export default PricingCard
