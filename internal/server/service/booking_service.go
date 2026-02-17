package service

import (
	"errors"
	"fmt"
	"time"
	"github.com/PIPILaPUPU/work_sait/internal/server/models"
	"github.com/PIPILaPUPU/work_sait/internal/server/repository"
)

type BookingService struct {
	bookingRepo *repository.BookingRepository
	groupRepo   *repository.GroupRepository
}

func NewBookingService(bookingRepo *repository.BookingRepository, groupRepo *repository.GroupRepository) *BookingService {
	return &BookingService{
		bookingRepo: bookingRepo,
		groupRepo:   groupRepo,
	}
}

func (s *BookingService) CreateBooking(req *models.CreateBookingRequest) (*models.Booking, error) {
	group, err := s.groupRepo.GetByID(req.GroupID)
	if err != nil {
		return nil, fmt.Errorf("group not found: %w", err)
	}

	count, err := s.bookingRepo.CountByGroupID(req.GroupID)
	if err != nil {
		return nil, fmt.Errorf("failed to count bookings: %w", err)
	}

	if count >= group.MaxParticipants {
		return nil, errors.New("group is full")
	}

	now := time.Now()
	booking := &models.Booking{
		ID:               fmt.Sprintf("booking-%d-%d", now.UnixMilli(), count+1),
		GroupID:          req.GroupID,
		PlanID:           req.PlanID,
		ParticipantName:  req.ParticipantName,
		ParticipantPhone: req.ParticipantPhone,
		ParticipantEmail: req.ParticipantEmail,
		BookingDate:      now,
		CreatedAt:        now,
	}

	if err := s.bookingRepo.Create(booking); err != nil {
		return nil, fmt.Errorf("failed to create booking: %w", err)
	}

	return booking, nil
}
