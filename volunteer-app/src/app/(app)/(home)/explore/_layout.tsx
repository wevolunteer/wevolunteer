import SafeAreaView from "@/components/ui/SafeAreaView";
import { Theme } from "@/config/theme";
import ExperienceFiltersProvider from "@/contexts/experienceFilters";
import { SearchesProvider } from "@/contexts/searches";
import { useTheme } from "@shopify/restyle";
import { Stack } from "expo-router";

export default function ExporeLayout() {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView>
      <ExperienceFiltersProvider>
        <SearchesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                flex: 1,
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
        </SearchesProvider>
      </ExperienceFiltersProvider>
    </SafeAreaView>
  );
}
