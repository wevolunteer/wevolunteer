package events

import (
	"sync"
	"testing"
)

func TestSubscribePublish(t *testing.T) {
	// Reset subscribers map
	subscribers = make(map[EventType][]EventHandler)
	eventReceived := false

	var handler EventHandler = func(e Event) error {
		if e.Type == UserLogin {
			eventReceived = true
		}

		return nil
	}

	Subscribe(UserLogin, handler)

	Publish(Event{
		Type:    UserLogin,
		Payload: EventPayload{},
	})

	if !eventReceived {
		t.Error("Expected event handler to be called, but it was not")
	}
}

func TestConcurrentSubscribePublish(t *testing.T) {
	subscribers = make(map[EventType][]EventHandler)

	var wg sync.WaitGroup
	numHandlers := 10
	eventCount := 1000
	receivedEvents := make([]bool, numHandlers)

	for i := 0; i < numHandlers; i++ {
		handlerIndex := i
		handler := func(e Event) error {
			if e.Type == UserLogin {
				receivedEvents[handlerIndex] = true
			}

			return nil
		}
		Subscribe(UserLogin, handler)
	}

	wg.Add(eventCount)
	for i := 0; i < eventCount; i++ {
		go func() {
			defer wg.Done()
			Publish(Event{
				Type:    UserLogin,
				Payload: EventPayload{},
			})
		}()
	}

	wg.Wait()

	for i, received := range receivedEvents {
		if !received {
			t.Errorf("Expected event handler %d to be called, but it was not", i)
		}
	}
}
