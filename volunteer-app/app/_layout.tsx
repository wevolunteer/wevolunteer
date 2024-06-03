import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { toastConfig } from "@/components/ui/Toast";
import theme from "@/constants/Theme";
import { SessionProvider } from "@/contexts/authentication";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { NetworkProvider } from "@/contexts/network";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NetworkProvider>
          <SessionProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  flex: 1,
                  backgroundColor: theme.colors.mainBackground,
                },
              }}
            />
            <Toast config={toastConfig(theme)} position="bottom" />
            <StatusBar style="dark" />
          </SessionProvider>
        </NetworkProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
