package repository

import (
	"database/sql"
	"github.com/PIPILaPUPU/work_sait/internal/server/models"
)

type GroupRepository struct {
	db *sql.DB
}

func NewGroupRepository(db *sql.DB) *GroupRepository {
	return &GroupRepository{db: db}
}

func (r *GroupRepository) GetAll() ([]*models.Group, error) {
	query := `SELECT id, day, time, start_time, end_time, max_participants, instructor
	          FROM groups ORDER BY day, start_time`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var groups []*models.Group
	for rows.Next() {
		var g models.Group
		if err := rows.Scan(&g.ID, &g.Day, &g.Time, &g.StartTime, &g.EndTime, &g.MaxParticipants, &g.Instructor); err != nil {
			return nil, err
		}
		groups = append(groups, &g)
	}

	return groups, rows.Err()
}

func (r *GroupRepository) GetByID(id string) (*models.Group, error) {
	query := `SELECT id, day, time, start_time, end_time, max_participants, instructor
	          FROM groups WHERE id = $1`

	var g models.Group
	err := r.db.QueryRow(query, id).Scan(&g.ID, &g.Day, &g.Time, &g.StartTime, &g.EndTime, &g.MaxParticipants, &g.Instructor)
	if err != nil {
		return nil, err
	}
	return &g, nil
}
