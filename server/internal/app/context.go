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
	user, ok := c.Value("user").(*models.User)
	if !ok {
		user = nil
	}

	role, ok := c.Value("role").(Role)

	if !ok {
		role = RolePublic
	}

	return &Context{
		User: user,
		Role: role,
	}
}

func SetHumaContext(c huma.Context, user *models.User, role Role) {
	huma.WithValue(c, "user", user)
	huma.WithValue(c, "role", role)
}
