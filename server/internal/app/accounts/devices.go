package accounts

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/app/events"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func UserDeviceQuery(ctx *app.Context) *gorm.DB {
	qs := app.DB.Model(&models.UserDevice{})

	if ctx.Role == app.RolePublic {
		qs = qs.Where("1 != 1")
	} else if ctx.Role == app.RoleVolunteer || ctx.Role == app.RoleOrganization {
		qs = qs.Where("user_id = ?", ctx.User.ID)
	}

	return qs
}

type UserDeviceFilters struct {
	app.PaginationInput
}

type UserDeviceListData struct {
	Results  []models.UserDevice `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

func UserDeviceList(ctx *app.Context, filters *UserDeviceFilters) (*UserDeviceListData, error) {
	data := &UserDeviceListData{}

	q := UserDeviceQuery(ctx)

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

type UserDeviceCreateData struct {
	Brand  string `json:"brand"`
	Name   string `json:"device_name"`
	Type   string `json:"device_type"`
	Model  string `json:"model"`
	OsName string `json:"os_name"`
	Token  string `json:"token"`
}

func UserDeviceCreate(ctx *app.Context, data *UserDeviceCreateData) (*models.UserDevice, error) {
	device := models.UserDevice{
		Brand:  data.Brand,
		Name:   data.Name,
		Type:   data.Type,
		Model:  data.Model,
		OsName: data.OsName,
		Token:  data.Token,
		UserID: ctx.User.ID,
	}

	if err := app.DB.Clauses(clause.OnConflict{DoNothing: true}).Create(&device).Error; err != nil {
		return nil, err
	}

	events.Publish(events.Event{
		Type: events.UserDeviceRegistered,
		Payload: events.EventPayload{
			Data: events.UserDeviceCreatePayload{
				User:   ctx.User,
				Device: &device,
			},
		},
	})

	return &device, nil

}

func UserDeviceDelete(ctx *app.Context, id uint) error {
	var device models.UserDevice

	if err := UserDeviceQuery(ctx).Where("id = ?", id).First(&device).Error; err != nil {
		return err
	}

	if err := app.DB.Delete(&device).Error; err != nil {
		return err
	}

	return nil
}
