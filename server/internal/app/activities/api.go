package activities

import (
	"context"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"github.com/wevolunteer/wevolunteer/internal/utils/logger"
)

var log = logger.GetLogger()

type ActivityListResponse struct {
	Body ActivityListData
}

func ActivityListController(
	c context.Context,
	input *ActivityFilters,
) (*ActivityListResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := ActivityList(ctx, input)

	if err != nil {
		return nil, huma.NewError(400, err.Error())
	}

	resp := &ActivityListResponse{}

	resp.Body = *data

	return resp, nil
}

type ActivityGetRequest struct {
	ID uint `path:"id"`
}

type ActivityGetResponse struct {
	Body models.Activity
}

func ActivityGetController(c context.Context, input *ActivityGetRequest) (*ActivityGetResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := ActivityGet(ctx, input.ID)

	if err != nil {
		return nil, err
	}

	if data == nil {
		return nil, &app.ErrNotAuthorized{}
	}

	resp := &ActivityGetResponse{}

	resp.Body = *data

	return resp, nil
}

type ActivityCreateRequest struct {
	Body ActivityCreateData
}

type ActivityCreateResponse struct {
	Body models.Activity
}

func ActivityCreateController(
	c context.Context,
	input *ActivityCreateRequest,
) (*ActivityCreateResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := ActivityCreate(ctx, &input.Body)

	if err != nil {
		return nil, huma.NewError(400, err.Error())
	}

	resp := &ActivityCreateResponse{}

	resp.Body = *data

	return resp, nil
}

type ActivityUpdateRequest struct {
	ID   uint `path:"id"`
	Body ActivityUpdateData
}

type ActivityUpdateResponse struct {
	Body models.Activity
}

func ActivityUpdateController(
	c context.Context,
	input *ActivityUpdateRequest,
) (*ActivityUpdateResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := ActivityUpdate(ctx, input.ID, &input.Body)

	if err != nil {
		return nil, huma.NewError(400, err.Error())
	}

	resp := &ActivityUpdateResponse{}

	resp.Body = *data

	return resp, nil
}

type ActivityDeleteRequest struct {
	ID uint `path:"id"`
}

type ActivityDeleteResponse struct{}

func ActivityDeleteController(
	c context.Context,
	input *ActivityDeleteRequest,
) (*ActivityDeleteResponse, error) {
	ctx := app.FromHTTPContext(c)
	err := ActivityDelete(ctx, input.ID)

	if err != nil {
		return nil, huma.NewError(400, err.Error())
	}

	resp := &ActivityDeleteResponse{}

	return resp, nil
}
