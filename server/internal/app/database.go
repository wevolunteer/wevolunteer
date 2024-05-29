package app

import (
	"fmt"
	"strings"
	"time"

	_ "github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/wevolunteer/wevolunteer/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

type DatabaseConfig struct {
	dsn          string
	maxOpenConns int
	maxIdleConns int
	maxLifetime  time.Duration
}

func DatabaseInit(config *DatabaseConfig) error {
	var err error
	dsn := strings.Split(config.dsn, "://")

	if len(dsn) != 2 {
		return fmt.Errorf("invalid dsn")
	}

	DB, err = openDatabase(config)

	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	DB.AutoMigrate(
		&models.User{},
		&models.Organization{},
		&models.Activity{},
		&models.Enrollment{},
	)

	// Set up the database connection pool
	sqlDB, err := DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get database connection pool: %w", err)
	}

	sqlDB.SetMaxOpenConns(config.maxOpenConns)
	sqlDB.SetMaxIdleConns(config.maxIdleConns)
	sqlDB.SetConnMaxLifetime(config.maxLifetime)

	return nil
}

func openDatabase(config *DatabaseConfig) (*gorm.DB, error) {
	var db *gorm.DB
	var err error
	dsn := strings.Split(config.dsn, "://")

	if len(dsn) != 2 {
		return nil, fmt.Errorf("invalid dsn")
	}

	switch dsn[0] {
	case "sqlite3":
		db, err = gorm.Open(sqlite.Open(dsn[1]), &gorm.Config{})
		if err != nil {
			return nil, fmt.Errorf("failed to open database: %w", err)
		}
	case "postgres":
		db, err = gorm.Open(postgres.Open(dsn[1]), &gorm.Config{})
		if err != nil {
			return nil, fmt.Errorf("failed to open database: %w", err)
		}
	default:
		return nil, fmt.Errorf("unsupported database driver, valid drivers are: postgres, sqlite3")
	}

	return db, nil
}
