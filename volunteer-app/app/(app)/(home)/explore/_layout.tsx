import SearchBar from "@/components/SearchBar";
import Box from "@/components/ui/Box";
import SafeAreaView from "@/components/ui/SafeAreaView";
import { FiltersProvider } from "@/contexts/filters";
import { Slot } from "expo-router";
import { useState } from "react";

export default function ExporeLayout() {
  const [q, setQ] = useState("");

  return (
    <SafeAreaView>
      <FiltersProvider>
        <Box paddingHorizontal="m" marginBottom="m" backgroundColor="mainBackground">
          <SearchBar value={q} onChange={setQ} />
        </Box>
        <Slot />
      </FiltersProvider>
    </SafeAreaView>
  );
}
