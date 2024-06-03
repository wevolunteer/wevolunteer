package models

import (
	"fmt"
	"math/rand"
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
	Latitude              float64        `json:"-"`
	Longitude             float64        `json:"-"`
	Bio                   string         `json:"bio"`
	IsEmailVerified       bool           `json:"is_email_verified" gorm:"default:false"`
	HasAcceptedTOS        bool           `json:"accepted_tos" gorm:"default:false"`
	HasAcceptedNewsletter bool           `json:"accepted_newsletter" gorm:"default:false"`
}

func (u *User) RefreshOTPCode(db *gorm.DB) error {
	otp := ""
	for i := 0; i < OTPCodeLength; i++ {
		otp += fmt.Sprintf("%d", rand.Intn(10))
	}

	u.OTPCode = otp
	u.OTPCodeExpireAt = time.Now().Add(time.Minute * time.Duration(OTPCodeTTL))

	err := db.Save(u).Error

	return err
}
