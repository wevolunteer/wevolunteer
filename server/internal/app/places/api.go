package places

import (
	"context"

	"github.com/wevolunteer/wevolunteer/internal/app"
)

type PlaceListResponse struct {
	Body PlaceListData
}

func PlaceListController(
	c context.Context,
	input *PlaceFilters,
) (*PlaceListResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := PlaceList(ctx, input)

	if err != nil {
		return nil, err
	}

	resp := &PlaceListResponse{}

	resp.Body = *data

	return resp, nil
}
