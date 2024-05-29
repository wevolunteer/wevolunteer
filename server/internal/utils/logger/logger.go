package logger

import (
	"sync"

	"go.uber.org/zap"
)

var (
	instance *zap.SugaredLogger
	once     sync.Once
)

// GetLogger returns the singleton instance of the logger
func GetLogger() *zap.SugaredLogger {

	once.Do(func() {
		var logger *zap.Logger
		var err error

		logger, err = zap.NewDevelopment()

		if err != nil {
			panic(err)
		}
		instance = logger.Sugar()
	})

	return instance
}
