package models

import (
	"time"
)

type ActivityStatus string

const (
	ActivityPending   ActivityStatus = "pending"
	ActivityApproved  ActivityStatus = "approved"
	ActivityCancelled ActivityStatus = "cancelled"
	ActivityCompleted ActivityStatus = "completed"
)

type Activity struct {
	ID             uint           `gorm:"primarykey" json:"id"`
	UID            string         `json:"uid" gorm:"uniqueIndex"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	Image          string         `json:"image"`
	OrganizationID uint           `json:"organization_id"`
	Organization   Organization   `json:"organization" gorm:"OnDelete:SET NULL"`
	Title          string         `json:"title"`
	Description    string         `json:"description"`
	Status         ActivityStatus `json:"status" gorm:"default:pending;type:varchar(20);"`

	// Location
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Address   string  `json:"address"`
	City      string  `json:"city"`
	State     string  `json:"state"`
	ZipCode   string  `json:"zip_code"`
	Country   string  `json:"country"`

	//Contact
	ContactName  string `json:"contact_name"`
	ContactEmail string `json:"contact_email"`
	ContactPhone string `json:"contact_phone"`

	// Dates
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`

	// Hours
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`

	// Recurrence
	IsRecurring bool              `json:"is_recurring"`
	Schedule    *ActivitySchedule `json:"schedule"`

	// Visibility
	Published bool `json:"published"`
}

type ActivitySchedule struct {
	ID         uint     `gorm:"primarykey" json:"id"`
	ActivityID uint     `json:"-"`
	Activity   Activity `json:"-"`
	Monday     bool     `json:"monday"`
	Tuesday    bool     `json:"tuesday"`
	Wednesday  bool     `json:"wednesday"`
	Thursday   bool     `json:"thursday"`
	Friday     bool     `json:"friday"`
	Saturday   bool     `json:"saturday"`
	Sunday     bool     `json:"sunday"`
}
