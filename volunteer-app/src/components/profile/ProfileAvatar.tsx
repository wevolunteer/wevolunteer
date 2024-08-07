import { useNetwork } from "@/contexts/network";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { FC, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../ui/Box";
import Icon from "../ui/Icon";
import Text from "../ui/Text";
import CameraPickerButton from "./CameraPickerButton";
import ImagePickerButton from "./ImagePickerButton";

const emptyAvatarImage = require("@/assets/images/empty-avatar.png");

export type MediaResource = {
  uri: string;
  name: string;
  type: string;
};

interface ProfileAvatarProps {
  url?: string;
  onChange?: (url: string) => void;
  editable?: boolean;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ url, onChange, editable }) => {
  const { t } = useTranslation();
  const { client } = useNetwork();

  const uploadMedia = useMutation({
    mutationFn: async (media: MediaResource) => {
      const formData = new FormData();

      const res = await fetch(media.uri);
      const blob = await res.blob();

      const file = {
        // uri: Platform.OS === "android" ? media.uri : media.uri.replace("file://", ""),
        // type: media.type,
        filename: blob,
        name: media.name,
      };

      formData.append("filename", blob);
      formData.append("name", media.name);

      const response = await client.POST("/media", {
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        bodySerializer(body) {
          const fd = new FormData();
          console.log("=====================");
          for (const name in body) {
            console.log(name, body[name]);
            fd.append(name, body[name]);
          }
          return fd;
        },
      });

      console.log(response);

      return;
    },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, [bottomSheetModalRef]);

  const handleImagePickerSubmit = useCallback(
    async (media: MediaResource) => {
      // if (onChange) {
      //   onChange(url);
      // }
      try {
        await uploadMedia.mutateAsync(media);
        handleCloseModalPress();
      } catch (e) {
        console.log(e);
      }
    },
    [onChange, handleCloseModalPress],
  );

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
        <>
          <TouchableOpacity onPress={handlePresentModalPress}>
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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose={true}
            enableDynamicSizing={true}
            handleComponent={null}
            backgroundStyle={styles.modalBackground}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                opacity={0.6}
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
              />
            )}
          >
            <BottomSheetView style={{}}>
              <Box
                height={56}
                borderBottomWidth={1}
                flexDirection="row"
                borderBottomColor="lightBorder"
                width="100%"
                justifyContent="space-between"
                paddingHorizontal="m"
                position="relative"
                alignItems="center"
              >
                <Box minWidth={20}>
                  <Pressable onPress={handleCloseModalPress}>
                    <Icon name="close" />
                  </Pressable>
                </Box>

                <Text fontWeight="700">{t("chooseAvatar", "Choose an image")}</Text>
                <Box minWidth={20}></Box>
              </Box>
              <Box marginHorizontal="m" marginTop="s" marginBottom="2xl">
                <CameraPickerButton onSubmit={handleImagePickerSubmit} />
                <ImagePickerButton onSubmit={handleImagePickerSubmit} />
              </Box>
            </BottomSheetView>
          </BottomSheetModal>
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ProfileAvatar;
