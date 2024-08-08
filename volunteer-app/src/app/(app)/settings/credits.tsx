import Box from "@/components/ui/Box";
import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { Image } from "expo-image";
import { Trans, useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

export default function CreditsScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Topbar empty goBack title={t("Credits", "Credits")} />
      <Box flex={1}>
        <Box alignItems="center" mt="xl" px="l">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{
              width: 242,
              height: 50,
              marginTop: 70,
              marginBottom: 28,
              objectFit: "contain",
            }}
          />
          <Text variant="title" textAlign="center">
            <Trans i18nKey="welcome">Trentino's voluntary app</Trans>
          </Text>
          <Text variant="body" textAlign="center" mt="l">
            <Trans i18nKey="credits">
              This app was developed with the support and contribution of the Municipality of Trento
              and Dolomiti Energia, thanks to the collaboration and technical support of ITAS Mutua.
            </Trans>
          </Text>
        </Box>
        <Box alignItems="center" px="l" mt="xl" gap="s">
          <Text variant="secondary" textAlign="center">
            <Trans i18nKey="aProjectBy">A project by</Trans>
          </Text>
          <Image
            source={require("@/assets/images/logo-trentovolo.png")}
            style={{
              width: 113,
              height: 86,
              marginTop: 0,
              marginBottom: 16,
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>

      <Divider my="xl" mx="m" />

      <Box width="100%" px="l">
        <Text variant="body" textAlign="center">
          {t("inCollaborationWith", "In collaboration with")}
        </Text>
        <Box flexDirection="row" justifyContent="space-around" mt="m" alignItems="center" gap="l">
          <Image
            source={require("@/assets/images/logos/comune-trento.png")}
            style={{
              width: 96,
              height: 48,
              objectFit: "contain",
            }}
          />
          <Image
            source={require("@/assets/images/logos/csv-trentino.png")}
            style={{
              width: 87,
              height: 67,
              objectFit: "contain",
            }}
          />
          <Image
            source={require("@/assets/images/logos/itas.png")}
            style={{
              width: 70,
              height: 28,
              objectFit: "contain",
            }}
          />
          <Image
            source={require("@/assets/images/logos/dolomiti-energia.png")}
            style={{
              width: 82,
              height: 30,
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}
