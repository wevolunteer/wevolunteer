package experiences

import (
	"fmt"
	"time"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func ExperienceQuery(ctx *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Experience{})
	q = q.Preload("Category")
	q = q.Preload("Organization")

	return q
}

func ExperienceGet(c *app.Context, id uint) (*models.Experience, error) {
	var experience models.Experience

	if err := ExperienceQuery(c).Where("id = ?", id).First(&experience).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

type ExperienceListData struct {
	Results  []models.Experience `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

type ExperienceFilters struct {
	app.PaginationInput
	Query        string  `query:"q"`
	Latitude     float64 `query:"lat"`
	Longitude    float64 `query:"lng"`
	DateStart    string  `query:"date_start"`
	DateEnd      string  `query:"date_end"`
	Categories   []uint  `query:"categories"`
	Organization uint    `query:"organization"`
}

func ExperienceList(ctx *app.Context, filters *ExperienceFilters) (*ExperienceListData, error) {
	data := &ExperienceListData{}

	q := ExperienceQuery(ctx)

	if filters != nil {
		if filters.DateStart != "" && filters.DateEnd != "" {
			filters.DateEnd = filters.DateStart
		}

		if filters.DateStart != "" {
			q = q.Where("end_time >= ?", filters.DateStart)
		}

		if filters.DateEnd != "" {
			q = q.Where("start_time <= ?", filters.DateEnd)
		}

		if filters.Latitude != 0 && filters.Longitude != 0 {
			q = q.Order(fmt.Sprintf(
				"ST_Distance(ST_SetSRID(ST_Point(longitude, latitude), 4326)::geography, ST_SetSRID(ST_Point(%f, %f), 4326)::geography) ASC",
				filters.Longitude, filters.Latitude))
		}

		if filters.Query != "" {

			q = q.
				Joins("LEFT JOIN organizations on organizations.id = experiences.organization_id").
				Where("experiences.title ILIKE ?", "%"+filters.Query+"%").
				Or("organizations.name ILIKE ?", "%"+filters.Query+"%")
		}

		if len(filters.Categories) > 0 {
			q = q.Where("category_id IN ?", filters.Categories)
		}

		if filters.Organization > 0 {
			q = q.Where("organization_id = ?", filters.Organization)
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

type ExperienceCreateData struct {
	Title string `json:"title"`

	OrganizationID uint `json:"organization_id,omitempty"`

	Description  string  `json:"description"`
	Image        string  `json:"image,omitempty"`
	CategoryID   uint    `json:"category_id,omitempty"`
	Latitude     float64 `json:"latitude,omitempty"`
	Longitude    float64 `json:"longitude,omitempty"`
	Address      string  `json:"address,omitempty"`
	City         string  `json:"city,omitempty"`
	State        string  `json:"state,omitempty"`
	ZipCode      string  `json:"zip_code,omitempty"`
	Country      string  `json:"country,omitempty"`
	ContactName  string  `json:"contact_name,omitempty"`
	ContactEmail string  `json:"contact_email,omitempty"`
	ContactPhone string  `json:"contact_phone,omitempty"`

	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`

	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`

	Published bool `json:"published,omitempty"`
}

func ExperienceCreate(ctx *app.Context, data *ExperienceCreateData) (*models.Experience, error) {
	startDate, err := time.Parse(data.StartDate, "2006-01-02")
	if err != nil {
		return nil, err
	}

	endDate, err := time.Parse(data.EndDate, "2006-01-02")
	if err != nil {
		return nil, err
	}

	experience := models.Experience{
		Title:          data.Title,
		OrganizationID: data.OrganizationID,
		Description:    data.Description,
		Image:          data.Image,
		CategoryID:     data.CategoryID,
		Latitude:       data.Latitude,
		Longitude:      data.Longitude,
		Address:        data.Address,
		City:           data.City,
		State:          data.State,
		ZipCode:        data.ZipCode,
		Country:        data.Country,
		ContactName:    data.ContactName,
		ContactEmail:   data.ContactEmail,
		ContactPhone:   data.ContactPhone,
		StartDate:      startDate,
		EndDate:        endDate,
		StartTime:      data.StartTime,
		EndTime:        data.EndTime,
		Published:      data.Published,
	}

	if err := app.DB.Create(&experience).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

type ExperienceUpdateData struct {
	Title string `json:"title"`

	OrganizationID uint `json:"organization_id,omitempty"`

	Description  string  `json:"description"`
	Image        string  `json:"image,omitempty"`
	CategoryID   uint    `json:"category_id,omitempty"`
	Latitude     float64 `json:"latitude,omitempty"`
	Longitude    float64 `json:"longitude,omitempty"`
	Address      string  `json:"address,omitempty"`
	City         string  `json:"city,omitempty"`
	State        string  `json:"state,omitempty"`
	ZipCode      string  `json:"zip_code,omitempty"`
	Country      string  `json:"country,omitempty"`
	ContactName  string  `json:"contact_name,omitempty"`
	ContactEmail string  `json:"contact_email,omitempty"`
	ContactPhone string  `json:"contact_phone,omitempty"`

	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`

	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`

	Published bool `json:"published,omitempty"`
}

func ExperienceUpdate(ctx *app.Context, id uint, data *ExperienceUpdateData) (*models.Experience, error) {
	var experience models.Experience

	if err := ExperienceQuery(ctx).Where("id = ?", id).First(&experience).Error; err != nil {
		return nil, err
	}

	experience.Title = data.Title

	if err := app.DB.Save(&experience).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

func ExperienceDelete(ctx *app.Context, id uint) error {
	var experience models.Experience

	if err := ExperienceQuery(ctx).Where("id = ?", id).First(&experience).Error; err != nil {
		return err
	}

	if err := app.DB.Delete(&experience).Error; err != nil {
		return err
	}

	return nil
}
