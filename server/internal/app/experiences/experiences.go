package experiences

import (
	"time"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func ExperienceQuery(ctx *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Experience{})

	if ctx.Role == app.Public {
		q = q.Where("1 != 1")
	}

	if ctx.Role == app.Volunteer {
		q = q.Where("user_id = ?", ctx.User.ID)
	}

	if ctx.Role == app.Organization {
		q = q.Joins("JOIN activities ON activities.id = enrollments.activity_id").
			Where("activities.organization_id = ?", ctx.User.ID)
	}

	return q
}

type ExperienceFilters struct {
	app.PaginationInput
	Query string `query:"q"`
}

type ExperienceListData struct {
	Results  []models.Experience `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

func ExperienceList(ctx *app.Context, filters *ExperienceFilters) (*ExperienceListData, error) {
	data := &ExperienceListData{}

	q := ExperienceQuery(ctx)

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

	if err := q.Find(&data.Results).Error; err != nil {
		return nil, err
	}

	return data, nil
}

type ExperienceCreateData struct {
	ActivityID uint      `json:"activity_id"`
	Date       time.Time `json:"date"`
	Message    string    `json:"message"`
}

func ExperienceCreate(ctx *app.Context, data *ExperienceCreateData) (*models.Experience, error) {
	enrollment := models.Experience{
		UserID:     ctx.User.ID,
		ActivityID: data.ActivityID,
		Date:       data.Date,
		Message:    data.Message,
	}

	if err := app.DB.Create(&enrollment).Error; err != nil {
		return nil, err
	}

	return &enrollment, nil
}

type ExperienceUpdateData struct {
	Date    time.Time `json:"date"`
	Message string    `json:"message"`
}

func ExperienceUpdate(ctx *app.Context, id uint, data *ExperienceUpdateData) (*models.Experience, error) {
	var enrollment models.Experience

	if err := ExperienceQuery(ctx).Where("id = ?", id).First(&enrollment).Error; err != nil {
		return nil, err
	}

	enrollment.Date = data.Date
	enrollment.Message = data.Message

	if err := app.DB.Save(&enrollment).Error; err != nil {
		return nil, err
	}

	return &enrollment, nil
}

func ExperienceDelete(ctx *app.Context, id uint) error {
	var enrollment models.Experience

	if err := ExperienceQuery(ctx).Where("id = ?", id).First(&enrollment).Error; err != nil {
		return err
	}

	if err := app.DB.Delete(&enrollment).Error; err != nil {
		return err
	}

	return nil
}
