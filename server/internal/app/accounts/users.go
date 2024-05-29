package accounts

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"github.com/google/uuid"
)

func userGet(id uint) (*models.User, error) {
	var user models.User

	if err := app.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

type UserList struct {
	Results []models.User `json:"results"`
	Total   int           `json:"total"`
}

func usersList(query string) (*UserList, error) {
	var users []models.User

	q := app.DB.Model(&models.User{})

	if query != "" {
		q = q.Where("name LIKE ?", "%"+query+"%")
	}

	if err := q.Find(&users).Error; err != nil {
		return nil, err
	}

	return &UserList{
		Results: users,
		Total:   len(users),
	}, nil
}

type UserCreateData struct {
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	IsSuperUser bool   `json:"is_superuser"`
}

func userCreate(data *UserCreateData) (*models.User, error) {

	uuid := uuid.New()

	user := models.User{
		UID:         uuid.String(),
		Name:        data.Name,
		Email:       data.Email,
		Phone:       data.Phone,
		IsRootAdmin: data.IsSuperUser,
	}

	if err := app.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

type UserUpdateData struct {
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	IsSuperUser bool   `json:"is_superuser"`
}

func userUpdate(id uint, data *UserUpdateData) (*models.User, error) {
	var user models.User

	if err := app.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}

	user.Name = data.Name
	user.Phone = data.Phone
	user.Email = data.Email
	user.IsRootAdmin = data.IsSuperUser

	if err := app.DB.Save(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func userDelete(id uint) error {
	var user models.User

	if err := app.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return err
	}

	if err := app.DB.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}
