import { ActivityCard } from "@/components/ActivityCard";
import Box from "@/components/ui/Box";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useFilters } from "@/contexts/filters";
import { useNetwork } from "@/contexts/network";
import { Activity } from "@/types/data";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ExporeListScreen() {
  const { t } = useTranslation();
  const { client } = useNetwork();
  const listRef = useRef<FlashList<Activity>>(null);

  const { filters } = useFilters();

  const { data, fetchNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ["experiences"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET("/activities", {
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

  const activities = useMemo(() => {
    return data?.pages.flatMap((page) => page?.results || []) || [];
  }, [data]);

  useEffect(() => {
    refetch();

    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [filters, refetch]);

  return (
    <Box flex={1}>
      <FlashList
        ref={listRef}
        estimatedItemSize={195}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        data={activities || []}
        keyExtractor={(item) => `a-${item.id}`}
        onEndReachedThreshold={0.8}
        onEndReached={() => fetchNextPage()}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => {
              router.push(`experiences/${item.id}`);
            }}
          />
        )}
      />
      <Box
        position="absolute"
        zIndex={100}
        bottom={35}
        left={0}
        right={0}
        justifyContent="center"
        alignItems="center"
      >
        <TouchableOpacity onPress={() => router.push("/explore/map")}>
          <Box
            backgroundColor="darkBackground"
            paddingHorizontal="l"
            paddingVertical="s"
            borderRadius="full"
            flexDirection="row"
            alignItems="center"
            gap="m"
          >
            <Icon name="map" size={28} color="#FFF" />
            <Text variant="body" fontSize={13} color="whiteText">
              {t("seeOnMap", "See on map")}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
