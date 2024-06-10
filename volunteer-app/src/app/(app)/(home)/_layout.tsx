import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

interface TabBarIconProps {
  name: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused }) => {
  return (
    <Box justifyContent="center" alignItems="center">
      <Text color={focused ? "accentText" : "mainText"}>{name}</Text>
    </Box>
  );
};

export default function AppLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.mainBackground,
            paddingBottom: 12,
            paddingTop: 12,
            height: 74,
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: "rgba(0, 0, 0, 0.05)",
                borderless: true,
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                props.style,
              ]}
            >
              {props.children}
            </Pressable>
          ),
          tabBarIcon: ({ focused }) => <TabBarIcon name={route.name} focused={focused} />,
        })}
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
    </BottomSheetModalProvider>
  );
}
