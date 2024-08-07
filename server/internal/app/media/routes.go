package media

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

var (
	RouteTag []string = []string{"Media"}
)

func RegisterRoutes(api huma.API) {
	huma.Register(
		api,
		huma.Operation{
			OperationID: "media-upload",
			Summary:     "Upload new Media",
			Method:      http.MethodPost,
			Path:        "/media",
			Tags:        RouteTag,
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
			},
		},
		MediaUploadController,
	)
}
