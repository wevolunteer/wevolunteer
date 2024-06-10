import SearchBar from "@/components/SearchBar";
import Box from "@/components/ui/Box";
import SafeAreaView from "@/components/ui/SafeAreaView";
import { Theme } from "@/config/theme";
import { FiltersProvider, useFilters } from "@/contexts/filters";
import { useTheme } from "@shopify/restyle";
import { Stack } from "expo-router";

function ExlporeHeader() {
  const { filters, setFilters } = useFilters();

  return (
    <Box paddingHorizontal="m" marginBottom="m" backgroundColor="mainBackground">
      <SearchBar value={filters} onChange={setFilters} />
    </Box>
  );
}

export default function ExporeLayout() {
  const theme = useTheme<Theme>();
  return (
    <SafeAreaView>
      <FiltersProvider>
        <ExlporeHeader />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              flex: 1,
              backgroundColor: theme.colors.mainBackground,
            },
          }}
        />
      </FiltersProvider>
    </SafeAreaView>
  );
}
