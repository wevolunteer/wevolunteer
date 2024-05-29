package app

import (
	"context"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type Context struct {
	User *models.User
	Role Role
}

func FromHTTPContext(c context.Context) *Context {
	user := c.Value("user").(*models.User)

	role, ok := c.Value("role").(Role)

	if !ok {
		role = Public
	}

	return &Context{
		User: user,
		Role: role,
	}
}

func SetHumaContext(c huma.Context, user models.User, role Role) {
	huma.WithValue(c, "user", user)
	huma.WithValue(c, "role", role)
}
