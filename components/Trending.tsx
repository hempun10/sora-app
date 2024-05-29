import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: Models.Document;
}) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className=" mr-5"
      //@ts-ignore
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className=" relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item?.thubminal }}
            className=" w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-14 h-14 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({
  trendingVideos,
}: {
  trendingVideos: Models.Document[];
}) => {
  const [activeItem, setActiveItem] = useState(trendingVideos[0]?.$id);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Models.Document>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={trendingVideos}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item }) => {
        return <TrendingItem activeItem={activeItem} item={item} />;
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
        // y: 0,
      }}
      horizontal
    />
  );
};

export default Trending;
