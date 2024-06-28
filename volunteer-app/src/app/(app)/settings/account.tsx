import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

export default function SettingsAccountScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Topbar goBack empty />
      <Box px="m" mt="m">
        <Text variant="header">{t("accountSettings", "Account Settings")}</Text>
      </Box>
    </SafeAreaView>
  );
}
