import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useSession } from "@/contexts/authentication";
import { SignInData } from "@/types/data";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { requestAuthCode } = useSession();
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { watch, control, handleSubmit } = useForm<SignInData>();

  async function onSubmit(data: SignInData) {
    if (data.email === "") {
      setError(t("emailRequired", "Email is required"));
      return;
    }

    try {
      const response = await requestAuthCode(data);

      if (!response) {
        setError(t("errorRequestingVerificationCode", "Error requesting verification code"));
        return;
      }
      setError(null);
      router.push(`/verify-code?email=${data.email}`);
    } catch (error) {
      console.error(error);
      setError(t("errorRequestingVerificationCode", "Error requesting verification code"));
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Topbar title={t("signInOrRegister", "Sign in or register")} goBack />

      <Box
        width="100%"
        paddingHorizontal="m"
        flex={1}
        paddingTop="xl"
        flexDirection="column"
        gap="l"
      >
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputText
              label={t("email", "Email")}
              value={value}
              onChangeText={onChange}
              placeholder={t("emailPlaceholder", "Insert your email")}
            />
          )}
          name="email"
          defaultValue=""
        />

        {error && (
          <Text variant="error" textAlign="center">
            {error}
          </Text>
        )}

        <Button
          label={t("continue", "Continue")}
          onPress={handleSubmit(onSubmit)}
          // isDisabled={!email || !email.includes("@")}
          variant="primary"
        />
      </Box>
    </SafeAreaView>
  );
}
