import { Theme } from "@/config/theme";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import Box from "../ui/Box";
import Icon from "../ui/Icon";
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
          <Icon name="marker" size={24} />
          <Text textDecorationLine="underline">Trento</Text>
        </Box>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["90%"]}
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
                <Icon name="chevron-left" />
              </Box>
            </Pressable>
            <Box marginHorizontal="m" marginTop="m" gap="m">
              <Icon name="marker" size={48} />
              <Text variant="header">{t("choosePlace", "Choose place")}</Text>
              <InputText value={value} onChangeText={onChange} />

              <Box flexDirection="row" gap="s">
                <Icon name="marker" size={24} color={theme.colors.accentText} />
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
