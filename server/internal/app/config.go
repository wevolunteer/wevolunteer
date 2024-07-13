package app

import (
	"path/filepath"
	"time"

	"github.com/spf13/viper"
)

const (
	EnvProduction  = "production"
	EnvTesting     = "testing"
	EnvDevelopment = "development"
)

var Config struct {
	ENV                     string
	DEBUG                   bool
	JWT_SECRET              string
	DB_DSN                  string
	DB_MAX_OPEN_CONNECTIONS int
	DB_MAX_IDLE_CONNECTIONS int
	DB_MAX_LIFETIME         time.Duration
	NOVU_API_KEY            string
}

func ParseConfig(path string) {
	env := viper.GetString("SERVER_ENV")

	if env == "" {
		env = EnvDevelopment
	}

	var configFile string
	switch env {
	case EnvDevelopment:
		configFile = "config.dev.yml"
	case EnvTesting:
		configFile = "config.test.yml"
	case EnvProduction:
		configFile = "config.prod.yml"
	}

	viper.SetDefault("db_dsn", "sqlite3://db.sqlite3")
	viper.SetDefault("debug", false)
	viper.SetDefault("db_max_open_connections", 100)
	viper.SetDefault("db_max_idle_connections", 10)

	configFilePath := filepath.Join(path, configFile)

	viper.SetConfigFile(configFilePath)

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err == nil {
		log.Debug("Using config file: ", viper.ConfigFileUsed())
	}

	Config.DEBUG = viper.GetBool("debug")
	Config.DB_DSN = viper.GetString("db_dsn")
	Config.JWT_SECRET = viper.GetString("jwt_secret")
	Config.NOVU_API_KEY = viper.GetString("novu_apikey")
	Config.DB_MAX_LIFETIME = time.Hour

	if Config.JWT_SECRET == "" {
		log.Fatal("JWT_SECRET must be set")
	}

	if Config.NOVU_API_KEY == "" {
		log.Fatal("NOVU_API_KEY must be set")
	}
}
