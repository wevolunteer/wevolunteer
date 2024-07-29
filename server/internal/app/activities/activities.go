package activities

import (
	"fmt"
	"time"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func ActivityQuery(ctx *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Activity{})

	if ctx.Role == app.RolePublic {
		q = q.Where("1 != 1")
	}

	if ctx.Role == app.RoleVolunteer {
		q = q.Where("user_id = ?", ctx.User.ID)
	}

	if ctx.Role == app.RoleOrganization {
		q = q.Joins("JOIN activities ON activities.id = enrollments.activity_id").
			Where("activities.organization_id = ?", ctx.User.ID)
	}

	return q
}

type ActivityFilters struct {
	app.PaginationInput
	Query string `query:"q"`
}

type ActivityListData struct {
	Results  []models.Activity   `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

func ActivityList(ctx *app.Context, filters *ActivityFilters) (*ActivityListData, error) {
	data := &ActivityListData{}

	q := ActivityQuery(ctx)

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

type ActivityCreateData struct {
	ExperienceID uint   `json:"experience_id"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
	StartTime    string `json:"start_time"`
	EndTime      string `json:"end_time"`
	Message      string `json:"message"`
}

func ActivityCreate(ctx *app.Context, data *ActivityCreateData) (*models.Activity, error) {
	err := error(nil)

	startDate := time.Time{}
	if data.StartDate != "" {
		startDate, err = time.Parse("2006-01-02", data.StartDate)
		if err != nil {
			return nil, fmt.Errorf("invalid start date")
		}
	}

	endDate := time.Time{}
	if data.EndDate != "" {
		endDate, err = time.Parse("2006-01-02", data.EndDate)
		if err != nil {
			return nil, fmt.Errorf("invalid end date")
		}
	}

	experience := models.Experience{}
	if err := app.DB.Where("id = ?", data.ExperienceID).First(&experience).Error; err != nil {
		return nil, fmt.Errorf("experience not found")
	}

	activityCheck := models.Activity{}
	if err := app.DB.Where("experience_id = ? AND user_id = ?", data.ExperienceID, ctx.User.ID).First(&activityCheck).Error; err == nil {
		return nil, fmt.Errorf("already enrolled")
	}

	activity := models.Activity{
		UserID:         ctx.User.ID,
		ExperienceID:   data.ExperienceID,
		OrganizationID: experience.OrganizationID,
		StartDate:      startDate,
		EndDate:        endDate,
		StartTime:      data.StartTime,
		EndTime:        data.EndTime,
		Message:        data.Message,
	}

	if err := app.DB.Create(&activity).Error; err != nil {
		return nil, err
	}

	return &activity, nil
}

type ActivityUpdateData struct {
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	StartTime string    `json:"start_time"`
	EndTime   string    `json:"end_time"`
	Message   string    `json:"message"`
}

func ActivityUpdate(ctx *app.Context, id uint, data *ActivityUpdateData) (*models.Activity, error) {
	var activity models.Activity

	if err := ActivityQuery(ctx).Where("id = ?", id).First(&activity).Error; err != nil {
		return nil, err
	}

	activity.StartDate = data.StartDate
	activity.EndDate = data.StartDate
	activity.StartTime = data.StartTime
	activity.EndTime = data.EndTime
	activity.Message = data.Message

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
