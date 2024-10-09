package events

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type EventPayload struct {
	Ctx  app.Context
	Data interface{}
}

type UserDeviceCreatePayload struct {
	User   *models.User
	Device *models.UserDevice
}

type UserDeviceCreateEvent struct {
	Ctx  app.Context
	Data UserDeviceCreatePayload
}
