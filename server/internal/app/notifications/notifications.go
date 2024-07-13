package notifications

import (
	"context"
	"log"

	novu "github.com/novuhq/go-novu/lib"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

func init() {
	accountsEventsSubscribe()
}

func NotificationTrigger(recipient *models.User, eventId string, payload map[string]interface{}) error {
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
