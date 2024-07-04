import { ActivityCard } from "@/components/ActivityCard";
import Box from "@/components/ui/Box";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useFilters } from "@/contexts/filters";
import { useActivities } from "@/hooks/useExperiences";
import { Activity } from "@/types/data";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ExporeListScreen() {
  const { t } = useTranslation();
  const listRef = useRef<FlashList<Activity>>(null);

  const { filters } = useFilters();

  const { activities, fetchNextPage, refetch, isLoading } = useActivities();

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
