package models

import "time"

type EnrollmentStatus string

const (
	EnrollmentPending  EnrollmentStatus = "pending"
	EnrollmentApproved EnrollmentStatus = "approved"
	EnrollmentRejected EnrollmentStatus = "rejected"
)

type Enrollment struct {
	ID         uint             `json:"id" gorm:"primaryKey"`
	CreatedAt  time.Time        `json:"created_at"`
	UpdatedAt  time.Time        `json:"updated_at"`
	UserId     uint             `json:"-"`
	User       User             `json:"user"`
	ActivityID uint             `json:"-"`
	Activity   Activity         `json:"activity"`
	Status     EnrollmentStatus `json:"status" gorm:"type:varchar(20);default:pending"` // pending, approved, rejected
	Message    string           `json:"message" gorm:"type:text"`
}
