package notifications

import (
	"fmt"
	"log"

	"github.com/wevolunteer/wevolunteer/internal/app/events"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

func accountsEventsSubscribe() {
	events.Subscribe(events.UserSignup, func(event events.Event) error {
		fmt.Printf("User signed up: %v\n", event.Payload.Data)
		return nil
	})

	events.Subscribe(events.UserLogin, func(event events.Event) error {
		fmt.Printf("User logged in: %v\n", event.Payload.Data)
		return nil
	})

	events.Subscribe(events.UserCodeRequested, func(event events.Event) error {
		user, ok := event.Payload.Data.(*models.User)

		if !ok {
			return fmt.Errorf("invalid data type")
		}

		fmt.Printf("User requested code: email %s code %s\n", user.Email, user.OTPCode)

		eventId := "verification-code"

		err := NotificationTrigger(user, eventId, map[string]interface{}{
			"verification_code": user.OTPCode,
		})

		if err != nil {
			log.Fatal("novu error", err.Error())
			return err
		}

		return nil
	})

	events.Subscribe(events.UserCodeVerified, func(event events.Event) error {
		user, ok := event.Payload.Data.(*models.User)

		if !ok {
			return fmt.Errorf("invalid data type")
		}

		fmt.Printf("User verified code: email %s", user.Email)
		return nil
	})
}
