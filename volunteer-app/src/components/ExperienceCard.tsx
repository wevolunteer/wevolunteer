import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Experience } from "@/types/data";
import { format } from "date-fns";
import { FC } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import Icon from "./ui/Icon";

export interface ExperienceCardProps {
  experience: Experience;
  onPress?: () => void;
  onClose?: () => void;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({ experience, onPress, onClose }) => {
  return (
    <Pressable onPress={onPress}>
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
          <Text variant="secondary">{experience.organization.name}</Text>
          <Box flex={1} marginVertical="s">
            <Text variant="title" fontSize={16}>
              {experience.title}
            </Text>
          </Box>
          <Text variant="body">{experience.city}</Text>
          <Text variant="secondary">
            {experience.start_date ? format(new Date(experience.start_date), "d/MM") : ""}

            {experience.end_date ? ` - ${format(new Date(experience.end_date), "d/MM")}` : ""}
          </Text>
        </Box>
        <Box flex={1}>
          <Animated.Image
            source={{ uri: experience.image }}
            style={{ width: "100%", height: 179 }}
          />
        </Box>
      </Box>
    </Pressable>
  );
};
