package places

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

func RegisterRoutes(api huma.API) {
	huma.Register(api, huma.Operation{
		OperationID: "places-list",
		Summary:     "List places",
		Method:      http.MethodGet,
		Path:        "/places",
		Tags:        []string{"Places"},
		Middlewares: huma.Middlewares{
			app.AuthMiddleware(api),
		},
	}, PlaceListController)
}
