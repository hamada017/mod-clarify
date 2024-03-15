import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import auth from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Signin");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: "#0782F9",
          width: "60%",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
          }}
        >
          SignOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
