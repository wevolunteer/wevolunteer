package models

type Place struct {
	ID        uint    `json:"id" gorm:"primarykey"`
	Name      string  `json:"name" gorm:"unique"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}
