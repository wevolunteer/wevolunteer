import { ExperienceCard } from "@/components/ExperienceCard";
import Box from "@/components/ui/Box";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/types/data";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const pinBlack = require("@/assets/images/location-pin-black.png");
const pinPink = require("@/assets/images/location-pin-pink.png");

export default function ExporeMapScreen() {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })();
  }, []);

  const { experiences } = useExperiences();

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  function handleMarkerPress(experience: Experience) {
    if (!selectedExperience) {
      bottomSheetModalRef.current?.present();
    }
    setSelectedExperience(experience);
  }

  function handleCloseExperience() {
    if (selectedExperience) {
      bottomSheetModalRef.current?.dismiss();
    }
  }

  return (
    <Box flex={1}>
      <MapView
        initialRegion={{
          latitude: 41.87194,
          longitude: 12.56738,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
        moveOnMarkerPress={false}
        rotateEnabled={false}
        onRegionChange={handleCloseExperience}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {experiences.map((experience) => (
          <Marker
            key={experience.id}
            image={selectedExperience?.id === experience.id ? pinBlack : pinPink}
            coordinate={{
              latitude: experience.latitude,
              longitude: experience.longitude,
            }}
            onSelect={() => handleMarkerPress(experience)}
          />
        ))}
      </MapView>

      <Box
        position="absolute"
        zIndex={100}
        bottom={35}
        left={0}
        right={0}
        justifyContent="center"
        alignItems="center"
      >
        {!selectedExperience && (
          <TouchableOpacity onPress={() => router.back()}>
            <Box
              backgroundColor="darkBackground"
              paddingHorizontal="l"
              paddingVertical="s"
              borderRadius="full"
              flexDirection="row"
              alignItems="center"
              gap="m"
            >
              <Icon name="list" size={28} color="#FFF" />
              <Text variant="body" fontSize={13} color="whiteText">
                {t("seeAsList", "See as list")}
              </Text>
            </Box>
          </TouchableOpacity>
        )}
      </Box>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          enablePanDownToClose={true}
          onDismiss={() => setSelectedExperience(null)}
          enableDynamicSizing={true}
          handleComponent={null}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0)",
          }}
        >
          <BottomSheetView style={{}}>
            <Box width="100%" paddingBottom="l">
              {selectedExperience && (
                <ExperienceCard
                  experience={selectedExperience}
                  onPress={() => {
                    router.push(`experiences/${selectedExperience.id}`);
                  }}
                  onClose={handleCloseExperience}
                />
              )}
            </Box>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Box>
  );
}
