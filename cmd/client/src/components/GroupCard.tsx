import { Group, DAY_NAMES } from '../types/group'

interface GroupCardProps {
  group: Group
  onBook: (group: Group) => void
}

const GroupCard = ({ group, onBook }: GroupCardProps) => {
  const freeSpots = group.maxParticipants - group.currentParticipants
  const isFull = freeSpots === 0
  const occupancyPercentage = (group.currentParticipants / group.maxParticipants) * 100

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {DAY_NAMES[group.day]}
          </h3>
          <p className="text-2xl font-bold text-primary-600">{group.time}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          isFull 
            ? 'bg-red-100 text-red-800' 
            : freeSpots <= 3 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {isFull ? 'Заполнено' : `${freeSpots} мест`}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Инструктор: {group.instructor}</span>
          <span>{group.currentParticipants}/{group.maxParticipants} записей</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              occupancyPercentage >= 100
                ? 'bg-red-500'
                : occupancyPercentage >= 75
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => onBook(group)}
        disabled={isFull}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          isFull
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        {isFull ? 'Группа заполнена' : 'Записаться'}
      </button>
    </div>
  )
}

export default GroupCard
