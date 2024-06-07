import Text from "@/components/ui/Text";
import { View } from "react-native";

export default function ExperiencesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="header">Experiences</Text>
      </View>
    </View>
  );
}
