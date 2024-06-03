import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import InputText from "@/components/ui/InputText";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useSession } from "@/contexts/authentication";
import { useNetwork } from "@/contexts/network";
import { ProfileData } from "@/types/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

type RegistrationData = Pick<
  ProfileData,
  "first_name" | "last_name" | "date_of_birth" | "tax_code" | "accepted_tos" | "accepted_newsletter"
>;

const schema = Yup.object().shape({
  first_name: Yup.string().required("Questo campo è obbligatorio"),
  last_name: Yup.string().required("Questo campo è obbligatorio"),
  date_of_birth: Yup.string().required("Questo campo è obbligatorio"),
  tax_code: Yup.string().required("Questo campo è obbligatorio"),
  accepted_tos: Yup.boolean()
    .required("Devi accettare i Termini di Servizio")
    .oneOf([true], "Devi accettare i Termini di Servizio"),
  accepted_newsletter: Yup.boolean().oneOf([true, false]),
});

export default function RegistrationScreen() {
  const { client } = useNetwork();
  const { fetchUser } = useSession();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "test",
      last_name: "test",
      date_of_birth: "20/12/1980",
      tax_code: "test",
      accepted_tos: true,
      accepted_newsletter: false,
    },
  });

  async function onSubmit(data: RegistrationData) {
    try {
      const response = await client.PATCH("/auth/user", {
        body: data,
      });

      await fetchUser();

      if (response.data?.accepted_tos) {
        router.replace("/explore");
        return;
      }

      Toast.show({
        type: "success",
        text1: "Termini di servizio",
        text2: "È necessario accettare i termini di servizio",
      });
    } catch (error) {
      console.error("profile error:", error);
      Toast.show({
        type: "error",
        text2: "Non è stato possibile aggiornare il profilo. Per favore, riprova",
      });
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Topbar title="Completa la registrazione" goBack />
        <Box flexDirection="column" gap="l" paddingHorizontal="m" marginTop="l">
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, value } }) => (
              <InputText label="Nome" value={value} onChangeText={onChange} />
            )}
          />
          {errors.first_name && <Text variant="error">{errors.first_name.message}</Text>}

          <Box>
            <Controller
              control={control}
              name="last_name"
              render={({ field: { onChange, value } }) => (
                <InputText label="Cognome" value={value} onChangeText={onChange} />
              )}
            />
            <Text variant="secondary" marginTop="s">
              Assicurati che il tuo nome e cognome siano gli stessi riportati sul tuo documento
              d’identità.
            </Text>
            {errors.last_name && <Text variant="error">{errors.last_name.message}</Text>}
          </Box>

          <Box marginTop="s">
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label="Data di nascita"
                  value={value}
                  onChangeText={onChange}
                  placeholder="GG/MM/AAAA"
                />
              )}
            />
            <Text variant="secondary" marginTop="s">
              Per registrarti a FaXTe devi avere almeno 16 anni.
            </Text>
            {errors.date_of_birth && <Text variant="error">{errors.date_of_birth.message}</Text>}
          </Box>

          <Box marginVertical="s">
            <Controller
              control={control}
              name="tax_code"
              render={({ field: { onChange, value } }) => (
                <InputText label="Codice fiscale" value={value} onChangeText={onChange} />
              )}
            />
            <Text variant="secondary" marginTop="s">
              Il codice fiscale ci serve per...
            </Text>
            {errors.tax_code && <Text variant="error">{errors.tax_code.message}</Text>}
          </Box>

          <Controller
            control={control}
            name="accepted_tos"
            render={({ field: { onChange, value } }) => (
              <Checkbox value={value || false} onChange={onChange}>
                <Box flexDirection="row" gap="s" flexWrap="wrap">
                  <Text variant="body">Ho letto e accetto</Text>
                  <Text variant="link">i Termini di Servizio</Text>
                  <Text variant="body">e</Text>
                  <Text variant="link">l’Informativa sulla Privacy</Text>
                </Box>
              </Checkbox>
            )}
          />
          {errors.accepted_tos && <Text variant="error">{errors.accepted_tos.message}</Text>}
          <Controller
            control={control}
            name="accepted_newsletter"
            render={({ field: { onChange, value } }) => (
              <Checkbox value={value || false} onChange={onChange}>
                <Box flexDirection="row" gap="s" flexWrap="wrap">
                  <Text variant="body">Voglio ricevere comunicazioni sulle </Text>
                  <Text variant="body">iniziative di FaXTe</Text>
                </Box>
              </Checkbox>
            )}
          />
          <Button
            label="Continua"
            marginVertical="s"
            onPress={handleSubmit(onSubmit)}
            // isDisabled={!email || !email.includes("@")}
            variant="primary"
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
