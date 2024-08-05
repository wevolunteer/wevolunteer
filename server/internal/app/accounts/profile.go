package accounts

import (
	"github.com/wevolunteer/wevolunteer/internal/app"
	"github.com/wevolunteer/wevolunteer/internal/models"
)

type UserProfileUpdateData struct {
	Avatar                             *string  `json:"avatar,omitempty"`
	FistName                           *string  `json:"first_name,omitempty"`
	LastName                           *string  `json:"last_name,omitempty"`
	Phone                              *string  `json:"phone,omitempty"`
	Email                              *string  `json:"email,omitempty"`
	DateOfBirth                        *string  `json:"date_of_birth,omitempty"`
	AcceptTOS                          *bool    `json:"accepted_tos,omitempty"`
	HasAcceptedNewsletter              *bool    `json:"accepted_newsletter,omitempty"`
	TaxCode                            *string  `json:"tax_code,omitempty"`
	City                               *string  `json:"city,omitempty"`
	Languages                          *string  `json:"languages,omitempty"`
	Job                                *string  `json:"job,omitempty"`
	Bio                                *string  `json:"bio,omitempty"`
	Latitude                           *float64 `json:"latitude,omitempty"`
	Longitude                          *float64 `json:"longitude,omitempty"`
	NotificationsNearbyActivities      *bool    `json:"notifications_nearby_activities" gorm:"default:true"`
	NotificationsFollowedOrganizations *bool    `json:"notifications_followed_organizations" gorm:"default:true"`
	NotificationActivityReminders      *bool    `json:"notifications_activity_reminders" gorm:"default:true"`
}

func UserProfileGet(user *models.User) (*models.User, error) {
	return user, nil
}

func UserProfileUpdate(user *models.User, data UserProfileUpdateData) error {

	if data.Avatar != nil {
		user.Avatar = *data.Avatar
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

	if data.AcceptTOS != nil {
		user.HasAcceptedTOS = *data.AcceptTOS
	}

	if data.TaxCode != nil {
		user.TaxCode = *data.TaxCode
	}

	if data.Bio != nil {
		user.Bio = *data.Bio
	}

	if data.Latitude != nil {
		user.Latitude = *data.Latitude
	}

	if data.Longitude != nil {
		user.Longitude = *data.Longitude
	}

	if data.DateOfBirth != nil {
		// TODO: user.DateOfBirth = *data.DateOfBirth
	}

	if data.City != nil {
		user.City = *data.City
	}

	if data.Languages != nil {
		user.Languages = *data.Languages
	}

	if data.Job != nil {
		user.Job = *data.Job
	}

	if data.HasAcceptedNewsletter != nil {
		user.HasAcceptedNewsletter = *data.HasAcceptedNewsletter
	}

	if data.NotificationsNearbyActivities != nil {
		user.NotificationsNearbyActivities = *data.NotificationsNearbyActivities
	}

	if data.NotificationsFollowedOrganizations != nil {
		user.NotificationsFollowedOrganizations = *data.NotificationsFollowedOrganizations
	}

	if data.NotificationActivityReminders != nil {
		user.NotificationActivityReminders = *data.NotificationActivityReminders
	}

	if err := app.DB.Save(&user).Error; err != nil {
		return err
	}

	return nil
}
