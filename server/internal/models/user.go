package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID              uint           `json:"id" gorm:"primarykey"`
	UID             string         `json:"uid" gorm:"uniqueIndex"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
	Avatar          string         `json:"avatar"`
	Name            string         `json:"name"`
	Email           string         `json:"email"`
	Phone           string         `json:"phone"`
	TaxCode         string         `json:"tax_code"`
	Password        string         `json:"-"`
	IsRootAdmin     bool           `json:"is_superuser" gorm:"default:false"`
	Latitude        float64        `json:"-"`
	Longitude       float64        `json:"-"`
	Bio             string         `json:"bio"`
	IsEmailVerified bool           `json:"is_email_verified" gorm:"default:false"`
	AcceptedTOS     bool           `json:"accepted_tos" gorm:"default:false"`
}
