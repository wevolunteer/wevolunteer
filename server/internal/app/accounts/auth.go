package accounts

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/app/events"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"golang.org/x/crypto/bcrypt"
)

const (
	accessTokenExpiry  = time.Minute * 15
	refreshTokenExpiry = time.Hour * 24 * 7
)

type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupData struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RefreshTokenData struct {
	RefreshToken string `json:"refresh_token"`
}

type TokenData struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

func login(data LoginData) (*TokenData, error) {
	var user models.User
	if err := app.DB.Where("email = ?", data.Email).First(&user).Error; err != nil {
		return nil, &app.ErrBadInput{Message: "user not found"}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password)); err != nil {
		return nil, &app.ErrBadInput{Message: "invalid email or password"}
	}

	accessToken, err := generateToken(user.Email, accessTokenExpiry)
	if err != nil {
		return nil, err
	}

	refreshToken, err := generateToken(user.Email, refreshTokenExpiry)
	if err != nil {
		return nil, err
	}

	events.Publish(events.Event{
		Type: events.UserLogin,
		Payload: events.EventPayload{
			Data: user,
		},
	})

	return &TokenData{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func register(data SignupData) (*TokenData, error) {
	var existingUser models.User
	if err := app.DB.Where("email = ?", data.Email).First(&existingUser).Error; err == nil {
		return nil, errors.New("user already exists")
	}

	user, err := userCreate(&UserCreateData{
		Name:        data.Name,
		Email:       data.Email,
		Password:    data.Password,
		IsSuperUser: false,
	})

	if err != nil {
		fmt.Println("err 1")
		return nil, err
	}

	accessToken, err := generateToken(user.Email, accessTokenExpiry)
	if err != nil {
		fmt.Println("err 2")
		return nil, err
	}

	refreshToken, err := generateToken(user.Email, refreshTokenExpiry)
	if err != nil {
		fmt.Println("err 3")
		return nil, err
	}

	events.Publish(events.Event{
		Type: events.UserSignup,
		Payload: events.EventPayload{
			Data: user,
		},
	})

	return &TokenData{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func refreshToken(data RefreshTokenData) (*TokenData, error) {
	claims := &jwt.RegisteredClaims{}
	token, err := jwt.ParseWithClaims(data.RefreshToken, claims, func(token *jwt.Token) (interface{}, error) {
		return app.Config.JWT_SECRET, nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("invalid refresh token")
	}

	accessToken, err := generateToken(claims.Subject, accessTokenExpiry)
	if err != nil {
		return nil, err
	}

	refreshToken, err := generateToken(claims.Subject, refreshTokenExpiry)
	if err != nil {
		return nil, err
	}

	return &TokenData{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func generateToken(email string, expiry time.Duration) (string, error) {
	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(expiry)),
		Subject:   email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(app.Config.JWT_SECRET))
}
