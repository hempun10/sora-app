import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      if (!result) {
        Alert.alert("Error", "Failed to create user");
      }
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User created successfully");
      //set user in context
      router.replace("/home");
    } catch (e) {
      //@ts-ignore
      Alert.alert("Error", e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView
      className=" bg-primary h-full"
      style={{
        backgroundColor: "#161622",
      }}
    >
      <ScrollView>
        <View className=" w-full justify-center  min-h-screen px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mx-auto"
          />
          <Text className=" text-2xl text-white text-center font-semibold mt-10">
            Sign up to sora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChange={(value) => setForm({ ...form, username: value })}
            otherStyles="mt-10"
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Already have an account?{" "}
              <Link href={"/sign-in"} className=" text-secondary ml-2">
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
