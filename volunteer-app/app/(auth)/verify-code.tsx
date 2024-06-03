import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useSession } from "@/contexts/authentication";
import { useNetwork } from "@/contexts/network";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const CELL_COUNT = 5;

export default function VerifyCodeScreen() {
  const [value, setValue] = useState("");
  const { email } = useLocalSearchParams();
  const { client } = useNetwork();
  const { verifyAuthCode, requestAuthCode } = useSession();
  const [error, setError] = useState<string | null>(null);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function handleResend() {
    if (!email || Array.isArray(email)) {
      return;
    }

    try {
      const response = await requestAuthCode({
        email,
      });

      if (!response) {
        setError("Errore durante la richiesta del codice di verifica");
        return;
      }
      setError(null);
      Toast.show({
        type: "success",
        props: {
          icon: "mail-outline",
        },
        text1: "Codice inviato",
        text2: "Abbiamo inviato un nuovo codice di verifica all'indirizzo email",
      });
    } catch (error) {
      console.error(error);
      setError("Errore durante la richiesta del codice di verifica");
    }
  }

  async function onSubmit() {
    if (value.length < CELL_COUNT) {
      setError("Inserisci il codice completo");
      return;
    }

    if (!email || Array.isArray(email)) {
      return;
    }

    try {
      const response = await verifyAuthCode({ email, code: value });

      if (!response) {
        setError("Il codice inserito non è valido");
        setValue("");
        return;
      }

      const { data } = await client.GET("/auth/user");

      if (data?.accepted_tos) {
        router.dismissAll();
        return;
      }

      router.replace("registration");
    } catch (error) {
      console.error(error);

      setError("Il codice inserito non è valido");
      setValue("");
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  if (!email) {
    router.push("/sign-in");
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Topbar title="Verifica Email" goBack />
      <Box
        width="100%"
        paddingHorizontal="m"
        flex={1}
        paddingTop="l"
        flexDirection="column"
        gap="l"
      >
        <Text variant="body">
          Inserisci il codice di 5 cifre che abbiamo inviato all’indirizzo {email}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.OS === "android" ? "sms-otp" : "one-time-code"}
          renderCell={({ index, symbol, isFocused }) => (
            <Box
              borderWidth={1}
              borderColor="mainBorder"
              borderRadius="m"
              width={60}
              height={60}
              paddingHorizontal="m"
              key={index}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={32} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </Box>
          )}
        />

        {error && (
          <Text variant="error" textAlign="center">
            {error}
          </Text>
        )}

        <Button
          label="Invia codice"
          onPress={onSubmit}
          variant="primary"
          isDisabled={!value || value.length < CELL_COUNT}
        />

        <Box marginTop="l" alignItems="center">
          <Text variant="secondary">Non hai ricevuto il codice?</Text>

          <TouchableOpacity onPress={handleResend}>
            <Text variant="title" marginTop="m" textDecorationLine="underline" fontSize={18}>
              Invia di nuovo
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  codeFieldRoot: {
    marginTop: 20,
  },
});
