package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/danielgtaylor/huma/v2/humacli"
	"github.com/spf13/cobra"
	"github.com/wevolunteer/wevolunteer/cmd/cli/commands"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/app/accounts"
	"github.com/wevolunteer/wevolunteer/internal/app/activities"
	"github.com/wevolunteer/wevolunteer/internal/app/categories"
	"github.com/wevolunteer/wevolunteer/internal/app/experiences"
	"github.com/wevolunteer/wevolunteer/internal/app/organizations"
	"github.com/wevolunteer/wevolunteer/internal/app/places"
	"github.com/wevolunteer/wevolunteer/internal/utils/logger"

	_ "github.com/wevolunteer/wevolunteer/internal/app/notifications" // Import notifications package to subscribe to events
)

var log = logger.GetLogger()

var (
	CLI_CMD = "wevolunteer"
	VERSION = "1.0.0"
)

type CLIOptions struct {
	Debug      bool   `doc:"Enable debug logging"`
	Host       string `doc:"Hostname to listen on." default:"0.0.0.0"`
	Port       int    `doc:"Port to listen on." short:"p" default:"3000"`
	ConfigFile string `doc:"Config file" short:"c" default:"."`
}

func main() {
	cli := humacli.New(func(hooks humacli.Hooks, opts *CLIOptions) {
		a, err := app.Init(opts.ConfigFile)

		if err != nil {
			panic(err) // TODO: handle this case
		}

		a.RegisterAdminRoutes()
		accounts.RegisterRoutes(a.Api)
		organizations.RegisterRoutes(a.Api)
		activities.RegisterRoutes(a.Api)
		experiences.RegisterRoutes(a.Api)
		categories.RegisterRoutes(a.Api)
		places.RegisterRoutes(a.Api)

		hooks.OnStart(func() {
			log.Infof("Starting API server at http://%s:%d\n", opts.Host, opts.Port)
			listen_to := fmt.Sprintf("%s:%d", opts.Host, opts.Port)

			go func() {
				if err := http.ListenAndServe(listen_to, a.Echo); err != nil {
					fmt.Println("Web server terminated:", err)
				}
			}()

			quit := make(chan os.Signal, 1)
			signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
			<-quit
		})

		hooks.OnStop(func() {
			a.Shutdown()
		})
	})

	cmd := cli.Root()
	cmd.Use = CLI_CMD
	cmd.Version = VERSION

	cmd.AddCommand(&cobra.Command{
		Use:   "fake-data",
		Short: "Generate fake data",
		Run: humacli.WithOptions(func(cmd *cobra.Command, args []string, opts *CLIOptions) {

			_, err := app.Init(opts.ConfigFile)
			if err != nil {
				panic(err)
			}

			commands.FakeDataCommand()
			fmt.Println("")
		}),
	})

	cmd.AddCommand(&cobra.Command{
		Use:   "geo-data",
		Short: "Initialize GEO data",
		Run: humacli.WithOptions(func(cmd *cobra.Command, args []string, opts *CLIOptions) {

			_, err := app.Init(opts.ConfigFile)
			if err != nil {
				panic(err)
			}

			commands.GeoDataCommand()
			fmt.Println("")
		}),
	})

	cli.Run()
}
