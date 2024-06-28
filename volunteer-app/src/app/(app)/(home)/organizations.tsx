import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import { router } from "expo-router";

export default function OrganizationListScreen() {
  return (
    <SafeAreaView>
      <Box flex={1}>
        <Text>Organization List</Text>
        <Button onPress={() => router.push("/organizations/1")} label="Go to detail" />
      </Box>
    </SafeAreaView>
  );
}
