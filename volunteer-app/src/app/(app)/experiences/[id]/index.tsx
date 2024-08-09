import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import FavoriteButton from "@/components/ui/FavoriteButton";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useNetwork } from "@/contexts/network";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Linking, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExperienceScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { client } = useNetwork();
  if (!id || Array.isArray(id)) {
    throw new Error("id should be a string");
  }

  const experienceId = parseInt(id);

  const { data, isLoading } = useQuery({
    queryKey: ["experiences", id],
    queryFn: async () => {
      const experienceResponse = await client.GET("/experiences/{id}", {
        params: {
          path: {
            id: experienceId,
          },
        },
      });

      if (!experienceResponse?.data?.organization) {
        return null;
      }

      const organizationResponse = await client.GET("/organizations/{id}", {
        params: {
          path: {
            id: experienceResponse.data.organization.id,
          },
        },
      });

      return {
        experience: experienceResponse.data,
        organization: organizationResponse.data,
      };
    },
  });

  if (!data) {
    return null;
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <Box flex={1}>
          <ActivityIndicator />
        </Box>
      </SafeAreaView>
    );
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
        <Image
          source={data.experience.image}
          style={{
            width: "100%",
            height: 390,
          }}
        />
        <Box marginHorizontal="m" marginVertical="l" gap="l">
          {/* Organization and title */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/organizations/[id]",
                params: {
                  id: data.experience.organization.id,
                },
              })
            }
          >
            <Box
              flexDirection="row"
              alignItems="center"
              gap="l"
              pb="m"
              borderBottomWidth={1}
              borderBottomColor="mainBorder"
            >
              <Image
                source={data.experience.organization.logo}
                contentFit="cover"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 1000,
                }}
              />
              <Box flex={1}>
                <Text variant="body">{data.experience.organization.name}</Text>
              </Box>
              <FavoriteButton
                id={data.experience.organization.id}
                isFavorite={data?.organization?.is_favorite || false}
                refetch={console.log}
              />
            </Box>
          </Pressable>
          <Text fontSize={32} fontFamily="DMSansMedium" lineHeight={38}>
            {data.experience.title}
          </Text>

          <Text variant="body" color="accentText">
            {data.experience.category.name}
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
                <Text variant="body">{data.experience.address}</Text>
                <Text variant="body">{data.experience.city}</Text>
              </Box>
            </Box>
            <Box flexDirection="row" padding="m" gap="m">
              <Icon name="calendar" size={32} color="black" strokeWith="1.5" />

              <Box>
                <Text variant="body">
                  {data.experience.start_date && (
                    <>
                      {t("from", "From")}{" "}
                      {format(new Date(data.experience.start_date), "d MMMM yyyy")}
                    </>
                  )}
                </Text>
                <Text variant="body">
                  {data.experience.end_date && (
                    <>
                      {t("to", "To")} {format(new Date(data.experience.end_date), "d MMMM yyyy")}
                    </>
                  )}
                </Text>
              </Box>
            </Box>
          </Box>

          <Text variant="title">{t("opportunity", "Opportunity")}</Text>

          <Text variant="body" color="secondaryText">
            {data.experience.description}
          </Text>

          <Divider />

          <Text variant="title">{t("requirements", "Requirements")}</Text>

          <Box marginLeft="s">
            <Text variant="body" color="secondaryText">
              • Maggiore età
            </Text>
            <Text variant="body" color="secondaryText">
              • Auto
            </Text>
          </Box>

          <Divider />

          <Text variant="title">{t("contacts", "Contacts")}</Text>

          <ScrollView horizontal>
            <Box flexDirection="row" gap="m" marginBottom="3xl">
              <Button
                variant="secondary"
                leftIcon="mail"
                size="s"
                label={t("email", "Email")}
                onPress={() => Linking.openURL(`mailto:${data.experience.organization.email}`)}
              />
              <Button
                variant="secondary"
                leftIcon="phone"
                size="s"
                label={t("call", "Call")}
                onPress={() => Linking.openURL(`tel:${data.experience.organization.phone}`)}
              />
              <Button
                variant="secondary"
                leftIcon="globe"
                size="s"
                label={t("website", "Website")}
                onPress={() => Linking.openURL(`${data.experience.organization.website}`)}
              />
            </Box>
          </ScrollView>
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
          label={t("iWantToPartecipate", "I want to partecipate!")}
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
