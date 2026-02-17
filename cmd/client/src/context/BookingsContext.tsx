import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Group } from '../types/group'
import { createBooking, getGroups, CreateBookingRequest } from '../api/booking'

interface BookingsContextType {
  groups: Group[]
  isLoading: boolean
  error: string | null
  fetchGroups: () => Promise<void>
  createBooking: (data: CreateBookingRequest) => Promise<void>
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

export const useBookings = () => {
  const context = useContext(BookingsContext)
  if (!context) {
    throw new Error('useBookings must be used within BookingsProvider')
  }
  return context
}

interface BookingsProviderProps {
  children: ReactNode
}

export const BookingsProvider = ({ children }: BookingsProviderProps) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGroups = async () => {
    try {
      setError(null)
      const data = await getGroups()
      setGroups(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить группы')
      setGroups([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBooking = async (data: CreateBookingRequest) => {
    await createBooking(data)
    await fetchGroups()
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <BookingsContext.Provider
      value={{
        groups,
        isLoading,
        error,
        fetchGroups,
        createBooking: handleCreateBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  )
}
