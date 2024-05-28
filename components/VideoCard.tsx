import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Models } from "react-native-appwrite";
import { icons, images } from "@/constants";

const VideoCard = ({ videos }: { videos: Models.Document }) => {
  const [play, setPlay] = useState(false);
  console.log("Videos", videos);

  return (
    <View className=" flex-col items-center px-4 mb-14">
      <View className=" flex-row gap-3 items-start">
        <View className=" justify-center items-center flex-row flex-1">
          <View className=" w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: videos?.users?.avatar }}
              resizeMode="cover"
              className=" w-full h-full rounded-lg"
            />
          </View>
          <View className=" justify-center flex-1 ml-3 gap-y-1">
            <Text
              className=" text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {videos?.title}
            </Text>
            <Text
              className=" text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {videos?.users?.username}
            </Text>
          </View>
          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className=" w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: videos?.thubminal }}
            resizeMode="cover"
            className=" w-full h-full rounded-xl mt-3"
          />
          <Image
            source={icons.play}
            className="w-14 h-14 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
