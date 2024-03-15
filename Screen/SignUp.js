import "expo-dev-client";
import React, { useState, useEffect } from "react";

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
  Ionicons,
} from "react-native";
import "@react-native-firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import Signin from "./Signin";

// google
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Googles from "./Googles";
import Home from "./Home";

const SingUp = () => {
  // connect with google
  WebBrowser.maybeCompleteAuthSession();

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "360005657651-dvncntc2k0ef2deu0um9rlmin9s76ec4.apps.googleusercontent.com",
    androidClientId:
      "360005657651-0oeq6lra4hq8f36ml3mn7rsnuougta5i.apps.googleusercontent.com",
  });

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log(id_token);
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://wwww.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: "Bearer ${accessToken}" },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
          <Text>{user.name}</Text>
        </View>
      );
    }
  };

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

  //================== create account with email==================================
  const handleSignup = async () => {
    // Vérifier si l'adresse e-mail est valide
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Vérifier si le mot de passe respecte les exigences (par exemple, une longueur minimale)
    if (!password || password.length < 8) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Vérifier si l'email est fonctionnel
    const isEmailFunctional = await checkIfEmailIsFunctional(email);
    if (!isEmailFunctional) {
      alert("L'adresse e-mail fournie n'est pas fonctionnelle.");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  // Fonction pour vérifier si l'email est fonctionnel
  // const checkIfEmailIsFunctional = async (email) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.zerobounce.net/v2/validate?api_key=56375a17745c418d97cdab28ade04c2e&email=${encodeURIComponent(
  //         email
  //       )}`
  //     );
  //     const data = await response.json();
  //     return data.status === "valid";
  //   } catch (error) {
  //     console.error("Erreur lors de la vérification de l'e-mail :", error);
  //     console.log(error);
  //     return false;
  //   }
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ===============================================//

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
              placeholderTextColor={"black"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              style={{
                width: "100%",
              }}
            />
            {/* <TouchableOpacity
                          onPress={()=>setIspasswordShow(!setIspasswordShow)}
                          Style={{
                              position: "absolute",
                              right: 12,
                          }}>
                              IspasswordShow == true ? (
                                 <Ionicons name="eye-off" size={24} color={"black"}/>
                              ) : (
                                  <Ionicons name="eye" size={24} color={"black"}/>
                              )
                            
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
          title="Sign up"
          filled
          onPress={handleSignup}
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
            disabled={!request}
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
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text
              style={{
                fontSize: 16,
                //   color: "primary",
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Sing in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
