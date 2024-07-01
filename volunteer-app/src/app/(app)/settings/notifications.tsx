import Box from "@/components/ui/Box";
import Switch from "@/components/ui/Switch";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

interface NotificationItemProps {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const NotificationItem: FC<NotificationItemProps> = ({ text, value, onChange }) => {
  return (
    <Box borderBottomWidth={1} borderBottomColor="lightBorder" py="m" flexDirection="row" gap="m">
      <Box flex={1}>
        <Text variant="body">{text}</Text>
      </Box>
      <Box>
        <Switch value={value} onChange={onChange} />
      </Box>
    </Box>
  );
};

export default function SettingsNotificationsScreen() {
  const { t } = useTranslation();

  const [value1, setValue1] = useState<boolean>(true);
  const [value2, setValue2] = useState<boolean>(false);
  const [value3, setValue3] = useState<boolean>(true);

  return (
    <SafeAreaView>
      <Topbar goBack empty />
      <Box px="m" mt="m">
        <Text variant="header">{t("notificationsSettings", "Notifications Settings")}</Text>

        <Box borderTopWidth={1} borderTopColor="lightBorder" mt="2xl">
          <NotificationItem
            text="Nuova richiesta di volontariato vicino a te"
            value={value1}
            onChange={setValue1}
          />
          <NotificationItem
            text="Nuova richiesta di volontariato dall’organizzazione che segui"
            value={value2}
            onChange={setValue2}
          />
          <NotificationItem
            text="La tua esperienza di volontariato si avvicina"
            value={value3}
            onChange={setValue3}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
