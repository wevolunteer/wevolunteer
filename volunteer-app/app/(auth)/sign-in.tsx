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
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { requestAuthCode } = useSession();
  const [error, setError] = useState<string | null>(null);

  const { watch, control, handleSubmit } = useForm<SignInData>();

  async function onSubmit(data: SignInData) {
    if (data.email === "") {
      setError("Inserisci la tua email");
      return;
    }

    try {
      const response = await requestAuthCode(data);

      if (!response) {
        setError("Errore durante la richiesta del codice di verifica");
        return;
      }
      setError(null);
      router.push(`/verify-code?email=${data.email}`);
    } catch (error) {
      console.error(error);
      setError("Errore durante la richiesta del codice di verifica");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Topbar title="Accedi o registrati" goBack />

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
              label="Email"
              value={value}
              onChangeText={onChange}
              placeholder="Inserisci la tua email"
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
          label="Continua"
          onPress={handleSubmit(onSubmit)}
          // isDisabled={!email || !email.includes("@")}
          variant="primary"
        />
      </Box>
    </SafeAreaView>
  );
}
