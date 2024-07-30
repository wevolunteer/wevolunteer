import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Activity } from "@/types/data";
import { format } from "date-fns";
import { FC } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import Icon from "./ui/Icon";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { processColorByStatus } from "@/utils/formatters";
import { tActivityStatus } from "@/utils/enumTransl";

export interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
  onClose?: () => void;
}

export const ActivityCard: FC<ActivityCardProps> = ({ activity, onPress, onClose }) => {
  const { t } = useTranslation();


  return (
    <Pressable onPress={onPress}>
      <Box
        position="absolute"
        zIndex={-100}
        width="auto"
        height="50%"
        backgroundColor={processColorByStatus(activity.status)}
        padding="s"
        borderRadius="s"
        marginHorizontal="m"
      >
        <Text color="whiteText">{tActivityStatus(activity.status)}</Text>
      </Box>
      <Box
        elevation={7}
        position="relative"
        shadowColor="shadow"
        borderRadius="m"
        overflow="hidden"
        flexDirection="row"
        backgroundColor="mainBackground"
        marginHorizontal="m"
        marginVertical="s"
        marginTop="xl"
      >
        {onClose && (
          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <Box
              width={32}
              height={32}
              zIndex={1000}
              justifyContent="center"
              alignItems="center"
              borderRadius="full"
              backgroundColor="mainBackground"
              borderWidth={1}
              borderColor="mainBorder"
            >
              <Icon name="close" size={20} color="#000" />
            </Box>
          </Pressable>
        )}
        <Box flex={1} padding="m">
          <Text variant="secondary">{activity.experience.organization.name}</Text>
          <Box flex={1} marginVertical="s">
            <Text variant="title" fontSize={16}>
              {activity.experience.title}
            </Text>
          </Box>
          <Text variant="body">{activity.experience.city}</Text>
          <Text variant="secondary">
            {activity.start_date ? format(new Date(activity.start_date), "d/MM") : ""}
          </Text>
        </Box>
        <Box flex={1}>
          <Animated.Image
            source={{ uri: activity.experience.image }}
            style={{ width: "100%", height: 179 }}
          />
        </Box>
      </Box>
    </Pressable>
  );
};
