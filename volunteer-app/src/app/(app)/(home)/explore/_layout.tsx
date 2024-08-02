import SearchBar from "@/components/SearchBar";
import Box from "@/components/ui/Box";
import SafeAreaView from "@/components/ui/SafeAreaView";
import { Theme } from "@/config/theme";
import { FiltersProvider } from "@/contexts/filters";
import { useTheme } from "@shopify/restyle";
import { Stack } from "expo-router";

export default function ExporeLayout() {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            flex: 1,
            backgroundColor: theme.colors.mainBackground,
          },
        }}
      />
    </SafeAreaView>
  );
}
