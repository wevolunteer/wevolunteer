package notifications

import (
	"context"
	"log"

	novu "github.com/novuhq/go-novu/lib"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

const (
	NotificationVerificationCodeAuth   = "verification-code"
	NotificationVerificationCodeDelete = "verification-code-delete"
	NotificationWelcome                = "welcome"
)

func Init() {
	accountsEventsSubscribe()
}

func NotificationTrigger(recipient *models.User, eventId string, payload map[string]interface{}) error {
	if app.Config.NOVU_API_KEY == "" {
		return nil
	}

	ctx := context.Background()

	to := map[string]interface{}{
		"lastName":     recipient.LastName,
		"firstName":    recipient.FirstName,
		"subscriberId": recipient.UID,
		"email":        recipient.Email,
	}

	data := novu.ITriggerPayloadOptions{To: to, Payload: payload}

	novuClient := novu.NewAPIClient(app.Config.NOVU_API_KEY, &novu.Config{})

	_, err := novuClient.EventApi.Trigger(ctx, eventId, data)
	if err != nil {
		log.Fatal("novu error", err.Error())
		return err
	}

	return nil
}

func NotificationAddSubscriber(recipient *models.User) error {
	if app.Config.NOVU_API_KEY == "" {
		return nil
	}

	data := map[string]interface{}{
		"lastName":     recipient.LastName,
		"firstName":    recipient.FirstName,
		"subscriberId": recipient.UID,
		"email":        recipient.Email,
	}

	ctx := context.Background()
	novuClient := novu.NewAPIClient(app.Config.NOVU_API_KEY, &novu.Config{})

	_, err := novuClient.SubscriberApi.Identify(ctx, recipient.UID, data)
	if err != nil {
		log.Fatal("novu error", err.Error())
		return err
	}

	return nil
}

func NotificationAddDevice(recipient *models.User, deviceToken string) error {
	if app.Config.NOVU_API_KEY == "" {
		return nil
	}

	err := NotificationAddSubscriber(recipient)

	if err != nil {
		return err
	}

	ctx := context.Background()
	novuClient := novu.NewAPIClient(app.Config.NOVU_API_KEY, &novu.Config{})

	novuClient.SubscriberApi.UpdateCredentials(ctx, recipient.UID, novu.SubscriberCredentialPayload{
		Credentials: novu.Credentials{
			DeviceTokens: []string{deviceToken},
		},
		ProviderId: "expo",
	})

	return nil
}
