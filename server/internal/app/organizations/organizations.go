package organizations

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

type ExtendedOrganization struct {
	models.Organization

	IsFavorite bool `json:"is_favorite"`
}

func OrganizationQuery(c *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Organization{})
	q = q.Preload("Category")

	if c.Role != app.RoleSuperUser {
		q = q.Where("published = ?", true)
	}

	return q
}

func OrganizationGet(c *app.Context, id uint) (*ExtendedOrganization, error) {
	var organization ExtendedOrganization

	if err := OrganizationQuery(c).
		Select("organizations.*, COALESCE(favorite_organizations.user_id IS NOT NULL, false) AS is_favorite").
		Joins("LEFT JOIN favorite_organizations ON favorite_organizations.organization_id = organizations.id AND favorite_organizations.user_id = ?", c.User.ID).
		Where("organizations.id = ?", id).First(&organization).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}

type OrganizationFilters struct {
	app.PaginationInput
	Query    string `query:"q"`
	Favorite bool   `query:"favorite"`
}

type OrganizationListData struct {
	Results  []ExtendedOrganization `json:"results"`
	PageInfo *app.PaginationInfo    `json:"page_info"`
}

func OrganizationsList(c *app.Context, filters *OrganizationFilters) (*OrganizationListData, error) {
	data := &OrganizationListData{}

	q := OrganizationQuery(c)

	q = q.
		Select("organizations.*, COALESCE(favorite_organizations.user_id IS NOT NULL, false) AS is_favorite").
		Joins("LEFT JOIN favorite_organizations ON favorite_organizations.organization_id = organizations.id AND favorite_organizations.user_id = ?", c.User.ID)

	if filters != nil {
		if filters.Query != "" {
			q = q.Where("name ILIKE ?", "%"+filters.Query+"%")
		}

		if filters.Favorite {
			q = q.Where("favorite_organizations.user_id IS NOT NULL")
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

	// if filters.Favorite {
	// 	if err := q.Table("organizations").
	// 		Select("organizations.*, true AS is_favorite").
	// 		Where("organizations.published = ? AND organizations.deleted_at IS NULL AND favorite_organizations.user_id = ?", true, c.User.ID).
	// 		Find(&data.Results).Error; err != nil {
	// 		return nil, err
	// 	}
	// } else {
	// 	if err := q.Table("organizations").
	// 		Select("organizations.*, COALESCE(favorite_organizations.user_id IS NOT NULL, false) AS is_favorite").
	// 		Joins("LEFT JOIN favorite_organizations ON favorite_organizations.organization_id = organizations.id AND favorite_organizations.user_id = ?", c.User.ID).
	// 		Where("organizations.published = ? AND organizations.deleted_at IS NULL", true).
	// 		Find(&data.Results).Error; err != nil {
	// 		return nil, err
	// 	}
	// }

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

func OrganizationUpdate(c *app.Context, id uint, data *OrganizationUpdateData) (*ExtendedOrganization, error) {
	var organization ExtendedOrganization

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

func OrganizationFollow(c *app.Context, id uint) error {
	var organization models.Organization

	if err := OrganizationQuery(c).Where("id = ?", id).First(&organization).Error; err != nil {
		return err
	}

	var user models.User
	if err := app.DB.Model(&user).Where("id = ?", c.User.ID).First(&user).Error; err != nil {
		return err
	}

	if err := app.DB.Model(&organization).Association("FavoriteUsers").Append(&user); err != nil {
		return err
	}

	return nil
}

func OrganizationUnfollow(c *app.Context, id uint) error {
	var organization models.Organization

	if err := OrganizationQuery(c).Where("id = ?", id).First(&organization).Error; err != nil {
		return err
	}

	var user models.User
	if err := app.DB.Model(&user).Where("id = ?", c.User.ID).First(&user).Error; err != nil {
		return err
	}

	if err := app.DB.Model(&organization).Association("FavoriteUsers").Delete(&user); err != nil {
		return err
	}

	return nil
}
