import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { experiencesMockData } from "@/constants/mocks/experiences";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExperienceScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  const experience = experiencesMockData.find((exp) => exp.id === id);

  if (!experience) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Topbar
          goBack
          rightComponent={
            <Pressable>
              <Ionicons name="share-outline" size={24} />
            </Pressable>
          }
        />
        <Animated.Image
          source={experience.image}
          sharedTransitionTag={`test2`}
          style={{
            width: "100%",
            height: 390,
          }}
        />
        <Box marginHorizontal="m" marginVertical="l" gap="l">
          {/* Organization and title */}
          <Text variant="body" color="accentText">
            {experience.organization}
          </Text>
          <Text fontSize={32} fontFamily="DMSansMedium" lineHeight={38}>
            {experience.title}
          </Text>

          {/* Location and dates */}
          <Box borderRadius="m" borderWidth={1} borderColor="mainBorder">
            <Box
              flexDirection="row"
              padding="m"
              gap="m"
              borderBottomWidth={1}
              borderBottomColor="mainBorder"
            >
              <Ionicons name="location-outline" size={32} color="black" />
              <Box>
                <Text variant="body">Piazza delle poste, 3</Text>
                <Text variant="body">{experience.location}</Text>
              </Box>
            </Box>
            <Box flexDirection="row" padding="m" gap="m">
              <Ionicons name="calendar-clear-outline" size={32} color="black" />

              <Box>
                <Text variant="body">Dal 7 giugno 2024</Text>
                <Text variant="body">Al 18 giugno 2024</Text>
              </Box>
            </Box>
          </Box>

          <Text variant="header">{t("opportunity", "Opportunity")}</Text>

          <Text variant="body" color="secondaryText">
            Ti chiediamo di metterti in gioco quando sei in casa, durante la settimana secondo i
            tuoi tempi e i tuoi orari e in qualche weekend: passando del tempo con chi abita qui,
            nell’aiutarci in alcuni servizi della casa, il tutto, ovviamente, senza tralasciare i
            tuoi impegni e le tue relazioni. Stai frequentando l’università? Svolgi il servizio
            civile, o lavori a Trento? Il Volontariato Residenziale è un viaggio di ricerca,
            un’opportunità per vivere relazioni e incontri unici! Vivere nella nostra casa come
            volontariə residenziale vuol dire fare un’esperienza molto significativa sotto il
            profilo umano. Sarai a contatto con una realtà impegnata da decenni nel sociale e sarà
            un’occasione di crescita come cittadinə consapevolə ed impegnatə.
          </Text>

          <Divider />

          <Text variant="header">{t("requirements", "Requirements")}</Text>

          <Box marginLeft="s">
            <Text variant="body" color="secondaryText">
              • Maggiore età
            </Text>
            <Text variant="body" color="secondaryText">
              • Auto
            </Text>
          </Box>

          <Divider />

          <Text variant="header">{t("contacts", "Contacts")}</Text>

          <Box flexDirection="row" gap="m" marginBottom="2xl">
            <Button
              variant="secondary"
              rightIcon="mail-outline"
              label={t("sendEmail", "Send email")}
            />
            <Button variant="secondary" rightIcon="call-outline" label={t("call", "Call")} />
          </Box>
        </Box>
      </ScrollView>
      <Box
        position="absolute"
        bottom={16}
        left={0}
        right={0}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="primary"
          label={t("iWantToHelp", "I want to help!")}
          paddingHorizontal="xl"
          borderRadius="full"
          onPress={() => {
            router.push(`/experiences/${id}/enroll`);
          }}
        />
      </Box>
    </SafeAreaView>
  );
}
