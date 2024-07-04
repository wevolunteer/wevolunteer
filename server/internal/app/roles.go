package app

import "context"

type Role string

const (
	RolePublic       = "public"
	RoleVolunteer    = "volunteer"
	RoleOrganization = "organization"
	RoleSuperUser    = "superuser"
)

type Permission string

const (
	OrganizationRead  = "organization:read"
	OrganizationWrite = "organization:write"
	ActivityRead      = "activity:read"
	ActivityWrite     = "activity:write"
	ExperienceRead    = "experience:read"
	ExperienceWrite   = "experience:write"
	UserRead          = "user:read"
	UserWrite         = "user:write"
	CategoryRead      = "category:read"
	CategoryWrite     = "category:write"
)

var rolePermissions = map[Role][]Permission{
	RolePublic: {
		OrganizationRead,
		ActivityRead,
	},
	RoleVolunteer: {
		OrganizationRead,
		ActivityRead,
		ExperienceRead,
		ExperienceWrite,
	},
	RoleOrganization: {
		OrganizationRead,
		OrganizationWrite,
		ActivityRead,
		ActivityWrite,
	},
	RoleSuperUser: {
		OrganizationRead,
		OrganizationWrite,
		ActivityRead,
		ActivityWrite,
		ExperienceRead,
		ExperienceWrite,
		UserRead,
		UserWrite,
	},
}

func HasPermission(role Role, permission Permission) bool {
	permissions, exists := rolePermissions[role]
	if !exists {
		return false
	}

	for _, p := range permissions {
		if p == permission {
			return true
		}
	}

	return false
}

func HasContextPermission(c context.Context, permission Permission) bool {
	userRole, ok := c.Value("role").(Role)
	if !ok {
		return false
	}

	return HasPermission(userRole, permission)
}
