package service

import (
	"github.com/PIPILaPUPU/work_sait/internal/server/models"
	"github.com/PIPILaPUPU/work_sait/internal/server/repository"
)

type GroupService struct {
	groupRepo   *repository.GroupRepository
	bookingRepo *repository.BookingRepository
}

func NewGroupService(groupRepo *repository.GroupRepository, bookingRepo *repository.BookingRepository) *GroupService {
	return &GroupService{
		groupRepo:   groupRepo,
		bookingRepo: bookingRepo,
	}
}

func (s *GroupService) GetGroups() ([]*models.Group, error) {
	groups, err := s.groupRepo.GetAll()
	if err != nil {
		return nil, err
	}

	for _, g := range groups {
		count, err := s.bookingRepo.CountByGroupID(g.ID)
		if err == nil {
			g.CurrentParticipants = count
		}
	}

	return groups, nil
}
