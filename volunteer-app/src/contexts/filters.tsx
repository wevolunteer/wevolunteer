import { ExperienceFilters } from "@/types/data";
import { createContext, useContext, useState } from "react";

const FiltersContext = createContext<{
  filters: ExperienceFilters;
  setFilters: (filters: ExperienceFilters) => void;
}>({
  filters: {},
  setFilters: () => null,
});

export function useFilters() {
  const value = useContext(FiltersContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useFilters must be wrapped in a <FiltersProvider />");
    }
  }

  return value;
}

export function FiltersProvider(props: React.PropsWithChildren) {
  const [filters, setFilters] = useState<ExperienceFilters>({});

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {props.children}
    </FiltersContext.Provider>
  );
}
