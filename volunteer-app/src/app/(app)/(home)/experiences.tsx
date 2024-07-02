import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ExperiencesScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <Box flex={1} px="m" mt="2xl">
        <Text variant="header">{t("Experiences", "Experiences")}</Text>

        <Box
          borderColor="mainBorder"
          borderWidth={1}
          borderRadius="m"
          marginVertical="m"
          mt="l"
          py="l"
          px="m"
          gap="l"
          width="100%"
        >
          <Text variant="header" color="accentText" textAlign="center">
            {t("Hey", "Hey!")}
          </Text>

          <Text variant="body" textAlign="center">
            {t(
              "noExperiences",
              "It looks like you don't have any scheduled volunteer experiences.",
            )}
          </Text>

          <Button
            variant="primary"
            label={t("searchExperiences", "Explore experiences")}
            onPress={() => router.push("/explore")}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
