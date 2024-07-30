package activities

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

var (
	RouteTag []string = []string{"Activities"}
)

func RegisterRoutes(api huma.API) {
	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-list",
			Summary:     "List activities",
			Method:      http.MethodGet,
			Path:        "/activities",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityRead),
			},
		},
		ActivityListController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-get",
			Summary:     "Get activity",
			Method:      http.MethodGet,
			Path:        "/activities/{id}",
			Tags:        RouteTag,

			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityRead),
			},
		},
		ActivityGetController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-create",
			Summary:     "Create activity",
			Method:      http.MethodPost,
			Path:        "/activities",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityWrite),
			},
		},
		ActivityCreateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-update",
			Summary:     "Update activity",
			Method:      http.MethodPatch,
			Path:        "/activities/{id}",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityWrite),
			},
		},
		ActivityUpdateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-delete",

			Summary: "Delete activity",
			Method:  http.MethodDelete,
			Path:    "/activities/{id}",
			Tags:    RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityWrite),
			},
		},
		ActivityDeleteController,
	)
}
