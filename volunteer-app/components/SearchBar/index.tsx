import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import Box from "../ui/Box";
import Text from "../ui/Text";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Box
      borderRadius="full"
      height={64}
      marginVertical="l"
      backgroundColor="mainBackground"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal="m"
      shadowColor="shadow"
      elevation={10}
    >
      <Ionicons name="search" size={28} color="mainText" />
      <Box marginLeft="m">
        <Text variant="body" fontWeight="bold" lineHeight={20}>
          Cerca
        </Text>
        <Text variant="secondary">Esperienze • Organizzazioni • Luoghi</Text>
      </Box>
    </Box>
  );
};

export default SearchBar;
