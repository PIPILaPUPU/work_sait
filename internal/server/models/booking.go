package models

import "time"

type Booking struct {
	ID               string    `json:"id" db:"id"`
	GroupID          string    `json:"groupId" db:"group_id"`
	PlanID           string    `json:"planId" db:"plan_id"`
	ParticipantName  string    `json:"participantName" db:"participant_name"`
	ParticipantPhone string    `json:"participantPhone" db:"participant_phone"`
	ParticipantEmail string    `json:"participantEmail" db:"participant_email"`
	BookingDate      time.Time `json:"bookingDate" db:"booking_date"`
	CreatedAt        time.Time `json:"createdAt" db:"created_at"`
}

type CreateBookingRequest struct {
	GroupID          string `json:"groupId"`
	PlanID           string `json:"planId"`
	ParticipantName  string `json:"participantName"`
	ParticipantPhone string `json:"participantPhone"`
	ParticipantEmail string `json:"participantEmail"`
}
