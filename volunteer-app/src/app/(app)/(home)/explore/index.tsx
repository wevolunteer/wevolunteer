import { ExperienceCard } from "@/components/ExperienceCard";
import SearchBar from "@/components/SearchBar";
import Box from "@/components/ui/Box";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useFilters } from "@/contexts/filters";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience, ExperienceFilters } from "@/types/data";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

function ExploreListScreen() {
  const { t } = useTranslation();
  const listRef = useRef<FlashList<Experience>>(null);

  const { filters } = useFilters<ExperienceFilters>();

  const { experiences, fetchNextPage, refetch, isLoading } = useExperiences({
    date_start: filters.date_start || new Date().toISOString().split("T")[0],
    date_end: filters.date_end || undefined,
    categories: filters.categories,
    distance: filters.distance,
    q: filters.q,
  });

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
        data={experiences || []}
        keyExtractor={(item) => `a-${item.id}`}
        onEndReachedThreshold={0.8}
        onEndReached={() => fetchNextPage()}
        ListEmptyComponent={
          <Box flex={1} justifyContent="center" alignItems="center" mt="2xl">
            <Text variant="body" color="darkBackground">
              {t("noResults", "No results")}
            </Text>
          </Box>
        }
        ListHeaderComponent={
          <Box paddingHorizontal="m" marginBottom="m" backgroundColor="mainBackground">
            <SearchBar />
          </Box>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ExperienceCard
            experience={item}
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

export default ExploreListScreen;
