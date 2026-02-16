export interface PricingPlan {
  id: string
  name: string
  price: number
  visits: number
  pricePerVisit: number
  description: string
  features: string[]
  popular?: boolean
  type: 'group' | 'individual'
  bookingNote?: string
}

export const GROUP_PLANS: PricingPlan[] = [
  {
    id: 'group-single',
    name: 'Разовое посещение',
    price: 890,
    visits: 1,
    pricePerVisit: 890,
    description: 'Одно групповое занятие',
    features: [
      'Доступ к групповому занятию',
      'Длительность 1 час',
      'Работа с инструктором',
      'Все необходимое оборудование',
    ],
    type: 'group',
  },
  {
    id: 'group-4',
    name: 'Абонемент на 4 занятия',
    price: 2790,
    visits: 4,
    pricePerVisit: 697.5,
    description: 'Экономия 470₽ при покупке 4 занятий',
    features: [
      '4 групповых занятия',
      'Срок действия 2 месяца',
      'Экономия 470₽',
      'Гибкий график посещений',
    ],
    type: 'group',
    popular: true,
  },
  {
    id: 'group-8',
    name: 'Абонемент на 8 занятий',
    price: 4900,
    visits: 8,
    pricePerVisit: 612.5,
    description: 'Максимальная экономия 2220₽',
    features: [
      '8 групповых занятий',
      'Срок действия 4 месяца',
      'Экономия 2220₽',
      'Лучшая цена за занятие',
    ],
    type: 'group',
  },
]

export const INDIVIDUAL_PLANS: PricingPlan[] = [
  {
    id: 'individual-single',
    name: 'Разовое занятие',
    price: 980,
    visits: 1,
    pricePerVisit: 980,
    description: 'Одно индивидуальное занятие',
    features: [
      'Персональный инструктор',
      'Индивидуальная программа',
      'Длительность 1 час',
      'Максимальное внимание',
    ],
    type: 'individual',
    bookingNote: 'Запись только по телефону',
  },
  {
    id: 'individual-4',
    name: 'Абонемент на 4 занятия',
    price: 3599,
    visits: 4,
    pricePerVisit: 899.75,
    description: 'Экономия 321₽ при покупке 4 занятий',
    features: [
      '4 индивидуальных занятия',
      'Срок действия 2 месяца',
      'Экономия 321₽',
      'Персональный подход',
    ],
    type: 'individual',
    bookingNote: 'Запись только по телефону',
  },
  {
    id: 'individual-8',
    name: 'Абонемент на 8 занятий',
    price: 7199,
    visits: 8,
    pricePerVisit: 899.875,
    description: 'Максимальная экономия 641₽',
    features: [
      '8 индивидуальных занятий',
      'Срок действия 4 месяца',
      'Экономия 641₽',
      'Индивидуальная программа',
    ],
    type: 'individual',
    bookingNote: 'Запись только по телефону',
  },
]
