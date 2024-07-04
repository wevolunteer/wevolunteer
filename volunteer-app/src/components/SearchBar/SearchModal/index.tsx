import { ActivityCard } from "@/components/ActivityCard";
import Box from "@/components/ui/Box";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useFilters } from "@/contexts/filters";
import { useSearches } from "@/contexts/searches";
import { useActivities } from "@/hooks/useExperiences";
import { Activity } from "@/types/data";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, TextInput } from "react-native";
import SafeAreaView from "../../ui/SafeAreaView";
import CategoryFilter from "../CategoryFilter";
import DateFilter from "../DateFilter";
import PlaceFilter from "../PlaceFilter";
import RecentSearches from "./RecentSearches";

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilters();
  const [q, setQ] = useState<string>("");
  const listRef = useRef<FlashList<Activity>>(null);

  const { activities, fetchNextPage, refetch, isLoading } = useActivities();

  const { saveExperienceSearch } = useSearches();

  function handleSearch(needle: string) {
    setQ(needle);
    if (needle !== "") {
      saveExperienceSearch(needle);
      setFilters({ ...filters, q: needle });
    } else {
      setFilters({ ...filters, q: undefined });
    }
  }

  function onSearchInputBlur() {
    handleSearch(q);
  }

  return (
    <SafeAreaView>
      <Box
        height={48}
        borderBottomWidth={1}
        flexDirection="row"
        borderBottomColor="mainBorder"
        width="100%"
        mb="m"
        paddingHorizontal="m"
        position="relative"
        alignItems="center"
        gap="m"
      >
        <Box minWidth={20}>
          <Pressable onPress={onClose}>
            <Icon name="chevron-left" size={24} />
          </Pressable>
        </Box>
        <Box flex={1} style={{ paddingTop: 3 }}>
          <TextInput
            placeholder={t(
              "searchExperiencesOrOrganizations",
              "Search experiences or organizations",
            )}
            value={q}
            returnKeyType="search"
            autoFocus
            onBlur={onSearchInputBlur}
            onChangeText={setQ}
          />
        </Box>

        {q && q.length > 0 && (
          <Pressable onPress={() => handleSearch("")}>
            <Icon name="close" size={24} />
          </Pressable>
        )}
      </Box>
      <Box px="m">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Box flexDirection="row" gap="s" alignItems="center">
            <PlaceFilter />
            <DateFilter
              title={t("date", "Date")}
              value={{
                from: filters.date_start || null,
                to: filters.date_end || null,
              }}
              onChange={(value) => {
                setFilters({
                  ...filters,
                  date_start: value?.from || undefined,
                  date_end: value?.to || undefined,
                });
              }}
            />
            <CategoryFilter
              title={t("causes", "Causes")}
              values={filters.categories || []}
              onChange={(values) => {
                setFilters({
                  ...filters,
                  categories: values,
                });
              }}
            />
          </Box>
        </ScrollView>

        {!filters.q || filters.q === "" ? (
          <RecentSearches onSelect={handleSearch} />
        ) : (
          <Box flex={1} backgroundColor="accentText" height={200}>
            <Text>{filters.q}</Text>
            <FlashList
              ref={listRef}
              refreshing={isLoading}
              estimatedItemSize={195}
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
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default SearchModal;
