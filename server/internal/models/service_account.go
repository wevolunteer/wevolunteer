package models

import (
	"time"

	"gorm.io/gorm"
)

type ServiceAccount struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	UID       string         `json:"uid" gorm:"uniqueIndex"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
	UserID    uint           `json:"user_id"`
	User      User           `json:"user"`
	Token     string         `json:"token"`
}
