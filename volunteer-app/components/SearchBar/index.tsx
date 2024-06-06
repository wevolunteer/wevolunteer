import { useFilters } from "@/contexts/filters";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import Box from "../ui/Box";
import Text from "../ui/Text";
import CategoryFilter from "./CategoryFilter";
import DateFilter, { DateInterval } from "./DateFilter";
import DistanceFilter from "./DistanceFilter";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface Filters {
  categories: string[];
  distance: string | null;
  date: DateInterval | null;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilters();

  return (
    <Box>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box flexDirection="row" gap="s">
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
    </Box>
  );
};

export default SearchBar;
