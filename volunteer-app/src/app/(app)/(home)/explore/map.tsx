import { ActivityCard } from "@/components/ActivityCard";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { useNetwork } from "@/contexts/network";
import { Activity } from "@/types/data";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const pinBlack = require("@/assets/images/location-pin-black.png");
const pinPink = require("@/assets/images/location-pin-pink.png");

export default function ExporeMapScreen() {
  const { t } = useTranslation();
  const { client } = useNetwork();

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

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["experiences"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET("/activities", {
        params: {
          query: {
            page: pageParam,
          },
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => (lastPage?.page_info.page ? lastPage?.page_info.page + 1 : 1),
    initialPageParam: 1,
  });

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activities = useMemo(() => {
    return data?.pages.flatMap((page) => page?.results || []) || [];
  }, [data]);

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
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {activities.map((experience) => (
          <Marker
            key={experience.id}
            image={selectedActivity?.id === experience.id ? pinBlack : pinPink}
            coordinate={{
              latitude: experience.latitude,
              longitude: experience.longitude,
            }}
            onSelect={() => setSelectedActivity(experience)}
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
        {selectedActivity ? (
          <Box width="100%">
            <ActivityCard
              activity={selectedActivity}
              onPress={() => {
                router.push(`experiences/${selectedActivity.id}`);
              }}
              onClose={() => setSelectedActivity(null)}
            />
          </Box>
        ) : (
          <TouchableOpacity onPress={() => router.push("/explore")}>
            <Box
              backgroundColor="darkBackground"
              paddingHorizontal="l"
              paddingVertical="s"
              borderRadius="full"
              flexDirection="row"
              alignItems="center"
              gap="s"
            >
              <>
                <Ionicons name="list" size={16} color="#FFF" />
                <Text variant="body" fontSize={11} color="whiteText">
                  {t("seeAsList", "See as list")}
                </Text>
              </>
            </Box>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
}
