import Box from "@/components/ui/Box";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaView from "../../ui/SafeAreaView";

const SearchModal = () => {
  return (
    <SafeAreaView>
      <Box>
        <Ionicons name="chevron-back" size={24} color="mainText" />
      </Box>
    </SafeAreaView>
  );
};

export default SearchModal;
