package app

import (
	"fmt"
	"strings"
	"time"

	_ "github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/wevolunteer/wevolunteer/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	DefaultPageSize = 20
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
		&models.Experience{},
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

	if !strings.Contains(config.dsn, "postgres://") {
		return nil, fmt.Errorf("invalid dsn")
	}

	db, err = gorm.Open(postgres.Open(config.dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	return db, nil
}

type PaginationInput struct {
	Page    int `query:"page"`
	PerPage int `query:"per_page"`
}

type PaginationInfo struct {
	Total   int64 `json:"total"`
	Page    int   `json:"page"`
	PerPage int   `json:"per_page"`
}

func Paginate(pagination PaginationInput) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if pagination.Page < 1 {
			pagination.Page = 1
		}

		if pagination.PerPage == 0 {
			pagination.PerPage = DefaultPageSize
		}

		return db.Offset((pagination.Page - 1) * pagination.PerPage).Limit(pagination.PerPage)
	}
}

func PageInfo(db *gorm.DB, pagination PaginationInput) (*PaginationInfo, error) {
	pageInfo := &PaginationInfo{
		Page:    pagination.Page,
		PerPage: pagination.PerPage,
	}

	fmt.Printf("pre pagination: %+v\n", pagination)

	if pagination.Page < 1 {
		pageInfo.Page = 1
	}

	if pagination.PerPage == 0 {
		pageInfo.PerPage = DefaultPageSize
	}

	if err := db.Count(&pageInfo.Total).Error; err != nil {
		return nil, err
	}
	fmt.Printf("post pagination: %+v\n", pagination)

	return pageInfo, nil
}
