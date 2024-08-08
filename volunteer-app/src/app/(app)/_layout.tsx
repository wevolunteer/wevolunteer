import { useSession } from "@/contexts/authentication";
import { useTheme } from "@shopify/restyle";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const theme = useTheme();
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session?.user) {
    return <Redirect href="/" />;
  }

  if (!session.user.accepted_tos) {
    return <Redirect href="/registration" />;
  }

  return (
    // <NotificationProvider>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
          backgroundColor: theme.colors.mainBackground,
        },
      }}
    />
    // </NotificationProvider>
  );
}
