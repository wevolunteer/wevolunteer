import ProfileAvatar from "@/components/profile/ProfileAvatar";
import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useSession } from "@/contexts/authentication";
import useProfile from "@/hooks/useProfile";
import { ProfileData } from "@/types/data";
import { router } from "expo-router";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { When } from "react-if";
import { LayoutAnimation, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileEditScreen() {
  const { t } = useTranslation();
  const { session, fetchUser } = useSession();
  const { updateProfile } = useProfile();

  const { control, handleSubmit, watch, setValue } = useForm<ProfileData>({
    defaultValues: {
      avatar: session?.user?.avatar,
      first_name: session?.user?.first_name,
      last_name: session?.user?.last_name,
      tax_code: session?.user?.tax_code,
      date_of_birth: session?.user?.date_of_birth,
      city: session?.user?.city,
      job: session?.user?.job,
      // preferred_causes: session?.user?.preferred_causes,
      languages: session?.user?.languages,
      bio: session?.user?.bio,
    },
  });

  if (!session || !session.user) {
    router.push("/");
    return null;
  }
  const values = watch();

  async function handleAvatarChange(url: string) {
    if (!session?.user) {
      return;
    }

    setValue("avatar", url);

    handleSubmit(onSubmit)();
  }

  async function onSubmit(values: ProfileData) {
    if (!session?.user) {
      return;
    }

    values.notifications_activity_reminders = session?.user?.notifications_activity_reminders;
    values.notifications_followed_organizations =
      session?.user?.notifications_followed_organizations;
    values.notifications_nearby_activities = session?.user?.notifications_nearby_activities;

    updateProfile.mutate(values, {
      onSuccess: () => {
        fetchUser();
      },
    });
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Topbar empty goBack title={t("editProfile", "Edit Profile")} />
      <Box px="m" mt="l">
        <Box alignItems="center" gap="l">
          <Controller
            control={control}
            name="avatar"
            render={({ field }) => (
              <ProfileAvatar
                url={field.value || undefined}
                editable
                onChange={handleAvatarChange}
              />
            )}
          />
        </Box>

        <Box borderTopColor="lightBorder" borderTopWidth={1} my="l">
          <ProfileDataForm
            label={t("name", "Name")}
            value={`${values.first_name} ${values.last_name}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("firstName", "First name")}
                />
              )}
            />
            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  label={t("lastName", "Last name")}
                />
              )}
            />
          </ProfileDataForm>
          <ProfileDataForm
            label={t("tax_code", "Tax Code")}
            value={values.tax_code || "-"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="tax_code"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("taxCode", "Tax code")}
                />
              )}
            />
          </ProfileDataForm>
          <ProfileDataForm
            label={t("dob", "Date of birth")}
            value={values.date_of_birth || "-"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <InputText
                  label={t("dateOfBirth", "Date of birth")}
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  maxLength={10}
                  placeholder="GG/MM/AAAA"
                />
              )}
            />
          </ProfileDataForm>
          <ProfileDataForm
            label={t("city", "City")}
            value={values.city || "-"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("city", "City")}
                />
              )}
            />
          </ProfileDataForm>
          <ProfileDataForm
            label={t("job", "Job")}
            value={values.job || "-"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="job"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("job", "Job")}
                />
              )}
            />
          </ProfileDataForm>
          {/* <ProfileDataForm
            label={t("preferredCauses", "Preferred causes")}
            value={values.preferred_causes}
          >
            <Controller
              control={control}
              name="preferred_causes"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("preferredCauses", "Preferred causes")}
                />
              )}
            />
          </ProfileDataForm> */}
          <ProfileDataForm
            label={t("languages", "Languages")}
            value={values.languages || "-"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="languages"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("languages", "Languages")}
                />
              )}
            />
          </ProfileDataForm>
          <ProfileDataForm
            label={t("aboutMe", "About me")}
            value={values.bio || "-"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChangeText={field.onChange}
                  label={t("aboutMe", "About me")}
                />
              )}
            />
          </ProfileDataForm>
        </Box>
      </Box>
    </ScrollView>
  );
}

interface ProfileDataFormProps {
  label: string;
  value: string;
  onSubmit?: () => void;
  children?: React.ReactNode | React.ReactNode[];
}

const ProfileDataForm: FC<ProfileDataFormProps> = ({ label, value, onSubmit, children }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  function handleToggle() {
    LayoutAnimation.easeInEaseOut();
    setShowForm(!showForm);
  }

  function handleSubmit() {
    setShowForm(false);
    onSubmit && onSubmit();
  }

  return (
    <Box
      borderBottomWidth={1}
      borderBottomColor="lightBorder"
      py="m"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <When condition={!showForm}>
        <Box>
          <Text variant="body">{label}</Text>
          <Text variant="secondary">{value || t("notSet", "Not set")}</Text>
        </Box>
        <Pressable onPress={handleToggle}>
          <Text variant="link">{value ? t("Edit", "Edit") : t("add", "Add")}</Text>
        </Pressable>
      </When>
      <When condition={showForm}>
        <Box gap="m" width="100%">
          {children}
          <Button variant="primary" label={t("save", "Save")} onPress={handleSubmit} />

          <Box alignItems="center" py="m">
            <Pressable onPress={handleToggle}>
              <Text variant="link">{t("cancel", "Cancel")}</Text>
            </Pressable>
          </Box>
        </Box>
      </When>
    </Box>
  );
};
