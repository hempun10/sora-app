import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView
      className=" bg-primary h-full"
      style={{
        backgroundColor: "#161622",
      }}
    >
      <ScrollView>
        <View className=" w-full justify-center  min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mx-auto"
          />
          <Text className=" text-2xl text-white text-center font-semibold mt-10">
            Login to your account
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(value) => setForm({ ...form, email: value })}
            keyboardType="email-address"
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Don't have an account?{" "}
              <Link href={"/sign-up"} className=" text-secondary ml-2">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
