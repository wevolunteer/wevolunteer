import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Tabs } from "expo-router";

export default function AppLayout() {
  const theme = useTheme();

  return (
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
          title: "Esplora",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="experiences"
        options={{
          title: "Esperienze",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profilo",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person-circle-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
