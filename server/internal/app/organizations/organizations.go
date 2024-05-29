package organizations

import (
	"fmt"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func OrganizationQuery(c *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Organization{})

	if c.Role != app.SuperUser {
		q = q.Where("published = ?", true)
	}

	return q
}

func OrganizationGet(c *app.Context, id uint) (*models.Organization, error) {
	var organization models.Organization

	if err := OrganizationQuery(c).Where("id = ?", id).First(&organization).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}

type OrganizationList struct {
	Results []models.Organization `json:"results"`
	Total   int                   `json:"total"`
}

func OrganizationsList(c *app.Context, query string) (*OrganizationList, error) {
	var organizations []models.Organization

	q := OrganizationQuery(c)

	if query != "" {
		q = q.Where("name LIKE ?", "%"+query+"%")
	}

	if err := q.Find(&organizations).Error; err != nil {
		return nil, err
	}

	return &OrganizationList{
		Results: organizations,
		Total:   len(organizations),
	}, nil
}

type OrganizationCreateData struct {
	Name  string `json:"name"`
	Phone string `json:"phone"`
}

func OrganizationCreate(c *app.Context, data *OrganizationCreateData) (*models.Organization, error) {
	uuid := uuid.New()

	organization := models.Organization{
		Name:  data.Name,
		Phone: data.Phone,
		UID:   uuid.String(),
	}

	if err := app.DB.Create(&organization).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}

type OrganizationUpdateData struct {
	Name       string `json:"name"`
	Phone      string `json:"phone"`
	Email      string `json:"email"`
	ExternalId string `json:"external_id"`
}

func OrganizationUpdate(c *app.Context, id uint, data *OrganizationUpdateData) (*models.Organization, error) {
	var organization models.Organization

	if err := OrganizationQuery(c).Where("id = ?", id).First(&organization).Error; err != nil {
		return nil, &app.ErrNotAuthorized{
			Message: err.Error(),
		}
	}

	organization.Name = data.Name
	organization.Phone = data.Phone
	organization.Email = data.Email
	organization.ExternalId = data.ExternalId

	if err := app.DB.Save(&organization).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}

func OrganizationDelete(c *app.Context, id uint) error {
	var organization models.Organization

	if c.Role != app.SuperUser {
		return &app.ErrNotAuthorized{
			Message: fmt.Sprintf("role %s is not authorized to delete organizations", c.Role),
		}
	}

	if err := OrganizationQuery(c).Where("id = ?", id).First(&organization).Error; err != nil {
		return &app.ErrNotAuthorized{
			Message: fmt.Sprintf("role %s is not authorized to delete organizations", c.Role),
		}
	}

	if err := app.DB.Delete(&organization).Error; err != nil {
		return err
	}

	return nil
}
