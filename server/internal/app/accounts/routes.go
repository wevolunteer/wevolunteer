package accounts

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/app"
)

func RegisterRoutes(api huma.API) {
	huma.Register(
		api,
		huma.Operation{
			OperationID: "login",
			Method:      http.MethodPost,
			Summary:     "Login",
			Path:        "/login",
			Tags:        []string{"Accounts"},
		},
		LoginController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "signup",
			Method:      http.MethodPost,
			Summary:     "Signup",
			Path:        "/signup",
			Tags:        []string{"Accounts"},
		},
		SignupController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "refresh-token",
			Method:      http.MethodPost,
			Summary:     "Refresh token",
			Path:        "/auth/refresh",
			Tags:        []string{"Accounts"},
		},
		RefreshTokenController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "user-info",
			Method:      http.MethodGet,
			Summary:     "Get user info",
			Path:        "/auth/user",
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
			},
			Tags: []string{"Accounts"},
		},
		UserInfoController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "users-list",
			Method:      http.MethodGet,
			Summary:     "List users",
			Path:        "/users",
			Tags:        []string{"Accounts"},
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.UserRead),
			},
		},
		UserListController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "user-create",
			Method:      http.MethodPost,
			Summary:     "Create user",
			Path:        "/users",
			Tags:        []string{"Accounts"},
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.UserWrite),
			},
		},
		UserCreateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "user-update",
			Method:      http.MethodPatch,
			Summary:     "Update user",
			Path:        "/users/:id",
			Tags:        []string{"Accounts"},
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.UserWrite),
			},
		},
		UserUpdateController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "user-delete",
			Method:      http.MethodDelete,
			Summary:     "Delete user",
			Path:        "/users/:id",
			Tags:        []string{"Accounts"},
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.UserWrite),
			},
		},
		UserDeleteController,
	)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "user-get",
			Method:      http.MethodGet,
			Summary:     "Get user",
			Path:        "/users/{id}",
			Tags:        []string{"Accounts"},
			Middlewares: huma.Middlewares{
				app.AuthMiddleware(api),
				app.RoleMiddleware(api, app.UserRead),
			},
		},
		UserGetController,
	)
}
