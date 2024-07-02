package activities

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func ActivityQuery(ctx *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Activity{})
	q = q.Preload("Category")
	q = q.Preload("Organization")

	return q
}

func ActivityGet(c *app.Context, id uint) (*models.Activity, error) {
	var activity models.Activity

	if err := ActivityQuery(c).Where("id = ?", id).First(&activity).Error; err != nil {
		return nil, err
	}

	return &activity, nil
}

type ActivityListData struct {
	Results  []models.Activity   `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

type ActivityFilters struct {
	app.PaginationInput
	Query        string  `query:"q"`
	Distance     float64 `query:"distance"`
	DateStart    string  `query:"date_start"`
	DateEnd      string  `query:"date_end"`
	Categories   []uint  `query:"categories"`
	Organization uint    `query:"organization"`
}

func ActivityList(ctx *app.Context, filters *ActivityFilters) (*ActivityListData, error) {
	data := &ActivityListData{}

	q := ActivityQuery(ctx)

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

type ActivityCreateData struct {
	Title string `json:"title"`
}

func ActivityCreate(ctx *app.Context, data *ActivityCreateData) (*models.Activity, error) {
	activity := models.Activity{
		Title: data.Title,
	}

	if err := app.DB.Create(&activity).Error; err != nil {
		return nil, err
	}

	return &activity, nil
}

type ActivityUpdateData struct {
	Title string `json:"title"`
}

func ActivityUpdate(ctx *app.Context, id uint, data *ActivityUpdateData) (*models.Activity, error) {
	var activity models.Activity

	if err := ActivityQuery(ctx).Where("id = ?", id).First(&activity).Error; err != nil {
		return nil, err
	}

	activity.Title = data.Title

	if err := app.DB.Save(&activity).Error; err != nil {
		return nil, err
	}

	return &activity, nil
}

func ActivityDelete(ctx *app.Context, id uint) error {
	var activity models.Activity

	if err := ActivityQuery(ctx).Where("id = ?", id).First(&activity).Error; err != nil {
		return err
	}

	if err := app.DB.Delete(&activity).Error; err != nil {
		return err
	}

	return nil
}
