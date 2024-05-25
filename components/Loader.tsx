import { View, Text } from "react-native";
import React from "react";
import { LoaderProps } from "@/interface";

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <View>
      <Text>Loader</Text>
    </View>
  );
};

export default Loader;
