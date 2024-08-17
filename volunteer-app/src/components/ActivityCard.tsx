import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Activity } from "@/types/data";
import { tActivityStatus } from "@/utils/enumTransl";
import { processColorByStatus } from "@/utils/formatters";
import { format } from "date-fns";
import { FC } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import Icon from "./ui/Icon";

export interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
  onClose?: () => void;
}

export const ActivityCard: FC<ActivityCardProps> = ({ activity, onPress, onClose }) => {
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
        shadowColor="shadow"
        shadowOffset={{ width: -2, height: 4 }}
        shadowOpacity={0.2}
        shadowRadius={3}
        elevation={6}
        position="relative"
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
