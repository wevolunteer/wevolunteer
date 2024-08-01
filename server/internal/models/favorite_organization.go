package models

type FavoriteOrganization struct {
	ID             uint         `json:"id" gorm:"primarykey"`
	UserID         uint         `json:"-"`
	User           User         `json:"user"`
	OrganizationID uint         `json:"-"`
	Organization   Organization `json:"organization"`
}
