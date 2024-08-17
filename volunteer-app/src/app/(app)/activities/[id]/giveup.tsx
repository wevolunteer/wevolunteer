import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useSession } from "@/contexts/authentication";
import { useNetwork } from "@/contexts/network";
import { validateCF } from "@/utils/validators";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

interface EnrollmentData {
  from_date: string;
  to_date: string;
  from_time: string;
  to_time: string;
  tax_code?: string;
  accepted_requirements: boolean;
  accepted_privacy: boolean;
  message: string;
}

export default function ActivityGiveupScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { client } = useNetwork();
  const { session, fetchUser } = useSession();
  const queryClient = useQueryClient();

  if (!id || Array.isArray(id)) {
    throw new Error("id should be a string");
  }

  const experienceId = parseInt(id);

  const { data } = useQuery({
    queryKey: ["experience", id],
    queryFn: async () => {
      const response = await client.GET("/experiences/{id}", {
        params: {
          path: {
            id: experienceId,
          },
        },
      });
      return response.data;
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnrollmentData>();

  if (!data) {
    return null;
  }

  async function handleResign() {
    console.log("resign");
  }

  async function onSubmit(data: EnrollmentData) {
    try {
      if (data.tax_code && !validateCF(data.tax_code)) {
        setError("tax_code", {
          type: "manual",
          message: t("Invalid tax code"),
        });
        return;
      }

      if (!data.accepted_requirements) {
        setError("accepted_requirements", {
          type: "manual",
          message: t("youMustAcceptRequirements", "You must accept the required criteria"),
        });
        return;
      }

      const start_date = data.from_date.split("/").reverse().join("-");
      const end_date = data.to_date.split("/").reverse().join("-");

      if (new Date(start_date) > new Date(end_date)) {
        setError("to_date", {
          type: "manual",
          message: t("endDateBeforeStartDate", "End date must be after start date"),
        });

        return;
      }

      const res = await client.POST("/activities", {
        body: {
          start_date,
          start_time: data.from_time,
          end_date,
          end_time: data.to_time,
          experience_id: experienceId,
          tax_code: data.tax_code || "",
          message: data.message || "",
        },
      });

      if (res.error) {
        throw new Error(res.error.detail);
      }

      if (data.tax_code) {
        fetchUser();
      }

      queryClient.refetchQueries({ queryKey: ["activities"] });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: t("error", "Error: " + error.message),
      });
      return;
    }

    router.replace(`/experiences/${id}/confirm`);
  }

  return (
    <SafeAreaView>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <Topbar goBack title={t("giveupVolunteerActivvity", "Give up volunteer activity")} />

        <Box marginTop="xl" marginBottom="l" marginHorizontal="m" gap="s">
          <Text variant="header" color="secondaryText">
            {t("giveupVolunteerActivvityWith", "Give up activity with")}
          </Text>
          <Text variant="header">{data.organization.name}</Text>
        </Box>

        <Box px="m">
          <Text variant="body" color="secondaryText">
            {t("giveupActivityConfirmation", "Are you sure you want to give up this activity?")}
          </Text>

          <Box py="l">
            <InputText
              multiline
              numberOfLines={10}
              placeholder={t("yourMessageOptional", "Your message (optional)")}
            />
          </Box>
          <Button
            label={t("giveUp", "Give up")}
            marginVertical="s"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
