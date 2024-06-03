import { ExperienceCard } from "@/components/ExperienceCard";
import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import InputText from "@/components/ui/InputText";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { experiencesMockData } from "@/constants/mocks/experiences";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

interface EnrollmentData {
  from_date: string;
  to_date: string;
  accepted_requirements: boolean;
  accepted_privacy: boolean;
}

export default function ExperienceEnrollScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  const experience = experiencesMockData.find((exp) => exp.id === id);

  const { control, handleSubmit } = useForm<EnrollmentData>();

  if (!experience) {
    return null;
  }

  async function onSubmit(data: EnrollmentData) {
    console.log(data); // TODO: send data to API
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Topbar goBack title="Conferma esperienza" />

        <Box marginTop="xl" marginBottom="l" marginHorizontal="m">
          <Text variant="header" fontSize={32} lineHeight={38}>
            {t("iWantTo", "I want to")}
          </Text>
          <Text variant="header" fontSize={32} lineHeight={38}>
            {t("help", "help")}
          </Text>
        </Box>
        <ExperienceCard
          id={experience.id}
          organization={experience.organization}
          title={experience.title}
          location={experience.location}
          date={experience.date}
          image={experience.image}
        />
        <Box marginHorizontal="m" gap="l" marginTop="m">
          <Box flexDirection="row" justifyContent="space-between" marginVertical="m" gap="m">
            <Box flex={1}>
              <Controller
                control={control}
                name="from_date"
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label={t("from", "From")}
                    value={value}
                    onChangeText={onChange}
                    placeholder="GG/MM/AAAA"
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                control={control}
                name="to_date"
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label={t("to", "To")}
                    value={value}
                    onChangeText={onChange}
                    placeholder="GG/MM/AAAA"
                  />
                )}
              />
            </Box>
          </Box>

          <Controller
            control={control}
            name="accepted_requirements"
            render={({ field: { onChange, value } }) => (
              <Checkbox value={value || false} onChange={onChange}>
                <Box flexDirection="row" gap="s" flexWrap="wrap">
                  <Text variant="body">
                    <Trans i18nKey="acceptedRequirements">
                      I confirm that I meet the required criteria
                    </Trans>
                  </Text>
                  <Box marginLeft="s">
                    <Text variant="body" color="secondaryText">
                      • Maggiore età
                    </Text>
                    <Text variant="body" color="secondaryText">
                      • Auto
                    </Text>
                  </Box>
                </Box>
              </Checkbox>
            )}
          />

          <Controller
            control={control}
            name="accepted_privacy"
            render={({ field: { onChange, value } }) => (
              <Checkbox value={value || false} onChange={onChange}>
                <Box flexDirection="row" gap="s" flexWrap="wrap">
                  <Text variant="body">
                    <Trans
                      i18nKey="acceptedOrganizationPrivacy"
                      values={{ organization: experience.organization }}
                    >
                      I consent to share my data with {{ organization: experience.organization }}
                    </Trans>
                  </Text>
                </Box>
              </Checkbox>
            )}
          />

          <Button
            label={t("continue", "Continue")}
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
