package organizations

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func OrganizationQuery(c *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Organization{})
	q = q.Preload("Category")

	if c.Role != app.RoleSuperUser {
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

type OrganizationFilters struct {
	app.PaginationInput
	Query string `query:"q"`
}

type OrganizationListData struct {
	Results  []models.Organization `json:"results"`
	PageInfo *app.PaginationInfo   `json:"page_info"`
}

func OrganizationsList(c *app.Context, filters *OrganizationFilters) (*OrganizationListData, error) {
	data := &OrganizationListData{}

	q := OrganizationQuery(c)

	if filters != nil {
		if filters.Query != "" {
			q = q.Where("name LIKE ?", "%"+filters.Query+"%")
		}
	}

	pageInfo, err := app.PageInfo(q, filters.PaginationInput)

	if err != nil {
		return nil, err
	}

	data.PageInfo = pageInfo

	q = q.Scopes(app.Paginate(filters.PaginationInput))

	if err := q.Find(&data.Results).Error; err != nil {
		return nil, err
	}

	return data, nil
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

	if c.Role != app.RoleSuperUser {
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
