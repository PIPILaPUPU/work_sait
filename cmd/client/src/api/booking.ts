const API_BASE = '/api'

export interface CreateBookingRequest {
  groupId: string
  planId: string
  participantName: string
  participantPhone: string
  participantEmail: string
}

export interface Booking {
  id: string
  groupId: string
  planId: string
  participantName: string
  participantPhone: string
  participantEmail: string
  bookingDate: string
  createdAt: string
}

export interface Group {
  id: string
  day: string
  time: string
  startTime: string
  endTime: string
  maxParticipants: number
  currentParticipants: number
  instructor?: string
}


export async function createBooking(data: CreateBookingRequest): Promise<Booking> {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }

  return res.json()
}

export async function getGroups(): Promise<Group[]> {
  const res = await fetch(`${API_BASE}/groups`)

  if (!res.ok) {
    throw new Error(`Failed to fetch groups: ${res.status}`)
  }

  return res.json()
}
