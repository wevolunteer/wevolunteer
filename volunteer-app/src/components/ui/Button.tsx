import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  SpacingProps,
  VariantProps,
  backgroundColor,
  border,
  color,
  composeRestyleFunctions,
  createVariant,
  spacing,
  useRestyle,
  useTheme,
} from "@shopify/restyle";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { Theme } from "@/config/theme";
import { useMemo } from "react";
import Box from "./Box";
import Icon, { IconName } from "./Icon";
import Text from "./Text";

const variant = createVariant<Theme, "buttonVariants">({
  themeKey: "buttonVariants",
  defaults: {
    paddingHorizontal: "m",
    paddingVertical: "s",
    py: "m",
    borderRadius: "m",
  },
});

type RestyleProps = SpacingProps<Theme> &
  VariantProps<Theme, "buttonVariants"> &
  BorderProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  variant,
  border,
  color,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress?: () => void;
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  rightIcon?: IconName;
  leftIcon?: IconName;
  renderRightIcon?: () => React.ReactNode;
};

const Button = ({
  onPress,
  label,
  renderRightIcon: renderLeftIcon,
  rightIcon,
  leftIcon,
  isDisabled,
  isLoading,
  ...rest
}: Props) => {
  rest.variant = isDisabled ? "disabled" : rest.variant;

  const theme = useTheme<Theme>();
  const props = useRestyle(restyleFunctions, rest);

  const textColor = useMemo(() => {
    switch (rest.variant) {
      case "primary":
        return "whiteText";
      case "secondary":
        return "accentText";
      case "outline":
        return "mainText";
      case "ghost":
        return "mainText";
      case "disabled":
        return "whiteText";
    }
  }, [rest.variant]);

  const iconColor = theme.colors[textColor || "mainText"];

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        opacity={isLoading ? 0.5 : 1}
        gap="m"
        {...props}
        position="relative"
      >
        {renderLeftIcon && (
          <Box position="absolute" left={15} top={12}>
            {renderLeftIcon()}
          </Box>
        )}
        {rightIcon && (
          <Box position="absolute" left={15} top={12}>
            <Icon name={rightIcon} color={iconColor} />
          </Box>
        )}

        {isLoading ? (
          <ActivityIndicator color={iconColor} />
        ) : (
          <Text
            marginLeft={rightIcon ? "xl" : "s"}
            marginRight={rightIcon ? "m" : "s"}
            variant="body"
            color={textColor}
            textAlign="center"
            fontSize={16}
          >
            {label}
          </Text>
        )}
        {leftIcon && (
          <Box position="absolute" right={15} top={12}>
            <Icon name={leftIcon} color={iconColor} />
          </Box>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
