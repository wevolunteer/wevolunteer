import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

interface RecoverPasswordData {
  email: string;
}

export default function RequestRecoverPasswordScreen() {
  const { watch, control } = useForm<RecoverPasswordData>();

  const email = watch("email");

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Topbar title="Recupera password" goBack />

      <Box
        width="100%"
        paddingHorizontal="m"
        flex={1}
        paddingTop="l"
        flexDirection="column"
        gap="l"
      >
        <Text variant="body">
          Inserisci l’indirizzo email che hai usato per registrati. Ti invieremo un link per
          reimpostare la password.
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Inserisci la tua email"
            />
          )}
          name="email"
          rules={{ required: true }}
        />

        <Button
          label="Invia link"
          onPress={console.log}
          isDisabled={!email || !email.includes("@")}
          variant="primary"
        />
      </Box>
    </SafeAreaView>
  );
}
