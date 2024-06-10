import { useFilters } from "@/contexts/filters";
import { ActivityFilters } from "@/types/data";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Box from "../ui/Box";
import Text from "../ui/Text";
import CategoryFilter from "./CategoryFilter";
import DateFilter from "./DateFilter";
import DistanceFilter from "./DistanceFilter";
import PlaceFilter from "./PlaceFilter";
import SearchModal from "./SearchModal";

interface SearchBarProps {
  value: ActivityFilters;
  onChange: (value: ActivityFilters) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilters();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <Box>
      <Pressable onPress={handlePresentModalPress}>
        <Box
          borderRadius="full"
          height={64}
          marginTop="l"
          marginBottom="m"
          backgroundColor="mainBackground"
          alignItems="center"
          flexDirection="row"
          paddingHorizontal="m"
          shadowColor="shadow"
          elevation={6}
        >
          <Ionicons name="search" size={28} color="mainText" />
          <Box marginLeft="m">
            <Text variant="body" fontWeight="bold" lineHeight={20}>
              {t("search", "Search")}
            </Text>
            <Text variant="secondary">
              {t("experiences", "Experiences")} • {t("organizations", "Organizations")} •{" "}
              {t("places", "Places")}
            </Text>
          </Box>
        </Box>
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box flexDirection="row" gap="s" alignItems="center">
          <PlaceFilter />
          <CategoryFilter
            title={t("category", "Category")}
            values={filters.categories || []}
            onChange={(values) => {
              setFilters({
                ...filters,
                categories: values,
              });
            }}
          />
          <DistanceFilter
            title={t("distanceFromYou", "Distance from you")}
            value={filters.distance || null}
            onChange={(value) => {
              setFilters({
                ...filters,
                distance: value || undefined,
              });
            }}
          />
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
        </Box>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["100%"]}
        handleComponent={null}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <SearchModal />
        </BottomSheetView>
      </BottomSheetModal>
    </Box>
  );
};

export default SearchBar;
