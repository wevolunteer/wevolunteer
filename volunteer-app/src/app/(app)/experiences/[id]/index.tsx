import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useNetwork } from "@/contexts/network";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Linking, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExperienceScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { client } = useNetwork();
  if (!id || Array.isArray(id)) {
    throw new Error("id should be a string");
  }

  const activityId = parseInt(id);

  const { data } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await client.GET("/activities/{id}", {
        params: {
          path: {
            id: activityId,
          },
        },
      });
      return response.data;
    },
  });

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Topbar
          goBack
          rightComponent={
            <Pressable>
              <Icon name="share" />
            </Pressable>
          }
        />
        <Animated.Image
          source={{ uri: data.image }}
          style={{
            width: "100%",
            height: 390,
          }}
        />
        <Box marginHorizontal="m" marginVertical="l" gap="l">
          {/* Organization and title */}
          <Text variant="body" color="accentText">
            {data.organization.name}
          </Text>
          <Text fontSize={32} fontFamily="DMSansMedium" lineHeight={38}>
            {data.title}
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
              <Icon name="marker" size={32} color="black" strokeWith="1.5" />
              <Box>
                <Text variant="body">{data.address}</Text>
                <Text variant="body">{data.city}</Text>
              </Box>
            </Box>
            <Box flexDirection="row" padding="m" gap="m">
              <Icon name="calendar" size={32} color="black" strokeWith="1.5" />

              <Box>
                <Text variant="body">
                  {data.start_date && (
                    <>
                      {t("from", "From")} {format(new Date(data.start_date), "d MMMM yyyy")}
                    </>
                  )}
                </Text>
                <Text variant="body">
                  {data.end_date && (
                    <>
                      {t("to", "To")} {format(new Date(data.end_date), "d MMMM yyyy")}
                    </>
                  )}
                </Text>
              </Box>
            </Box>
          </Box>

          <Text variant="header">{t("opportunity", "Opportunity")}</Text>

          <Text variant="body" color="secondaryText">
            {data.description}
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
              onPress={() => Linking.openURL(`mailto:${data.organization.email}`)}
            />
            <Button
              variant="secondary"
              rightIcon="call-outline"
              label={t("call", "Call")}
              onPress={() => Linking.openURL(`tel:${data.organization.phone}`)}
            />
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
