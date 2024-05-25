import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Link href="index">Search</Link>
    </SafeAreaView>
  );
};

export default Home;
