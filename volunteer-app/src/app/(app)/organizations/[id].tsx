import { ActivityCard } from "@/components/ActivityCard";
import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useNetwork } from "@/contexts/network";
import { Activity } from "@/types/data";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";

const logo = require("@/assets/images/logo.png");

export default function OrganizationsListScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { client } = useNetwork();
  if (!id || Array.isArray(id)) {
    throw new Error("id should be a string");
  }

  const organizationId = parseInt(id);
  const listRef = useRef<FlashList<Activity>>(null);

  const {
    data: activitiesData,
    fetchNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["experiences"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET("/activities", {
        params: {
          query: {
            organization: organizationId,
            page: pageParam,
          },
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => (lastPage?.page_info.page ? lastPage?.page_info.page + 1 : 1),
    initialPageParam: 1,
  });

  const { data: organization } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await client.GET("/organizations/{id}", {
        params: {
          path: {
            id: organizationId,
          },
        },
      });
      return response.data;
    },
  });

  const activities = useMemo(() => {
    return activitiesData?.pages.flatMap((page) => page?.results || []) || [];
  }, [activitiesData]);

  if (!organization || !activities) {
    return null;
  }

  return (
    <Box flex={1}>
      <Topbar empty goBack rightComponent={<Icon name="heart" size={24} />} />

      <FlashList
        ref={listRef}
        estimatedItemSize={195}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        data={activities || []}
        keyExtractor={(item) => `a-${item.id}`}
        onEndReachedThreshold={0.8}
        onEndReached={() => fetchNextPage()}
        ListHeaderComponent={() => (
          <>
            <Box alignItems="center" borderRadius="full" gap="m">
              <Image
                source={organization.logo || logo}
                contentFit="cover"
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 1000,
                }}
              />
              <Box alignItems="center" gap="s">
                <Text variant="header">{organization.name}</Text>
                <Text variant="body" fontSize={20} lineHeight={20}>
                  {organization.city}
                </Text>
              </Box>

              <Box flexDirection="row" gap="m" justifyContent="space-around" px="m">
                <Button
                  variant="secondary"
                  leftIcon="mail"
                  size="s"
                  label={t("email", "Email")}
                  onPress={() => Linking.openURL(`mailto:${organization.email}`)}
                />
                <Button
                  variant="secondary"
                  leftIcon="phone"
                  size="s"
                  label={t("call", "Call")}
                  onPress={() => Linking.openURL(`tel:${organization.phone}`)}
                />
                <Button
                  variant="secondary"
                  leftIcon="globe"
                  size="s"
                  label={t("website", "Website")}
                  onPress={() => Linking.openURL(`${organization.website}`)}
                />
              </Box>
            </Box>
            <Box my="l" px="m">
              <Text variant="title">{t("experiences", "Experiences")}</Text>
            </Box>
          </>
        )}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => {
              router.push(`experiences/${item.id}`);
            }}
          />
        )}
      />
    </Box>
  );
}
