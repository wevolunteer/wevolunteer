import { Theme } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { FC, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../ui/Box";
import Text from "../ui/Text";
import FilterFooter from "./FilterFooter";
import FilterHeader from "./FilterHeader";

interface SearchbarFilterProps {
  title: string;
  label?: string | null;
  selected?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  onConfirm?: () => void;
  onReset?: () => void;
  onBack?: () => void;
}

const SearchbarFilter: FC<SearchbarFilterProps> = ({
  title,
  label,
  selected,
  children,
  onConfirm,
  onReset,
  onBack,
}) => {
  const theme = useTheme<Theme>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, [bottomSheetModalRef]);

  function handleConfirm() {
    bottomSheetModalRef.current?.dismiss();
    onConfirm && onConfirm();
  }

  return (
    <TouchableOpacity onPress={handlePresentModalPress}>
      <Box
        borderWidth={1}
        borderColor={selected ? "accentText" : "mainBorder"}
        flexDirection="row"
        alignItems="flex-end"
        borderRadius="s"
        paddingHorizontal="m"
        backgroundColor={selected ? "primaryLightBackground" : "mainBackground"}
        paddingVertical="s"
        gap="s"
      >
        <Text variant="secondary" color={selected ? "accentText" : "secondaryText"} fontSize={13}>
          {label || title}
        </Text>
        <Ionicons
          name="caret-down-outline"
          size={10}
          color={selected ? theme.colors.accentText : theme.colors.secondaryText}
          style={{ paddingBottom: 3 }}
        />
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
            <FilterHeader title={title} onClose={handleCloseModalPress} onBack={onBack} />
            {children}
            <FilterFooter onConfirm={onConfirm && handleConfirm} onReset={onReset} />
          </BottomSheetView>
        </BottomSheetModal>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SearchbarFilter;
