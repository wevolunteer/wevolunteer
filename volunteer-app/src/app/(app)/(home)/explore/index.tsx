import { ActivityCard } from "@/components/ActivityCard";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { useNetwork } from "@/contexts/network";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ExporeListScreen() {
  const { t } = useTranslation();
  const { client } = useNetwork();

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

  const activities = useMemo(() => {
    return data?.pages.flatMap((page) => page?.results || []) || [];
  }, [data]);

  console.log(activities);
  return (
    <Box flex={1}>
      <FlatList
        data={activities || []}
        keyExtractor={(item) => `a-${item.id}`}
        onEndReached={() => fetchNextPage()}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => {
              router.push(`experiences/${item.id}`);
            }}
          />
        )}
      />
      <Box
        position="absolute"
        zIndex={100}
        bottom={35}
        left={0}
        right={0}
        justifyContent="center"
        alignItems="center"
      >
        <TouchableOpacity onPress={() => router.push("/explore/map")}>
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
              <Ionicons name="map-outline" size={16} color="#FFF" />
              <Text variant="body" fontSize={11} color="whiteText">
                {t("seeOnMap", "See on map")}
              </Text>
            </>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
