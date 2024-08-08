package categories

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

func RegisterRoutes(api huma.API) {
	huma.Register(api, huma.Operation{
		OperationID: "category-get",
		Summary:     "Get category",
		Method:      http.MethodGet,
		Path:        "/categories/{id}",
		Tags:        []string{"Categories"},
	}, CategoryGetController)

	huma.Register(api, huma.Operation{
		OperationID: "category-list",
		Summary:     "List categories",
		Method:      http.MethodGet,
		Path:        "/categories",
		Tags:        []string{"Categories"},
	}, CategoryListController)

	huma.Register(api, huma.Operation{
		OperationID: "category-create",
		Summary:     "Create category",
		Method:      http.MethodPost,
		Path:        "/categories",
		Tags:        []string{"Categories"},
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.CategoryWrite),
		},
	}, CategoryCreateController)

	huma.Register(api, huma.Operation{
		OperationID: "category-update",
		Summary:     "Update category",
		Method:      http.MethodPut,
		Path:        "/categories/{id}",
		Tags:        []string{"Categories"},
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.CategoryWrite),
		},
	}, CategoryUpdateController)

	huma.Register(api, huma.Operation{
		OperationID: "category-delete",
		Summary:     "Delete category",
		Method:      http.MethodDelete,
		Path:        "/categories/{id}",
		Tags:        []string{"Categories"},
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.CategoryWrite),
		},
	}, CategoryDeleteController)

}
