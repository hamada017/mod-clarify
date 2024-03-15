import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import react, { useState, useEffect } from "react";

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "360005657651-tp81pl3b5l2ph88idrqgti9o2btkrke9.apps.googleusercontent.com",
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  sign out section
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  // end sign out

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 300, height: 65, marginTop: 300 }}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text style={styles.text}>Welcome, {user.displayName}</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
  },
});




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
              // value={email}
              // onChangeText={(text) => setEmail(text)}
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
              // value={password}
              // onChangeText={(text) => setPassword(text)}
              secureTextEntry
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
            Confirm your Password
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
              // value={password}
              // onChangeText={(text) => setPassword(text)}
              secureTextEntry
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>


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