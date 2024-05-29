package app

import (
	"fmt"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humaecho"
	"github.com/wevolunteer/wevolunteer/admin"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Application struct {
	Echo *echo.Echo
	Api  huma.API
}

func Init(cfgFile string) (*Application, error) {
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	ParseConfig(cfgFile)

	err := DatabaseInit(&DatabaseConfig{
		dsn:          Config.DB_DSN,
		maxOpenConns: Config.DB_MAX_OPEN_CONNECTIONS,
		maxIdleConns: Config.DB_MAX_IDLE_CONNECTIONS,
		maxLifetime:  Config.DB_MAX_LIFETIME,
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create database: %v", err)
	}

	apiConfig := huma.DefaultConfig("WeVolunteer", "1.0.0")

	apiConfig.Servers = []*huma.Server{
		{URL: "http://localhost:3000/api"},
	}

	g := e.Group("/api")

	api := humaecho.NewWithGroup(e, g, apiConfig)

	app := &Application{
		Echo: e,
		Api:  api,
	}

	return app, nil
}

func (a *Application) RegisterAdminRoutes() {
	distDirFS := echo.MustSubFS(admin.AdminDistFS, "dist")
	distIndexHtml := echo.MustSubFS(admin.AdminIndexHTML, "dist")

	assetHandler := http.FileServer(http.FS(distDirFS))

	a.Echo.FileFS("/", "index.html", distDirFS)
	a.Echo.StaticFS("/", distIndexHtml)
	a.Echo.GET("/admin/*", echo.WrapHandler(http.StripPrefix("/admin/", assetHandler)))
}

func (a *Application) Shutdown() {
	a.Echo.Close()

	db, err := DB.DB()

	if err != nil {
		fmt.Println("Failed to close database:", err)
	}

	db.Close()
}
