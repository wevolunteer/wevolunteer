import { Theme } from "@/config/theme";
import { useTheme } from "@shopify/restyle";
import React, { FC } from "react";
import { LayoutAnimation, Pressable } from "react-native";
import Box from "./Box";
import Icon from "./Icon";

interface CheckboxProps {
  children: React.ReactNode;
  value: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ children, value, onChange }) => {
  const theme = useTheme<Theme>();

  function handlePress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange(!value);
  }

  return (
    <Box flexDirection="row" alignItems="flex-start" gap="m">
      <Pressable onPress={handlePress}>
        <Box
          width={32}
          height={32}
          borderRadius="s"
          borderWidth={1}
          backgroundColor={value ? "invertedBackground" : "mainBackground"}
          justifyContent="center"
          alignItems="center"
        >
          {value && <Icon name="check" size={24} color={theme.colors.whiteText} />}
        </Box>
      </Pressable>
      <Box flex={1}>{children}</Box>
    </Box>
  );
};

export default Checkbox;
