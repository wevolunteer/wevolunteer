package events

import (
	"sync"

	"github.com/wevolunteer/wevolunteer/internal/utils/logger"
)

type EventType string

const (
	UserSignup           EventType = "user.signup"
	UserLogin            EventType = "user.login"
	UserCodeRequested    EventType = "user.code.requested"
	UserCodeVerified     EventType = "user.code.verified"
	ActivityPublished    EventType = "activity.published"
	UserDeviceRegistered EventType = "user.device.registered"
)

type Event struct {
	Type    EventType
	Payload EventPayload
}

type EventHandler func(Event) error

var (
	subscribers = make(map[EventType][]EventHandler)
	mu          sync.RWMutex
)

var log = logger.GetLogger()

func Subscribe(eventType EventType, handler EventHandler) {
	mu.Lock()
	defer mu.Unlock()
	subscribers[eventType] = append(subscribers[eventType], handler)
}

func Publish(event Event) {
	mu.RLock()
	defer mu.RUnlock()
	handlers, found := subscribers[event.Type]
	log.Debugf("Publishing event %s", event.Type)
	if found {
		for _, handler := range handlers {
			handler(event)
		}
	}
}
