import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputDate from "@/components/ui/InputDate";
import InputTime from "@/components/ui/InputTime";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useNetwork } from "@/contexts/network";
import { ActivityUpdateData } from "@/types/data";
import { convertToDDMMYYYY, convertToYYYYMMDD } from "@/utils/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function ActivityEditScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { client } = useNetwork();
  const queryClient = useQueryClient();

  if (!id || Array.isArray(id)) {
    throw new Error("id should be a string");
  }

  const activityId = parseInt(id);

  const { data } = useQuery({
    queryKey: ["activity", id],
    queryFn: async () => {
      const response = await client.GET("/activities/{id}", {
        params: {
          path: {
            id: activityId,
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
    setValue,
    formState: { errors },
  } = useForm<ActivityUpdateData>();

  useEffect(() => {
    if (data) {
      setValue("start_date", convertToDDMMYYYY(data.start_date));
      setValue("start_time", data.start_time);
      setValue("end_date", convertToDDMMYYYY(data.end_date));
      setValue("end_time", data.end_time);
    }
  }, [data, setValue]);

  if (!data) {
    return null;
  }

  async function onSubmit(data: ActivityUpdateData) {
    try {
      const start_date = convertToYYYYMMDD(data.start_date || "");
      const end_date = convertToYYYYMMDD(data.end_date || "");

      if (new Date(start_date) > new Date(end_date)) {
        setError("end_date", {
          type: "manual",
          message: t("endDateBeforeStartDate", "End date must be after start date"),
        });

        return;
      }

      const res = await client.PUT(`/activities/{id}`, {
        params: {
          path: {
            id: activityId,
          },
        },
        body: {
          start_date,
          start_time: data.start_time,
          end_date,
          end_time: data.end_time,
        },
      });

      if (res.error) {
        throw new Error(res.error.detail);
      }

      queryClient.refetchQueries({ queryKey: ["activities"] });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text2: t("error", "Error: " + error.message),
      });
      return;
    }

    router.replace({
      pathname: "/activities/[id]/confirm",
      params: {
        id: activityId,
      },
    });
  }

  return (
    <SafeAreaView>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <Topbar goBack title={t("editVolunteerActivvity", "Edit volunteer activity")} />

        <Box marginTop="xl" marginBottom="l" marginHorizontal="m" gap="s">
          <Text variant="header" color="secondaryText">
            {t("editActivityWith", "Edit activity with")}
          </Text>
          <Text variant="header">{data.experience.organization.name}</Text>
        </Box>
        <Box marginHorizontal="m" gap="l">
          <Box flexDirection="row" justifyContent="space-between" marginVertical="m" gap="m">
            <Box flex={1}>
              <Controller
                control={control}
                name="end_time"
                rules={{ required: t("requiredField", "This field is required") }}
                render={({ field: { onChange, value } }) => (
                  <InputTime
                    label={t("fromTime", "From hour")}
                    value={value}
                    error={errors.end_time?.message}
                    onChangeText={onChange}
                    placeholder="HH:MM"
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                control={control}
                name="start_date"
                rules={{ required: t("requiredField", "This field is required") }}
                render={({ field: { onChange, value } }) => (
                  <InputDate
                    label={t("fromDay", "Of the day")}
                    value={value}
                    error={errors.start_date?.message}
                    onChangeText={onChange}
                    placeholder="GG/MM/AAAA"
                  />
                )}
              />
            </Box>
          </Box>
        </Box>

        <Box marginHorizontal="m" gap="l" flex={1}>
          <Box flexDirection="row" justifyContent="space-between" marginVertical="s" gap="m">
            <Box flex={1}>
              <Controller
                control={control}
                name="end_time"
                rules={{ required: t("requiredField", "This field is required") }}
                render={({ field: { onChange, value } }) => (
                  <InputTime
                    label={t("toTime", "To hour")}
                    value={value}
                    error={errors.end_time?.message}
                    onChangeText={onChange}
                    placeholder="HH:MM"
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                control={control}
                name="end_date"
                rules={{ required: t("requiredField", "This field is required") }}
                render={({ field: { onChange, value } }) => (
                  <InputDate
                    label={t("toDate", "Of the day")}
                    value={value}
                    error={errors.end_date?.message}
                    onChangeText={onChange}
                    placeholder="GG/MM/AAAA"
                  />
                )}
              />
            </Box>
          </Box>

          <Button
            label={t("continue", "Continue")}
            marginVertical="s"
            onPress={handleSubmit(onSubmit)}
            // isDisabled={!email || !email.includes("@")}
            variant="primary"
          />
        </Box>
        <Box marginTop="l" alignItems="center">
          <Text variant="secondary">
            <Trans i18nKey="youCantParticipate">You can't participate?</Trans>
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/activities/[id]/giveup`,
                params: { id: id },
              })
            }
          >
            <Text variant="title" marginTop="m" textDecorationLine="underline" fontSize={18}>
              <Trans i18nKey="giveUpThisActivity">Give up this activity</Trans>
            </Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
