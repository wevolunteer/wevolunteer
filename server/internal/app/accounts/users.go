package accounts

import (
	"github.com/google/uuid"
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func UserQuery() *gorm.DB {
	return app.DB.Model(&models.User{})
}

func UserGetByEmail(email string) (*models.User, error) {
	var user models.User

	if err := app.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGet(id uint) (*models.User, error) {
	var user models.User

	if err := app.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

type UserListData struct {
	Results  []models.User       `json:"results"`
	PageInfo *app.PaginationInfo `json:"page_info"`
}

type UserFilters struct {
	app.PaginationInput
	Query string `query:"q"`
}

func UsersList(ctx *app.Context, filters *UserFilters) (*UserListData, error) {
	data := &UserListData{}

	q := UserQuery()

	if filters != nil {
		if filters.Query != "" {
			q = q.Where("name LIKE ?", "%"+filters.Query+"%")
		}
	}

	pageInfo, err := app.PageInfo(q, filters.PaginationInput)

	if err != nil {
		return nil, err
	}

	data.PageInfo = pageInfo

	q = q.Scopes(app.Paginate(filters.PaginationInput))

	if err := q.Find(&data.Results).Error; err != nil {
		return nil, err
	}

	return data, nil
}

type UserCreateData struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Phone       string `json:"phone,omitempty"`
	Email       string `json:"email"`
	Avatar      string `json:"avatar,omitempty"`
	Password    string `json:"password"`
	TaxCode     string `json:"tax_code,omitempty"`
	IsSuperUser bool   `json:"is_superuser"`
}

func UserCreate(data *UserCreateData) (*models.User, error) {
	if data.Password == "" {
		data.Password = createUnusablePassword()
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	uuid := uuid.New()

	user := models.User{
		UID:         uuid.String(),
		FirstName:   data.FirstName,
		LastName:    data.LastName,
		Password:    string(hashedPassword),
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
	FistName    *string `json:"first_name"`
	LastName    *string `json:"last_name"`
	Phone       *string `json:"phone,omitempty"`
	Email       *string `json:"email"`
	TaxCode     *string `json:"tax_code,omitempty"`
	Avatar      *string `json:"avatar,omitempty"`
	Password    *string `json:"password,omitempty"`
	IsSuperUser *bool   `json:"is_superuser,omitempty"`
	ExternalID  *string `json:"external_id,omitempty"`
}

func UserUpdate(id uint, data *UserUpdateData) (*models.User, error) {
	var user models.User

	if err := app.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}

	if data.Password != nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*data.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, err
		}

		user.Password = string(hashedPassword)
	}

	if data.FistName != nil {
		user.FirstName = *data.FistName
	}

	if data.LastName != nil {
		user.LastName = *data.LastName
	}

	if data.Phone != nil {
		user.Phone = *data.Phone
	}

	if data.Email != nil {
		user.Email = *data.Email
	}

	if data.TaxCode != nil {
		user.TaxCode = *data.TaxCode
	}

	if data.Avatar != nil {
		user.Avatar = *data.Avatar
	}

	if data.IsSuperUser != nil {
		user.IsRootAdmin = *data.IsSuperUser
	}

	if data.ExternalID != nil {
		user.ExternalID = *data.ExternalID
	}

	if err := app.DB.Save(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserDelete(id uint) error {
	var user models.User

	if err := app.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return err
	}

	if err := app.DB.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}

func createUnusablePassword() string {
	return uuid.New().String()
}
