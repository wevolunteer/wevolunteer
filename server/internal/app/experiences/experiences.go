package experiences

import (
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
	Distance     float64 `query:"distance"`
	DateStart    string  `query:"date_start"`
	DateEnd      string  `query:"date_end"`
	Categories   []uint  `query:"categories"`
	Organization uint    `query:"organization"`
}

func ExperienceList(ctx *app.Context, filters *ExperienceFilters) (*ExperienceListData, error) {
	data := &ExperienceListData{}

	q := ExperienceQuery(ctx)

	if filters != nil {
		if filters.DateStart != "" {
			q = q.Where("start_time >= ?", filters.DateStart)
		}

		if filters.DateEnd != "" {
			q = q.Where("end_time <= ?", filters.DateEnd)
		}

		if filters.Distance != 0 && ctx.User != nil && ctx.User.Latitude != 0 && ctx.User.Longitude != 0 {
			q = q.Where("ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) <= ?", ctx.User.Longitude, ctx.User.Latitude, filters.Distance)
		}

		if filters.Query != "" {
			q = q.Where("title LIKE ?", "%"+filters.Query+"%")
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
}

func ExperienceCreate(ctx *app.Context, data *ExperienceCreateData) (*models.Experience, error) {
	experience := models.Experience{
		Title: data.Title,
	}

	if err := app.DB.Create(&experience).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

type ExperienceUpdateData struct {
	Title string `json:"title"`
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
