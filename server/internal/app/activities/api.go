package activities

import (
	"context"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

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
		return nil, err
	}

	resp := &ActivityListResponse{}

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
		return nil, err
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
		return nil, err
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
		return nil, err
	}

	resp := &ActivityDeleteResponse{}

	return resp, nil
}
