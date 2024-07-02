package commands

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"

	"gorm.io/gorm/clause"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type GeoData struct {
	City string
	Lat  float64
	Long float64
}

func GeoDataCommand() error {
	fmt.Println("Import Geo Data")

	geoData, err := readGEODataFile("data/geoitaly.csv")

	if err != nil {
		log.Fatal(err)
	}

	app.DB.Clauses(
		clause.OnConflict{
			Columns:   []clause.Column{{Name: "name"}},
			DoUpdates: clause.AssignmentColumns([]string{"latitude", "longitude"}),
		},
	).CreateInBatches(&geoData, 1000)

	return nil
}

func readGEODataFile(path string) ([]models.Place, error) {
	fmt.Println("Reading Geo Data File")
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	reader.Comma = ';'
	reader.FieldsPerRecord = -1

	var geoData []models.Place
	var seenCities = make(map[string]bool)

	if _, err := reader.Read(); err != nil {
		log.Fatal(err)
	}

	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		city := record[1]
		coordinates := record[19]
		coords := strings.Split(coordinates, ", ")
		if len(coords) != 2 {
			log.Fatalf("Invalid coordinates format: %s", coordinates)
		}

		lat, err := strconv.ParseFloat(coords[0], 64)
		if err != nil {
			log.Fatal(err)
		}
		long, err := strconv.ParseFloat(coords[1], 64)
		if err != nil {
			log.Fatal(err)
		}

		if _, ok := seenCities[city]; ok {
			continue
		}

		seenCities[city] = true

		item := models.Place{
			Name:      city,
			Latitude:  lat,
			Longitude: long,
		}

		geoData = append(geoData, item)
	}

	return geoData, nil
}
