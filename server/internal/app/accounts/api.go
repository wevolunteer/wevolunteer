package accounts

import (
	"context"
	"fmt"

	"github.com/danielgtaylor/huma/v2"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

// type RequestCodeInput struct {
// }

// func RequestCodeController(c context.Context, input *struct{}) (*AuhenticationResponse, error) {
// 	token, err := requestCode()

// 	if err != nil {
// 		return nil, huma.Error400BadRequest(err.Error())
// 	}

// 	resp := &AuhenticationResponse{}
// 	resp.Body = *token
// 	return resp, nil
// }

type LoginInput struct {
	Body LoginData
}

type AuhenticationResponse struct {
	Body TokenData
}

func LoginController(c context.Context, input *LoginInput) (*AuhenticationResponse, error) {
	token, err := login(input.Body)

	if err != nil {
		return nil, huma.Error401Unauthorized("invalid email or password")
	}

	resp := &AuhenticationResponse{
		Body: *token,
	}

	return resp, nil
}

type SignupInput struct {
	Body SignupData
}

func SignupController(c context.Context, input *SignupInput) (*AuhenticationResponse, error) {
	token, err := register(input.Body)

	if err != nil {
		return nil, huma.Error400BadRequest(err.Error())
	}

	resp := &AuhenticationResponse{}
	resp.Body = *token
	return resp, nil
}

type RefreshTokenInput struct {
	Body RefreshTokenData
}

func RefreshTokenController(c context.Context, input *RefreshTokenInput) (*AuhenticationResponse, error) {
	token, err := refreshToken(input.Body)

	if err != nil {
		return nil, huma.Error401Unauthorized("invalid refresh token")
	}

	resp := &AuhenticationResponse{}
	resp.Body = *token
	return resp, nil
}

type UserInfoResponse struct {
	Body models.User
}

func UserProfileGetController(c context.Context, input *struct{}) (*UserInfoResponse, error) {
	user, ok := c.Value("user").(models.User)

	if !ok {
		return nil, huma.Error401Unauthorized("user not found")
	}

	return &UserInfoResponse{
		Body: user,
	}, nil
}

type UserProfileUpdateRequest struct {
	Body UserProfileUpdateData
}

func UserProfileUpdateController(c context.Context, input *UserProfileUpdateRequest) (*UserInfoResponse, error) {
	var user models.User

	user, ok := c.Value("user").(models.User)

	if !ok {
		return nil, huma.Error401Unauthorized("user not found")
	}

	err := UserProfileUpdate(&user, input.Body)

	if err != nil {
		return nil, err
	}

	return &UserInfoResponse{
		Body: user,
	}, nil

}

type UserListRequest struct {
	Query string `query:"query"`
}

type UserListResponse struct {
	Body []models.User
}

func UserListController(c context.Context, input *UserListRequest) (*UserListResponse, error) {
	users, err := UsersList(input.Query)

	if err != nil {
		return nil, err
	}

	return &UserListResponse{
		Body: users.Results,
	}, nil
}

type UserGetRequest struct {
	ID uint `path:"id"`
}

type UserGetResponse struct {
	Body models.User
}

func UserGetController(c context.Context, input *UserGetRequest) (*UserGetResponse, error) {
	user, err := UserGet(input.ID)

	if err != nil {
		return nil, err
	}

	return &UserGetResponse{
		Body: *user,
	}, nil
}

type UserCreateRequest struct {
	Body UserCreateData
}

type UserCreateResponse struct {
	Body models.User
}

func UserCreateController(c context.Context, input *UserCreateRequest) (*UserCreateResponse, error) {
	user, err := UserCreate(&input.Body)

	if err != nil {
		return nil, err
	}

	return &UserCreateResponse{
		Body: *user,
	}, nil
}

type UserUpdateRequest struct {
	ID   uint `path:"id"`
	Body UserUpdateData
}

type UserUpdateResponse struct {
	Body models.User
}

func UserUpdateController(c context.Context, input *UserUpdateRequest) (*UserUpdateResponse, error) {
	user, err := UserUpdate(input.ID, &input.Body)

	if err != nil {
		return nil, err
	}

	return &UserUpdateResponse{
		Body: *user,
	}, nil
}

type UserDeleteRequest struct {
	ID uint `path:"id"`
}

type UserDeleteResponse struct{}

func UserDeleteController(c context.Context, input *UserDeleteRequest) (*UserDeleteResponse, error) {

	err := UserDelete(input.ID)

	if err != nil {
		return nil, err
	}

	return &UserDeleteResponse{}, nil
}

type UserRequestCodeRequest struct {
	Body RequestCodeData
}

func UserRequestCodeController(c context.Context, input *UserRequestCodeRequest) (*struct{}, error) {
	fmt.Println("request code")
	err := requestCode(input.Body)

	if err != nil {
		return nil, huma.Error400BadRequest(err.Error())
	}

	return nil, nil
}

type UserVerifyCodeRequest struct {
	Body VerifyCodeData
}

func UserVerifyCodeController(c context.Context, input *UserVerifyCodeRequest) (*AuhenticationResponse, error) {
	token, err := verifyCode(input.Body)

	if err != nil {
		return nil, huma.Error400BadRequest(err.Error())
	}

	return &AuhenticationResponse{
		Body: *token,
	}, nil
}
