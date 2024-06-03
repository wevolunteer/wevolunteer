import { ViewStyle } from "react-native";
import { SafeAreaView as BaseSafeAreaView } from "react-native-safe-area-context";

interface SafeAreaViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function SafeAreaView({ children, style }: SafeAreaViewProps) {
  return (
    <BaseSafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        ...style,
      }}
    >
      {children}
    </BaseSafeAreaView>
  );
}
