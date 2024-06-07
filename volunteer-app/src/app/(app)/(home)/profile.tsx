import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { useSession } from "@/contexts/authentication";
import { router } from "expo-router";
import { View } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useSession();

  function handleSignOut() {
    signOut();
    router.replace("/");
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="header">Profile</Text>

        <Button variant="outline" onPress={handleSignOut} label="Sign out" />
      </View>
    </View>
  );
}
