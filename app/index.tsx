import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className=" text-4xl">HomePage</Text>
      <Link
        href={"/profile"}
        style={{
          color: "blue",
          textDecorationLine: "underline",
          marginTop: 10,
        }}
      >
        Profile
      </Link>
    </View>
  );
}
