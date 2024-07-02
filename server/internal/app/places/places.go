package places

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"gorm.io/gorm"
)

func PlaceQuery(ctx *app.Context) *gorm.DB {
	q := app.DB.Model(&models.Place{})

	return q
}

type PlaceListData struct {
	Results  []models.Place      `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

type PlaceFilters struct {
	app.PaginationInput
	Query string `query:"q"`
}

func PlaceList(ctx *app.Context, filters *PlaceFilters) (*PlaceListData, error) {
	data := &PlaceListData{}

	q := PlaceQuery(ctx)

	if filters != nil {
		if filters.Query != "" {
			q = q.Where("name ILIKE ?", filters.Query+"%")
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
