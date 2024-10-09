package models

import (
	"time"

	"gorm.io/gorm"
)

type UserDevice struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	UID       string         `json:"uid" gorm:"uniqueIndex"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
	UserID    uint           `json:"user_id"`
	User      User           `json:"-"`
	Brand     string         `json:"brand"`
	Name      string         `json:"device_name"`
	Type      string         `json:"device_type"`
	Model     string         `json:"model"`
	OsName    string         `json:"os_name"`
	Token     string         `json:"token"`
}
