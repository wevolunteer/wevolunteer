package models

type Category struct {
	ID   uint   `json:"id" gorm:"primarykey"`
	Name string `json:"name"`
	Code string `json:"code"`
}
