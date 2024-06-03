import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { useSession } from "@/contexts/authentication";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return <Redirect href="/explore" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Box flex={1} alignItems="center" mt="xl" px="l">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 245,
            height: 97,
            marginTop: 70,
            marginBottom: 16,
          }}
        />
        <Text variant="body" textAlign="center">
          Trova la tua opportunità di volontariato: esprimi i tuoi talenti e coltiva le tue
          passioni.
        </Text>
      </Box>

      <Box width="100%" px="l" mb="xl">
        <Button
          variant="outline"
          label="Continua con Facebook"
          marginBottom="m"
          renderRightIcon={() => (
            <Image
              style={{ width: 28, height: 28 }}
              source={require("@/assets/images/facebook-icon-logo.png")}
            />
          )}
        />

        <Button
          variant="outline"
          label="Continua con Google"
          renderRightIcon={() => (
            <Image
              style={{ width: 28, height: 28 }}
              source={require("@/assets/images/google-icon-logo.png")}
            />
          )}
        />
        <Box marginVertical="l" position="relative" flexDirection="row" justifyContent="center">
          <Box backgroundColor="mainBackground" position="relative" zIndex={2}>
            <Text variant="body" textAlign="center" marginHorizontal="s" fontSize={12}>
              oppure
            </Text>
          </Box>
          <Box
            left={0}
            top={14}
            right={0}
            borderTopWidth={1}
            height={10}
            position="absolute"
            borderTopColor="mainBorder"
            zIndex={1}
          />
        </Box>
        <Button
          variant="outline"
          label="Continua con Email"
          onPress={() => router.push("/sign-in")}
          rightIcon="mail-outline"
        />
      </Box>
    </SafeAreaView>
  );
}
