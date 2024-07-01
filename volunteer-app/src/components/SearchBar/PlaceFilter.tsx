import { Theme } from "@/config/theme";
import { useTheme } from "@shopify/restyle";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Box from "../ui/Box";
import Icon from "../ui/Icon";
import InputText from "../ui/InputText";
import Text from "../ui/Text";
import SearchbarFilter from "./Filter";

interface PlaceFilterProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
}

const PlaceFilter: FC<PlaceFilterProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <SearchbarFilter
      icon="position"
      title={value ? value : t("yourPosition", "Your position")}
      label={value ? value : t("yourPosition", "Your position")}
      selected={true}
      onReset={() => onChange && onChange(null)}
      onConfirm={() => onChange && onChange(null)}
    >
      <Box marginHorizontal="m" marginTop="m" gap="m">
        <Icon name="marker" size={48} />
        <Text variant="header">{t("choosePlace", "Choose place")}</Text>
        <InputText value={value || ""} onChangeText={onChange} />

        <Box flexDirection="row" gap="s">
          <Icon name="marker" size={24} color={theme.colors.accentText} />
          <Text variant="link" color="accentText">
            {t("useCurrentLocation", "Use current location")}
          </Text>
        </Box>
      </Box>
    </SearchbarFilter>
  );
};

export default PlaceFilter;
