import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { Google, Home, Signin, SingUp, Googles } from "./Screen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        {/* account a account */}
        <Stack.Screen name="Signin" component={Signin} />
        {/* <Text>bonjour</Text> */}
        {/* create a account */}
        <Stack.Screen name="SignUp" component={SingUp} />
        {/* Home pages */}
        <Stack.Screen name="Googles" component={Googles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
