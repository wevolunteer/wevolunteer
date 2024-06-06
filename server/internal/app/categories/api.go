package categories

import (
	"context"
	"fmt"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type CategoryListResponse struct {
	Body CategoryListData
}

func CategoryListController(
	c context.Context,
	input *CategoryFilters,
) (*CategoryListResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := CategoryList(ctx, input)

	if err != nil {
		return nil, err
	}

	fmt.Println(data)

	resp := &CategoryListResponse{}

	resp.Body = *data

	return resp, nil
}

type CategoryCreateRequest struct {
	Body CategoryCreateData
}

type CategoryCreateResponse struct {
	Body models.Category
}

func CategoryCreateController(
	c context.Context,
	input *CategoryCreateRequest,
) (*CategoryCreateResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := CategoryCreate(ctx, &input.Body)

	if err != nil {
		return nil, err
	}

	resp := &CategoryCreateResponse{}

	resp.Body = *data

	return resp, nil
}

type CategoryUpdateRequest struct {
	ID   uint `path:"id"`
	Body CategoryUpdateData
}

type CategoryUpdateResponse struct {
	Body models.Category
}

func CategoryUpdateController(
	c context.Context,
	input *CategoryUpdateRequest,
) (*CategoryUpdateResponse, error) {
	ctx := app.FromHTTPContext(c)
	data, err := CategoryUpdate(ctx, input.ID, &input.Body)

	if err != nil {
		return nil, err
	}

	resp := &CategoryUpdateResponse{}

	resp.Body = *data

	return resp, nil
}

type CategoryDeleteRequest struct {
	ID uint `path:"id"`
}

type CategoryDeleteResponse struct{}

func CategoryDeleteController(
	c context.Context,
	input *CategoryDeleteRequest,
) (*CategoryDeleteResponse, error) {
	ctx := app.FromHTTPContext(c)
	err := CategoryDelete(ctx, input.ID)

	if err != nil {
		return nil, err
	}

	resp := &CategoryDeleteResponse{}

	return resp, nil
}
