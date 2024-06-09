package activities_test

import (
	"os"
	"testing"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/app/activities"
)

type Place struct {
	Latitude  float64
	Longitude float64
}

var (
	ACITIVITY_ORIGIN = Place{Latitude: 45.0703, Longitude: 7.6869}
	PLACE_AT_4KM     = Place{Latitude: 45.0853, Longitude: 7.6869}
	PLACE_AT_9KM     = Place{Latitude: 45.1153, Longitude: 7.6869}
	PLACE_AT_19KM    = Place{Latitude: 45.1753, Longitude: 7.6869}
	PLACE_AT_49KM    = Place{Latitude: 45.3653, Longitude: 7.6869}
	PLACE_AT_99KM    = Place{Latitude: 45.6153, Longitude: 7.6869}
)

func TestMain(m *testing.M) {
	os.Setenv("GO_ENV", "test")

	_, err := app.Init("config.test.yml")

	if err != nil {
		panic(err) // TODO: handle this case
	}

	m.Run()
}

func TestActivityList(t *testing.T) {
	ctx := &app.Context{}
	filters := &activities.ActivityFilters{
		PaginationInput: app.PaginationInput{
			Page:    1,
			PerPage: 10,
		},
		Query:      "example",
		Distance:   10.0,
		DateStart:  "2022-01-01",
		DateEnd:    "2022-12-31",
		Categories: []uint{1, 2, 3},
	}

	data, err := activities.ActivityList(ctx, filters)
	if err != nil {
		t.Errorf("ActivityList returned an error: %v", err)
	}

	// Add assertions here to validate the results

	// Example assertion:
	if len(data.Results) != 10 {
		t.Errorf("Expected 10 results, but got %d", len(data.Results))
	}
}
