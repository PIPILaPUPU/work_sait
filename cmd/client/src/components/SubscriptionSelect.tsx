import { PricingPlan } from '../types/pricing'

interface SubscriptionSelectProps {
  plans: PricingPlan[]
  value: string
  onChange: (planId: string) => void
  compact?: boolean
}

const SubscriptionSelect = ({ plans, value, onChange, compact = false }: SubscriptionSelectProps) => {
  return (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-3">Абонемент *</p>
      <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {plans.map((plan) => {
          const isSelected = value === plan.id
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onChange(plan.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-500 ring-offset-1'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              {plan.popular && (
                <div className="mb-2">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                    Популярный
                  </span>
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-900 text-sm">{plan.name}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 text-sm">₽</span>
              </div>
              {!compact && plan.visits > 1 && (
                <p className="text-xs text-gray-500 mt-1">
                  {plan.pricePerVisit.toFixed(0)}₽ за занятие
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SubscriptionSelect
