package organizations

import (
	"context"
	"fmt"

	"github.com/wevolunteer/wevolunteer/internal/app"
)

type OrganizationListResponse struct {
	Body *OrganizationListData
}

func OrganizationListController(c context.Context, input *OrganizationFilters) (*OrganizationListResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := OrganizationsList(ctx, input)

	if err != nil {
		return nil, err
	}

	resp := &OrganizationListResponse{
		Body: data,
	}

	return resp, nil
}

type OrganizationGetRequest struct {
	ID uint `path:"id"`
}

type OrganizationGetResponse struct {
	Body ExtendedOrganization
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
	Body ExtendedOrganization
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

	resp.Body = ExtendedOrganization{
		Organization: *data,
	}

	return resp, nil
}

type OrganizationUpdateRequest struct {
	ID   uint `path:"id"`
	Body OrganizationUpdateData
}

type OrganizationUpdateResponse struct {
	Body ExtendedOrganization
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

type OrganizationFavoriteRequest struct {
	ID uint `path:"id"`
}

type OrganizationFavoriteResponse struct{}

func OrganizationAddToFavoritesController(
	c context.Context,
	input *OrganizationFavoriteRequest,
) (*OrganizationFavoriteResponse, error) {
	ctx := app.FromHTTPContext(c)
	err := OrganizationFollow(ctx, input.ID)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	resp := &OrganizationFavoriteResponse{}

	return resp, nil
}

func OrganizationRemoveFromFavoritesController(
	c context.Context,
	input *OrganizationFavoriteRequest,
) (*OrganizationFavoriteResponse, error) {
	ctx := app.FromHTTPContext(c)
	err := OrganizationUnfollow(ctx, input.ID)

	if err != nil {
		return nil, err
	}

	resp := &OrganizationFavoriteResponse{}

	return resp, nil
}
