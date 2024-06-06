import { Theme } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { FC } from "react";
import { Pressable } from "react-native";
import Box from "../ui/Box";
import Text from "../ui/Text";

interface ChoiceListItemProps {
  label: string;
  selected?: boolean;
  section?: boolean;
  onPress?: () => void;
}

const ChoiceListItem: FC<ChoiceListItemProps> = ({ label, section, selected, onPress }) => {
  const theme = useTheme<Theme>();

  return (
    <Pressable onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        borderBottomColor="lightBorder"
        alignItems="center"
        height={58}
        borderBottomWidth={1}
      >
        <Text variant="body" color={selected ? "accentText" : "mainText"}>
          {label}
        </Text>

        {selected && <Ionicons name="checkmark" size={24} color={theme.colors.accentText} />}
        {section && <Ionicons name="chevron-forward" size={24} color={theme.colors.mainText} />}
      </Box>
    </Pressable>
  );
};

interface ChoiceListProps {
  children: React.ReactNode | React.ReactNode[];
}

const ChoiceList: FC<ChoiceListProps> & {
  Item: typeof ChoiceListItem;
} = ({ children }) => {
  return (
    <Box marginHorizontal="m" marginVertical="s">
      {children}
    </Box>
  );
};

ChoiceList.Item = ChoiceListItem;

export default ChoiceList;
