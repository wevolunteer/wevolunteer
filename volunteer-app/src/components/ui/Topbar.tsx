import { router } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";
import Box from "./Box";
import Icon from "./Icon";
import Text from "./Text";

interface TopbarProps {
  title?: string;
  goBack?: boolean;
  rightComponent?: React.ReactNode;
}

const Topbar: FC<TopbarProps> = ({ title, goBack, rightComponent }) => {
  return (
    <Box
      height={48}
      borderBottomWidth={1}
      flexDirection="row"
      borderBottomColor="mainBorder"
      width="100%"
      justifyContent="space-between"
      paddingHorizontal="m"
      position="relative"
      alignItems="center"
    >
      <Box minWidth={20}>
        {goBack && (
          <Pressable onPress={() => router.back()}>
            <Icon name="chevron-left" size={24} />
          </Pressable>
        )}
      </Box>

      <Box>{title && <Text fontWeight="700">{title}</Text>}</Box>

      <Box minWidth={20}>{rightComponent}</Box>
    </Box>
  );
};

export default Topbar;
