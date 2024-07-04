package app

import (
	"net/http"
	"strings"

	"github.com/danielgtaylor/huma/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"github.com/wevolunteer/wevolunteer/internal/utils/logger"
)

var log = logger.GetLogger()

type JWTClaims struct {
	Role Role `json:"role"`
	jwt.RegisteredClaims
}

func AuthMiddleware(api huma.API) func(ctx huma.Context, next func(huma.Context)) {
	return func(ctx huma.Context, next func(huma.Context)) {
		tokenString := strings.TrimPrefix(ctx.Header("Authorization"), "Bearer ")
		if len(tokenString) == 0 {
			log.Debug("No token provided")
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		claims := &JWTClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(Config.JWT_SECRET), nil
		})

		if err != nil || !token.Valid {
			log.Debugf("Invalid token provided: %v", err)
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		var user models.User

		if err := DB.Model(&models.User{}).Where("email = ?", claims.Subject).First(&user).Error; err != nil {
			log.Debug("User not found")
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		ctx = huma.WithValue(ctx, "user", user)
		ctx = huma.WithValue(ctx, "role", claims.Role)

		next(ctx)
	}
}

func RoleMiddleware(api huma.API, permission Permission) func(ctx huma.Context, next func(huma.Context)) {
	return func(ctx huma.Context, next func(huma.Context)) {
		var user_role Role = RolePublic

		user, ok := ctx.Context().Value("user").(models.User)

		if ok {
			user_role = RoleVolunteer
		}

		if user.IsRootAdmin {
			user_role = RoleSuperUser
		}

		ok = HasPermission(user_role, permission)

		if !ok {
			huma.WriteErr(api, ctx, http.StatusForbidden, "Forbidden")
			return
		}

		ctx = huma.WithValue(ctx, "role", user_role)
		next(ctx)
	}
}
