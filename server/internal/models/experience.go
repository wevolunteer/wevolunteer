package models

import "time"

type ExperienceStatus string

const (
	ExperiencePending  ExperienceStatus = "pending"
	ExperienceApproved ExperienceStatus = "approved"
	ExperienceRejected ExperienceStatus = "rejected"
	ExperienceCanceled ExperienceStatus = "canceled"
)

type Experience struct {
	ID             uint             `json:"id" gorm:"primaryKey"`
	CreatedAt      time.Time        `json:"created_at"`
	UpdatedAt      time.Time        `json:"updated_at"`
	UserID         uint             `json:"-"`
	User           User             `json:"user"`
	ActivityID     uint             `json:"-"`
	Activity       Activity         `json:"activity"`
	OrganizationID uint             `json:"-"`
	Organization   Organization     `json:"-"`
	StartDate      time.Time        `json:"start_date"`
	EndDate        time.Time        `json:"end_date"`
	StartTime      string           `json:"start_time"`
	EndTime        string           `json:"end_time"`
	Status         ExperienceStatus `json:"status" gorm:"type:varchar(20);default:pending"` // pending, approved, rejected
	Message        string           `json:"message" gorm:"type:text"`
}
