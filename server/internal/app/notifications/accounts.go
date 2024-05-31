package notifications

import (
	"fmt"

	"github.com/wevolunteer/wevolunteer/internal/app/events"
)

func accountsEventsSubscribe() {
	events.Subscribe(events.UserSignup, func(event events.Event) error {
		fmt.Printf("User signed up: %v\n", event.Payload.Data)
		return nil
	})
}
