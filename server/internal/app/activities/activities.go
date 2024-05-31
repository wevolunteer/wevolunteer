package activities

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func ActivityQuery(ctx *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Activity{})

	if ctx.Role == app.Volunteer || ctx.Role == app.Public {
		q = q.Where("published = ?", true)
	}

	return q
}

type ActivityListData struct {
	Results []models.Activity `json:"results"`
}

func ActivityList(ctx *app.Context, query string) (*ActivityListData, error) {

	var activities []models.Activity

	q := ActivityQuery(ctx)

	if query != "" {
		q = q.Where("name LIKE ?", "%"+query+"%")
	}

	if err := q.Find(&activities).Error; err != nil {
		return nil, err
	}

	return &ActivityListData{
		Results: activities,
	}, nil
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
