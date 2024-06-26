import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getLatestVideos, getVideos } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const { data: videos, isLoading, refetch } = useAppwrite(getVideos);
  const { data: trendingVideos } = useAppwrite(getLatestVideos);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#161622",
        height: "100%",
      }}
    >
      <FlatList
        data={videos ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard videos={item} />;
        }}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4 space-y-6">
            <View className=" justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className=" text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>
              <View className=" mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className=" w-full flex-1 pt-5 pb-8">
              <Text className=" text-gray-100 text-lg font-pregular mb-3">
                Trending Videos
              </Text>
              <Trending trendingVideos={trendingVideos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No videos Found"}
            subtitle={"Be the first one to upload a video"}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
