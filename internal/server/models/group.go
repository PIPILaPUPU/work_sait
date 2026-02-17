package models

type Group struct {
	ID                  string `json:"id" db:"id"`
	Day                 string `json:"day" db:"day"`
	Time                string `json:"time" db:"time"`
	StartTime           string `json:"startTime" db:"start_time"`
	EndTime             string `json:"endTime" db:"end_time"`
	MaxParticipants     int    `json:"maxParticipants" db:"max_participants"`
	CurrentParticipants int    `json:"currentParticipants"`
	Instructor          string `json:"instructor" db:"instructor"`
}
