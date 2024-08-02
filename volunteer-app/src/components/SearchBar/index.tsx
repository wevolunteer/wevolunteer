import { FiltersProvider, useFilters } from "@/contexts/filters";
import { SearchesProvider } from "@/contexts/searches";
import { ActivityFilters, ExperienceFilters } from "@/types/data";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Box from "../ui/Box";
import Icon from "../ui/Icon";
import Text from "../ui/Text";
import CategoryFilter from "./CategoryFilter";
import DateFilter from "./DateFilter";
import PlaceFilter from "./PlaceFilter";
import SearchModal from "./SearchModal";

const SearchBar: FC = () => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilters<ExperienceFilters>();
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
          justifyContent="space-between"
          flexDirection="row"
          paddingHorizontal="m"
          shadowColor="shadow"
          elevation={6}
        >
          <Icon name="search" />
          <Box marginLeft="m" flex={1}>
            {filters.q ? (
              <Text variant="body" fontWeight="bold" lineHeight={20}>
                {filters.q}
              </Text>
            ) : (
              <>
                <Text variant="body" fontWeight="bold" lineHeight={20}>
                  {t("search", "Search")}
                </Text>
                <Text variant="secondary">
                  {t("experiences", "Experiences")} • {t("organizations", "Organizations")} •{" "}
                  {t("places", "Places")}
                </Text>
              </>
            )}
          </Box>

          {filters.q && (
            <Pressable onPress={() => setFilters({ ...filters, q: undefined })}>
              <Icon name="close" />
            </Pressable>
          )}
        </Box>
      </Pressable>

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
            onConfirm={() => {
              Keyboard.dismiss();
              bottomSheetModalRef.current?.dismiss();
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["100%"]}
        onDismiss={Keyboard.dismiss}
        handleComponent={null}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <SearchesProvider>
            <FiltersProvider>
              <SearchModal
                onClose={() => {
                  Keyboard.dismiss();
                  bottomSheetModalRef.current?.dismiss();
                }}
                filters={filters}
                setFilters={setFilters}
              />
            </FiltersProvider>
          </SearchesProvider>
        </BottomSheetView>
      </BottomSheetModal>
    </Box>
  );
};

export default SearchBar;
