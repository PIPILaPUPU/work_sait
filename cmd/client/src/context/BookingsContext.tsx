import { createContext, useContext, useState, ReactNode } from 'react'
import { Booking } from '../types/group'
import { BookingFormData } from '../components/BookingModal'

interface BookingsContextType {
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  removeBooking: (bookingId: string) => void
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
  const [bookings, setBookings] = useState<Booking[]>([])

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking])
  }

  const removeBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId))
  }

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, removeBooking }}>
      {children}
    </BookingsContext.Provider>
  )
}
