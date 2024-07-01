import { Image } from "expo-image";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../ui/Box";
import Icon from "../ui/Icon";
import Text from "../ui/Text";

const emptyAvatarImage = require("@/assets/images/empty-avatar.png");

interface ProfileAvatarProps {
  url?: string;
  onChange?: (url: string) => void;
  editable?: boolean;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ url, onChange, editable }) => {
  const { t } = useTranslation();

  const source = useMemo(() => {
    if (url) {
      return { uri: url };
    }

    return emptyAvatarImage;
  }, [url]);

  return (
    <Box justifyContent="center" alignItems="center">
      <Image
        source={source}
        style={{
          width: 160,
          height: 160,
        }}
      />
      {editable && (
        <TouchableOpacity>
          <Box
            bottom={10}
            backgroundColor="darkBackground"
            px="m"
            py="s"
            gap="s"
            flexDirection="row"
            alignItems="center"
            borderRadius="full"
          >
            <Icon name="camera" size={24} color="#FFFFFF" />
            <Text color="whiteText">{t("add", "Add")}</Text>
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default ProfileAvatar;
