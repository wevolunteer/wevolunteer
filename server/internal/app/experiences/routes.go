package experiences

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

var (
	RouteTag []string = []string{"Experiences"}
)

func RegisterRoutes(api huma.API) {
	huma.Register(
		api,
		huma.Operation{
			OperationID: "experiences-list",
			Summary:     "List enrollments",
			Method:      http.MethodGet,
			Path:        "/experiences",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ExperienceRead),
			},
		},
		ExperienceListController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "experiences-create",
			Summary:     "Create enrollment",
			Method:      http.MethodPost,
			Path:        "/experiences",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ExperienceWrite),
			},
		},
		ExperienceCreateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "experiences-update",
			Summary:     "Update enrollment",
			Method:      http.MethodPatch,
			Path:        "/experiences/{id}",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ExperienceWrite),
			},
		},
		ExperienceUpdateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "experiences-delete",

			Summary: "Delete enrollment",
			Method:  http.MethodDelete,
			Path:    "/experiences/{id}",
			Tags:    RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.ExperienceWrite),
			},
		},
		ExperienceDeleteController,
	)
}
