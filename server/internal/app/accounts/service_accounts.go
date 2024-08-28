package accounts

import (
	"crypto/rand"
	"encoding/base64"

	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type ServiceAccountCreateData struct {
	UserID uint `json:"user_id"`
}

func generateRandomString(n int) (string, error) {
	// Genera n byte casuali
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	// Codifica i byte in Base64 per ottenere una stringa
	return base64.URLEncoding.EncodeToString(b)[:n], nil
}

func ServiceAccountCreate(data *ServiceAccountCreateData) (*models.ServiceAccount, error) {

	token, err := generateRandomString(64)

	if err != nil {
		return nil, err
	}

	serviceAccount := &models.ServiceAccount{
		UserID: data.UserID,
		Token:  token,
	}

	if err := app.DB.Save(&serviceAccount).Error; err != nil {
		return nil, err
	}

	return serviceAccount, nil
}
