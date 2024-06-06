import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AppLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.mainBackground,
            paddingBottom: 12,
            paddingTop: 12,
            height: 74,
          },
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: t("explore", "Explore"),
            tabBarIcon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="experiences"
          options={{
            title: t("experiences", "Experiences"),
            tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("profile", "Profile"),
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="person-circle-outline" color={color} />
            ),
          }}
        />
      </Tabs>
    </BottomSheetModalProvider >
  );
}
