import { ExperienceCard } from "@/components/ExperienceCard";
import SearchBar from "@/components/SearchBar";
import Box from "@/components/ui/Box";
import SafeAreaView from "@/components/ui/SafeAreaView";
import Text from "@/components/ui/Text";
import { experiencesMockData } from "@/constants/mocks/experiences";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, View } from "react-native";
import MapView from "react-native-maps";

export default function ExporeIndexScreen() {
  const [q, setQ] = useState("");
  const [showMap, setShowMap] = useState(false);
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      {showMap ? (
        <View style={{ flex: 1 }}>
          <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      ) : (
        <FlatList
          data={experiencesMockData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <Box paddingHorizontal="m" marginBottom="m" backgroundColor="mainBackground">
              <SearchBar value={q} onChange={setQ} />
            </Box>
          )}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => (
            <ExperienceCard
              id={item.id}
              organization={item.organization}
              title={item.title}
              location={item.location}
              date={item.date}
              image={item.image}
              onPress={() => {
                router.push(`experiences/${item.id}`);
              }}
            />
          )}
        />
      )}
      <Box
        position="absolute"
        zIndex={100}
        bottom={35}
        left={0}
        right={0}
        justifyContent="center"
        alignItems="center"
      >
        <Pressable onPress={() => setShowMap(!showMap)}>
          <Box
            backgroundColor="darkBackground"
            paddingHorizontal="l"
            paddingVertical="s"
            borderRadius="full"
            flexDirection="row"
            alignItems="center"
            gap="s"
          >
            {showMap ? (
              <>
                <Ionicons name="list" size={16} color="#FFF" />
                <Text variant="body" fontSize={11} color="whiteText">
                  {t("seeAsList", "See as list")}
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="map-outline" size={16} color="#FFF" />
                <Text variant="body" fontSize={11} color="whiteText">
                  {t("seeOnMap", "See on map")}
                </Text>
              </>
            )}
          </Box>
        </Pressable>
      </Box>
    </SafeAreaView>
  );
}
