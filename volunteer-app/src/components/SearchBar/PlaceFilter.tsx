import { Theme } from "@/config/theme";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import Box from "../ui/Box";
import InputText from "../ui/InputText";
import SafeAreaView from "../ui/SafeAreaView";
import Text from "../ui/Text";

interface PlaceFilterProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PlaceFilter: FC<PlaceFilterProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useTheme<Theme>();

  const handleOpenModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <Pressable onPress={handleOpenModal}>
        <Box flexDirection="row" marginRight="m">
          <Ionicons name="location-outline" size={24} color="mainText" />
          <Text textDecorationLine="underline">Trento</Text>
        </Box>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["100%"]}
        handleComponent={null}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <SafeAreaView>
            <Pressable onPress={handleCloseModal}>
              <Box margin="m" width="100%">
                <Ionicons name="chevron-back" size={28} color="mainText" />
              </Box>
            </Pressable>
            <Box marginHorizontal="m" marginTop="m" gap="m">
              <Ionicons name="location-outline" size={48} color="mainText" />
              <Text variant="header" fontSize={32} lineHeight={39}>
                {t("choosePlace", "Choose place")}
              </Text>
              <InputText value={value} onChangeText={onChange} />

              <Box flexDirection="row" gap="s">
                <Ionicons name="paper-plane" size={24} color={theme.colors.accentText} />
                <Text variant="link" color="accentText">
                  {t("useCurrentLocation", "Use current location")}
                </Text>
              </Box>
            </Box>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default PlaceFilter;
