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
	ID         uint             `json:"id" gorm:"primaryKey"`
	CreatedAt  time.Time        `json:"created_at"`
	UpdatedAt  time.Time        `json:"updated_at"`
	UserID     uint             `json:"-"`
	User       User             `json:"user"`
	ActivityID uint             `json:"-"`
	Activity   Activity         `json:"activity"`
	Date       time.Time        `json:"date"`
	Status     ExperienceStatus `json:"status" gorm:"type:varchar(20);default:pending"` // pending, approved, rejected
	Message    string           `json:"message" gorm:"type:text"`
}
