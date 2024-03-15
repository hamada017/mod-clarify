import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Ionicons,
} from "react-native";
import React, { useEffect, useState } from "react";
import "@firebase/auth";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "@firebase/app-compat";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //displaying on the Home page after sing in on my account
  const navigation = useNavigation();
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  //sing in my account with my email id and password
  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      console.log("user");
      // You can redirect or perform additional actions after successful sign-in
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Your Password or Email is incorrect");
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginHorizontal: 2 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
            }}
          >
            Connect Account
          </Text>

          <Text
            style={{
              fontSize: 16,
            }}
          >
            Connect for Take picture!
          </Text>
        </View>

        {/* ==================input name=============== */}

        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email address
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={"black"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        {/* ===================== input password============= */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Confirme your password"
              placeholderTextColor={"black"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              style={{
                width: "100%",
              }}
            />
            {/* <TouchableOpacity
              onPress={() => setIspasswordShow(!setIspasswordShow)}
              Style={{
                position: "absolute",
                right: 12,
              }}
            >
              IspasswordShow == true ? (
              <Ionicons name="eye-off" size={24} color={"black"} />
              ) : (
              <Ionicons name="eye" size={24} color={"black"} />)
            </TouchableOpacity> */}
          </View>
        </View>

        {/* =======================Checkbox condition=================== */}
        <View
          Style={{
            flexDerection: "row",
            marginVertical: 6,
          }}
        >
          <Text>Remember me</Text>
        </View>

        <Button
          title="Sign In"
          filled
          onPress={handleSignIn}
          Style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
        {/* ======================================= */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "grey",
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "grey",
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {/* =====================Connect with facebook============ */}
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: "grey",
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          {/* ==========================Connect with Google============ */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Googles")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: "grey",
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        {/* ================ Have a Account======= */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: "black" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                fontSize: 16,
                color: "primary",
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
