package repository

import (
	"database/sql"
	"github.com/PIPILaPUPU/work_sait/internal/server/models"
)

type BookingRepository struct {
	db *sql.DB
}

func NewBookingRepository(db *sql.DB) *BookingRepository {
	return &BookingRepository{db: db}
}

func (r *BookingRepository) Create(booking *models.Booking) error {
	query := `
		INSERT INTO bookings (id, group_id, plan_id, participant_name, participant_phone, participant_email, booking_date)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`
	_, err := r.db.Exec(query, booking.ID, booking.GroupID, booking.PlanID, booking.ParticipantName,
		booking.ParticipantPhone, booking.ParticipantEmail, booking.BookingDate)
	return err
}

func (r *BookingRepository) CountByGroupID(groupID string) (int, error) {
	query := `SELECT COUNT(*) FROM bookings WHERE group_id = $1`
	var count int
	err := r.db.QueryRow(query, groupID).Scan(&count)
	return count, err
}
