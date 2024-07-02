import Box from "@/components/ui/Box";
import Icon from "@/components/ui/Icon";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import { Theme } from "@/config/theme";
import { useNetwork } from "@/contexts/network";
import { Organization } from "@/types/data";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface OrganizationFilters {
  q?: string;
}

export default function OrganizationListScreen() {
  const { t } = useTranslation();
  const { client } = useNetwork();
  const listRef = useRef<FlashList<Organization>>(null);
  const theme = useTheme<Theme>();

  const filters: OrganizationFilters = {};

  const { data, fetchNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ["organizations"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET("/organizations", {
        params: {
          query: {
            ...filters,
            page: pageParam,
          },
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => (lastPage?.page_info.page ? lastPage?.page_info.page + 1 : 1),
    initialPageParam: 1,
  });

  const organizations = useMemo(() => {
    return data?.pages.flatMap((page) => page?.results || []) || [];
  }, [data]);

  return (
    <SafeAreaView>
      <Box flex={1}>
        <Box
          height={48}
          borderBottomWidth={1}
          borderBottomColor="mainBorder"
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          paddingHorizontal="m"
          position="relative"
          alignItems="center"
          gap="m"
        >
          <Box minWidth={20}>
            <Icon name="search" size={24} />
          </Box>

          <Box flex={1}>
            <TextInput placeholder={t("organizationSearch", "Search organizations")} />
          </Box>
        </Box>
        <Box
          borderBottomWidth={1}
          borderBottomColor="mainBorder"
          flexDirection="row"
          gap="m"
          justifyContent="center"
          py="m"
        >
          <Box
            py="s"
            px="l"
            backgroundColor="accentText"
            borderRadius="s"
            minWidth={110}
            alignItems="center"
          >
            <Text color="whiteText" variant="body" fontSize={13}>
              Tutte
            </Text>
          </Box>

          <Box
            py="s"
            px="l"
            borderWidth={1}
            borderColor="lightBorder"
            borderRadius="s"
            minWidth={110}
            alignItems="center"
          >
            <Text variant="body" fontSize={13}>
              Preferite
            </Text>
          </Box>
        </Box>
        <FlashList
          ref={listRef}
          estimatedItemSize={195}
          refreshing={isLoading}
          onRefresh={() => refetch()}
          data={organizations || []}
          keyExtractor={(item) => `o-${item.id}`}
          onEndReachedThreshold={0.8}
          onEndReached={() => fetchNextPage()}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/organizations/${item.id}`)}>
              <Box
                flexDirection="row"
                gap="m"
                py="m"
                mx="m"
                borderBottomColor="lightBorder"
                borderBottomWidth={1}
                alignItems="center"
              >
                <Box width={54} height={54} backgroundColor="lightBorder" borderRadius="full">
                  <Image
                    source={{ uri: item.logo }}
                    style={{ width: 54, height: 54, borderRadius: 500 }}
                  />
                </Box>
                <Box flex={1}>
                  <Text variant="body">{item.name}</Text>
                  <Text variant="secondary">{item.city}</Text>
                </Box>
                <Icon name="heart" size={48} color={theme.colors.accentText} />
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}
