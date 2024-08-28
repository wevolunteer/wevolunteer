package commands

import (
	"fmt"

	"github.com/wevolunteer/wevolunteer/internal/app/accounts"
)

type CreateServiceAccountInput struct {
	Email string
}

func CreateServiceAccountCommand(input CreateServiceAccountInput) error {
	fmt.Println("Create service account")

	if input.Email == "" {
		return fmt.Errorf("email is required")
	}

	user, err := accounts.UserGetByEmail(input.Email)

	if err != nil {
		return err
	}

	data := accounts.ServiceAccountCreateData{
		UserID: user.ID,
	}

	serviceAccount, err := accounts.ServiceAccountCreate(&data)

	if err != nil {
		return err
	}

	fmt.Printf("Service account created for user %s, token: %s\n", input.Email, serviceAccount.Token)

	return nil
}
