// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useCallback } from "react";
// import { Google, Home, Signin, SingUp, Googles } from "./Screen";

// const Stack = createNativeStackNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//         {/* account a account */}
//         <Stack.Screen name="Signin" component={Signin} />
//         {/* <Text>bonjour</Text> */}
//         {/* create a account */}
//         <Stack.Screen name="SignUp" component={SingUp} />
//         {/* Home pages */}
//         <Stack.Screen name="Googles" component={Googles} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#blue",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// second app.js

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./Drawer/ProfileScreen"; // Assuming the correct file name
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "./Drawer/Home";
import Result from "./Drawer/Result";
import WebViewScreen from "./Drawer/WebViewScreen";
import { Signin } from "./Screen";

const Drawer = createDrawerNavigator();
export function Stacknav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Sign"
        component={Signin}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={Stacknav}
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="sign in"
          component={Signin}
          options={{
            drawerLabel: "sign in",
            title: "sign",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
