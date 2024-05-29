package models

import (
	"time"

	"gorm.io/gorm"
)

type Organization struct {
	ID         uint           `gorm:"primarykey" json:"id"`
	UID        string         `json:"uid" gorm:"uniqueIndex"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index"`
	Name       string         `json:"name"`
	Logo       string         `json:"logo"`
	Phone      string         `json:"phone"`
	Email      string         `json:"email"`
	WebSite    string         `json:"website"`
	Address    string         `json:"address"`
	City       string         `json:"city"`
	State      string         `json:"state"`
	ZipCode    string         `json:"zip_code"`
	Country    string         `json:"country"`
	Latitude   float64        `json:"latitude"`
	Longitude  float64        `json:"longitude"`
	TaxCode    string         `json:"tax_code"`
	VATCode    string         `json:"vat_code"`
	Published  bool           `json:"published"`
	ExternalId string         `json:"external_id"`
}
