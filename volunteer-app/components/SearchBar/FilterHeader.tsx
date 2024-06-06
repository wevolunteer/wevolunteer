import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable } from "react-native";
import Box from "../ui/Box";
import Text from "../ui/Text";

interface FilterHeaderProps {
  title: string;
  onClose?: () => void;
  onBack?: () => void;
}

const FilterHeader: FC<FilterHeaderProps> = ({ title, onClose, onBack }) => {
  return (
    <Box
      height={56}
      borderBottomWidth={1}
      flexDirection="row"
      borderBottomColor="lightBorder"
      width="100%"
      justifyContent="space-between"
      paddingHorizontal="m"
      position="relative"
      alignItems="center"
    >
      <Box minWidth={20}>
        {onClose && !onBack && (
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={28} />
          </Pressable>
        )}

        {onBack && (
          <Pressable onPress={onBack}>
            <Ionicons name="chevron-back" size={28} />
          </Pressable>
        )}
      </Box>

      <Box>{title && <Text fontWeight="700">{title}</Text>}</Box>
      <Box minWidth={20}></Box>
    </Box>
  );
};

export default FilterHeader;
