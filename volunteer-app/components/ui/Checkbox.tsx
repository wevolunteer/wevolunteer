import { Theme } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import React, { FC } from "react";
import { Pressable } from "react-native";
import Box from "./Box";

interface CheckboxProps {
  children: React.ReactNode;
  value: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ children, value, onChange }) => {
  const theme = useTheme<Theme>();
  return (
    <Box flexDirection="row" alignItems="flex-start" gap="m">
      <Pressable onPress={() => onChange(!value)}>
        <Box
          width={32}
          height={32}
          borderRadius="s"
          borderWidth={1}
          backgroundColor={value ? "invertedBackground" : "mainBackground"}
          justifyContent="center"
          alignItems="center"
        >
          {value && <Ionicons name="checkmark" size={24} color={theme.colors.whiteText} />}
        </Box>
      </Pressable>
      <Box flex={1}>{children}</Box>
    </Box>
  );
};

export default Checkbox;
