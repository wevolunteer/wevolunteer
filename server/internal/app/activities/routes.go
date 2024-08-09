package activities

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

var (
	RouteTagActivities []string = []string{"Activities"}
)

func RegisterRoutes(api huma.API) {
	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-list",
			Summary:     "List activities",
			Method:      http.MethodGet,
			Path:        "/activities",
			Tags:        RouteTagActivities,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityRead),
			},
			Security: []map[string][]string{
				{"bearer": {}},
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
			Tags:        RouteTagActivities,

			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityRead),
			},
			Security: []map[string][]string{
				{"bearer": {}},
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
			Tags:        RouteTagActivities,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityWrite),
			},
			Security: []map[string][]string{
				{"bearer": {}},
			},
		},
		ActivityCreateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "activities-update",
			Summary:     "Update activity",
			Method:      http.MethodPut,
			Path:        "/activities/{id}",
			Tags:        RouteTagActivities,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityWrite),
			},
			Security: []map[string][]string{
				{"bearer": {}},
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
			Tags:    RouteTagActivities,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ActivityWrite),
			},
			Security: []map[string][]string{
				{"bearer": {}},
			},
		},
		ActivityDeleteController,
	)
}
