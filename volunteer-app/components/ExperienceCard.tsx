import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { FC } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

export interface ExperienceCardProps {
  id: string;
  organization: string;
  title: string;
  location: string;
  date: string;
  image: any;
  onPress?: () => void;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  id,
  organization,
  title,
  location,
  date,
  image,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        elevation={7}
        shadowColor="shadow"
        borderRadius="m"
        overflow="hidden"
        flexDirection="row"
        backgroundColor="mainBackground"
        marginHorizontal="m"
        marginVertical="s"
      >
        <Box flex={1} padding="m">
          <Text variant="secondary">{organization}</Text>
          <Box flex={1} marginVertical="s">
            <Text variant="title">{title}</Text>
          </Box>
          <Text variant="body">{location}</Text>
          <Text variant="secondary">{date}</Text>
        </Box>
        <Box flex={1}>
          <Animated.Image
            source={image}
            style={{ width: "100%", height: 179 }}
            sharedTransitionTag={`test`}
          />
        </Box>
      </Box>
    </Pressable>
  );
};
