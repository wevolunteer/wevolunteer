package models

import (
	"time"

	"gorm.io/gorm"
)

var (
	OTPCodeLength = 5
	OTPCodeTTL    = 30
)

type User struct {
	ID                    uint           `json:"id" gorm:"primarykey"`
	UID                   string         `json:"uid" gorm:"uniqueIndex"`
	CreatedAt             time.Time      `json:"created_at"`
	UpdatedAt             time.Time      `json:"updated_at"`
	DeletedAt             gorm.DeletedAt `json:"-" gorm:"index"`
	Avatar                string         `json:"avatar"`
	FirstName             string         `json:"first_name"`
	LastName              string         `json:"last_name"`
	Email                 string         `json:"email"`
	Phone                 string         `json:"phone"`
	TaxCode               string         `json:"tax_code"`
	Password              string         `json:"-"`
	OTPCode               string         `json:"-"`
	OTPCodeExpireAt       time.Time      `json:"-"`
	IsRootAdmin           bool           `json:"is_superuser" gorm:"default:false"`
	Latitude              float64        `json:"json:"latitude"`
	Longitude             float64        `json:"json:"longitude"`
	Bio                   string         `json:"bio"`
	IsEmailVerified       bool           `json:"is_email_verified" gorm:"default:false"`
	HasAcceptedTOS        bool           `json:"accepted_tos" gorm:"default:false"`
	HasAcceptedNewsletter bool           `json:"accepted_newsletter" gorm:"default:false"`
}
