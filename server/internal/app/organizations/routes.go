package organizations

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

var (
	RouteTag []string = []string{"Organizations"}
)

func RegisterRoutes(api huma.API) {
	huma.Register(api, huma.Operation{
		OperationID: "organizations-get",
		Summary:     "Get organization",
		Method:      http.MethodGet,
		Path:        "/organizations/{id}",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationRead),
		},
	}, OrganizationGetController)

	huma.Register(api, huma.Operation{
		OperationID: "organizations-list",
		Summary:     "List organizations",
		Method:      http.MethodGet,
		Path:        "/organizations",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationRead),
		},
	}, OrganizationListController)

	huma.Register(api, huma.Operation{
		OperationID: "organizations-create",
		Summary:     "Create organization",
		Method:      http.MethodPost,
		Path:        "/organizations",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationWrite),
		},
	}, OrganizationCreateController)

	huma.Register(api, huma.Operation{
		OperationID: "organizations-update",
		Summary:     "Update organization",
		Method:      http.MethodPatch,
		Path:        "/organizations/{id}",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationWrite),
		},
	}, OrganizationUpdateController)

	huma.Register(api, huma.Operation{
		OperationID: "organizations-delete",
		Summary:     "Delete organization",
		Method:      http.MethodDelete,
		Path:        "/organizations/{id}",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationWrite),
		},
	}, OrganizationDeleteController)

	huma.Register(api, huma.Operation{
		OperationID: "organizations-add-to-favorites",
		Summary:     "Add organization to favorites",
		Method:      http.MethodPost,
		Path:        "/organizations/{id}/favorite",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationRead),
		},
	}, OrganizationAddToFavoritesController)

	huma.Register(api, huma.Operation{
		OperationID: "organizations-remove-from-favorites",
		Summary:     "Remove organization from favorites",
		Method:      http.MethodDelete,
		Path:        "/organizations/{id}/favorite",
		Tags:        RouteTag,
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
			app.RoleMiddleware(api, app.OrganizationRead),
		},
	}, OrganizationRemoveFromFavoritesController)
}
