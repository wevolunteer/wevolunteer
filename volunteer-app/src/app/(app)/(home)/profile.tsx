import ProfileAvatar from "@/components/profile/ProfileAvatar";
import Box from "@/components/ui/Box";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useSession } from "@/contexts/authentication";
import { Link, router } from "expo-router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { session } = useSession();

  if (!session || !session.user) {
    router.push("/");
    return null;
  }

  const user = session.user;

  return (
    <SafeAreaView>
      <ScrollView>
        <Topbar
          empty
          rightComponent={
            <Link href="/profile/edit">
              <Text variant="link">{t("Edit", "Edit")}</Text>
            </Link>
          }
        />
        <Box my="l" gap="l" px="m">
          <Box alignItems="center" gap="l">
            <ProfileAvatar url={user.avatar} />
            <Text variant="header">
              {user.first_name} {user.last_name}
            </Text>
          </Box>

          <ProfileStats years={2} experiences={14} />

          <Box>
            <ProfileItem label={t("profile.iLiveIn", "I live in")} value={user.city || "-"} />
            <ProfileItem label={t("profile.myJob", "My Job")} value={user.job || "-"} />
            <ProfileItem label={t("profile.myCauses", "My Causes")} value={user.phone || "-"} />
            <ProfileItem
              label={t("profile.myLanguages", "My Languages")}
              value={user.languages || "-"}
            />
          </Box>

          <Text variant="title">{t("profile.aboutMe", "About me")}</Text>
          <Text variant="body">
            {user.bio || t("profile.aboutMeTellSomething", "Tell something about you")}
          </Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

interface ProfileStatsProps {
  years: number;
  experiences: number;
}

const ProfileStats: FC<ProfileStatsProps> = ({ years, experiences }) => {
  const { t } = useTranslation();
  return (
    <Box
      borderRadius="m"
      borderWidth={1}
      borderColor="lightBorder"
      flexDirection="row"
      width="100%"
    >
      <Box padding="m" flex={1}>
        <Text textAlign="center" variant="header">
          {years}
        </Text>
        <Text textAlign="center" variant="secondary">
          {t("yearOnFaxte", "years on FaXte")}
        </Text>
      </Box>
      <Box width={1} height="100%" borderLeftWidth={1} borderLeftColor="lightBorder" />
      <Box padding="m" flex={1}>
        <Text textAlign="center" variant="header">
          {experiences}
        </Text>
        <Text textAlign="center" variant="secondary">
          {t("experiences", "experiences")}
        </Text>
      </Box>
    </Box>
  );
};

interface ProfileItemProps {
  label: string;
  value: string;
}

const ProfileItem: FC<ProfileItemProps> = ({ label, value }) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical="m"
      borderBottomWidth={1}
      borderBottomColor="lightBorder"
    >
      <Text variant="secondary">{label}</Text>
      <Text variant="body">{value}</Text>
    </Box>
  );
};
