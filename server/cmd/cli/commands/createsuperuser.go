package commands

import (
	"fmt"

	"github.com/wevolunteer/wevolunteer/internal/app/accounts"
)

type CreateSuperUserInput struct {
	Email string
}

func CreateSuperUserCommand() error {
	fmt.Println("Create super user")

	data := accounts.UserCreateData{
		Email:       "admin@admin.it",
		Password:    "admin",
		IsSuperUser: true,
	}

	_, err := accounts.UserCreate(&data)

	if err != nil {
		return err
	}

	return nil
}
