package organizations

import (
	"context"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type OrganizationListRequest struct {
	Query string `query:"q" required:"false"`
}

type OrganizationListResponse struct {
	Body []models.Organization
}

func OrganizationListController(c context.Context, input *OrganizationListRequest) (*OrganizationListResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := OrganizationsList(ctx, input.Query)

	if err != nil {
		return nil, err
	}

	resp := &OrganizationListResponse{
		Body: data.Results,
	}

	return resp, nil
}

type OrganizationGetRequest struct {
	ID uint `path:"id"`
}

type OrganizationGetResponse struct {
	Body models.Organization
}

func OrganizationGetController(c context.Context, input *OrganizationGetRequest) (*OrganizationGetResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := OrganizationGet(ctx, input.ID)

	if err != nil {
		return nil, err
	}

	if data == nil {
		return nil, &app.ErrNotAuthorized{}
	}

	resp := &OrganizationGetResponse{}

	resp.Body = *data

	return resp, nil
}

type OrganizationCreateRequest struct {
	Body OrganizationCreateData
}

type OrganizationCreateResponse struct {
	Body models.Organization
}

func OrganizationCreateController(
	c context.Context,
	input *OrganizationCreateRequest,
) (*OrganizationCreateResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := OrganizationCreate(ctx, &input.Body)

	if err != nil {
		return nil, err
	}

	resp := &OrganizationCreateResponse{}

	resp.Body = *data

	return resp, nil
}

type OrganizationUpdateRequest struct {
	ID   uint `path:"id"`
	Body OrganizationUpdateData
}

type OrganizationUpdateResponse struct {
	Body models.Organization
}

func OrganizationUpdateController(
	c context.Context,
	input *OrganizationUpdateRequest,
) (*OrganizationUpdateResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := OrganizationUpdate(ctx, input.ID, &input.Body)

	if err != nil {
		return nil, err
	}

	resp := &OrganizationUpdateResponse{}

	resp.Body = *data

	return resp, nil
}

type OrganizationDeleteRequest struct {
	ID uint `path:"id"`
}

type OrganizationDeleteResponse struct{}

func OrganizationDeleteController(
	c context.Context,
	input *OrganizationDeleteRequest,
) (*OrganizationDeleteResponse, error) {
	ctx := app.FromHTTPContext(c)
	err := OrganizationDelete(ctx, input.ID)

	if err != nil {
		return nil, err
	}

	resp := &OrganizationDeleteResponse{}

	return resp, nil
}
