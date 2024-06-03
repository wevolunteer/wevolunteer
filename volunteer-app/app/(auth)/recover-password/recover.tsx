import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

interface RecoverPasswordData {
  password: string;
  password2: string;
}

export default function RecoverPasswordScreen() {
  const { control } = useForm<RecoverPasswordData>();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Topbar title="Reimposta password" goBack />

      <Box
        width="100%"
        paddingHorizontal="m"
        flex={1}
        paddingTop="l"
        flexDirection="column"
        gap="l"
      >
        <Text variant="body">
          Deve contenere almeno 8 caratteri e includere un numero o un simbolo.
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Inserisci la nuova password"
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Conferma Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Conferma la password"
            />
          )}
          name="password2"
          rules={{ required: true }}
        />

        <Button label="Invia link" onPress={console.log} variant="primary" />
      </Box>
    </SafeAreaView>
  );
}
