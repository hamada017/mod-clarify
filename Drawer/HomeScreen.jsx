

import {
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
  
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { Camera } from 'expo-camera';
  import * as ImagePicker from 'expo-image-picker';
  import { useNavigation } from "@react-navigation/native";
  import { LinearGradient } from "expo-linear-gradient";
  import * as FileSystem from 'expo-file-system';
  
  
  
  
  export default function Home() {
    //variable  initialisations
    const navigation = useNavigation();
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [selectedImage, setSelectedImage] = useState(
      
    );
    const [inputvalue,setInputValue]=useState('');
    const isSelected = selectedImage ? false : true;
   
      
     
  
    useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraStatus.status === "granted");
  
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(galleryStatus.status === "granted");
      })();
    }, []);
    if (!cameraPermission || !galleryPermission) {
      return (
        <View style={styles.container}>
          <Text>
            You need to enable permissions for the camera and gallery to use this
            app.
          </Text>
        </View>
      );
    }
  
    const takePicture = async () => {
      if (cameraPermission) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.9,
        });
  
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          console.log('URI:', uri); // Log the URI
  
          // Check if the file exists
          const fileInfo = await FileSystem.getInfoAsync(uri);
          if (fileInfo.exists) {
            setSelectedImage({ uri });
          } else {
            console.log('File does not exist');
          }
        }
      }
    };
  
    const pickImage = async () => {
      if (galleryPermission) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 0.9,
        });
  
        if (!result.canceled) {
          setSelectedImage({ uri: result.assets[0].uri }); 
        }
      }
    };
  
    
   
  
  
  
  
  //using navigation
  
  
  
  
  
  
    return (
      <View>
        <LinearGradient
          colors={["#293241", "#004e92", "#3949ab"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}>
          <KeyboardAwareScrollView contentContainerStyle={styles.container}
         
          >
            <View style={styles.top}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}></Image>
              {selectedImage && (
                <View style={styles.imageContainer}>
                  <Image
                    source={selectedImage}
                    style={styles.image}
                    resizeMode='contain'></Image>
                </View>
              )}
              <View style={styles.iconContainer}>
                <Ionicons
                  name='camera'
                  size={54}
                  color='white'
                  onPress={takePicture}
                />
                <Ionicons
                  name='image'
                  size={54}
                  color='white'
                  onPress={pickImage}
                />
              </View>
            </View>
  
            <View style={styles.bottom}>
              <TextInput
                style={styles.input}
                placeholder='Enter text'
                onChangeText={setInputValue}
                value={inputvalue}
              />
  
              <TouchableOpacity
                style={styles.submit}
                disabled={isSelected}
                onPress={() => {
                  console.log(selectedImage);
  
                  navigation.navigate("Result", {
                    value: inputvalue,
                    uri: selectedImage,
                  });
                }}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
          </KeyboardAwareScrollView>
        </LinearGradient>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
  
      margin: 0,
      padding: 0,
      //giving visiblity value for background color  using RGB
    },
    top: {
      width: "100%",
      height: "90%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      width: 300,
      height: 400,
      //add border shadow effect like floating
      shadowColor: "black",
  
      shadowOpacity: 1,
      elevation: 10,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
    },
    image: {
      width: "100%",
      height: "100%",
      flex: 1,
      borderRadius: 20,
    },
    bottom: {
      width: "100%",
      height: "10%",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      paddingBottom: 10,
  
      gap: 5,
    },
    input: {
      flexGrow: 1,
      width: "70%",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      //beautiful input field
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: "white",
      borderBottomLeftRadius: 20,
      fontWeight:"100",
      shadowColor: "black",
      color: "black",
  
      //futuristic fontFamily
      fontFamily: "Roboto",
      shadowOpacity: 1,
      elevation: 10,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
    },
    submit: {
      width: '20%', // adjust as needed
      height: 40,
      backgroundColor: "#4A90E2",
      justifyContent: 'center', // center the text vertically
      alignItems: 'center', // center the text horizontally
      borderColor: "transparent",
      borderRadius: 5,
      
      alignSelf: 'center', // center the button horizontally
    },
    submitText: {
      color: 'white',
      fontWeight: "bold",
      fontSize: 16,
    },
    iconContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
      paddingHorizontal: 50,
      marginTop: 20,
    },
    logo: {
      width: 100,
      height: 100,
    },
  });
  