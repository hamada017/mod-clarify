import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,

} from "react-native";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import mime from "react-native-mime-types";
import * as FileSystem from "expo-file-system";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
import { useNavigation } from "@react-navigation/native";

import ProgressAnimation from "./Progress";
import LottieView from "lottie-react-native";



export default function Result({ route }) {
  const navigation = useNavigation();
  const query = route.params.value;
  const path=route.params.uri;
  
 

  const [text, setText] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState(null);// for youtube search
  const [genAI,setGenAI]=useState(null);
  

  const API_KEY = "AIzaSyBkmOMSSmg7JQdcXJelu2R6P6Cd4WhB9sM";

  

  // Define the maximum number of retries

  const searchYouTube = async (query) => {
    const MAX_RETRIES = 3; 
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=AIzaSyACtRKEoQVao0o5Ox4WbDOhRYKHE0wXY2M&q=${query}`
        );
        const data = await response.json();

        let videoIds = [];
        if (data.items) {
          videoIds = data.items.map((item) => item.id.videoId).filter(id => id !== undefined);
        }

        let videoLinks = [];
        if (videoIds.length > 0) {
          videoLinks = videoIds.map(
            (id) => `https://www.youtube.com/watch?v=${id}`
          );
        }

       
        return videoLinks;
      } catch (error) {
        console.log(`Attempt ${retries + 1} failed. Retrying...`);
        retries++;
      }
    }

    throw new Error('Failed to fetch data after maximum retries');
  };

  useEffect(() => {
   const genAI = new GoogleGenerativeAI( API_KEY);
    setGenAI(genAI);
    setIsLoading(true);

    // In your getAsset function:
    async function getAsset() {
      const file = await FileSystem.readAsStringAsync(path.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const mimeType = mime.lookup(path.uri);

      return {
        inlineData: {
          data: file,
          mimeType: mimeType,
        },
      };
    }




    async function run() {
      if (genAI) {
        const model = genAI.getGenerativeModel({
          model: "gemini-pro-vision",
        });

        const image = await getAsset();
        const keywordPrompt =
          "Provide a single keyword or phrase related to this image for YouTube tutorials for further learning";

        let keywordResult, explanationResult;

        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            // Start the keyword and explanation generation in parallel
            [keywordResult, explanationResult] = await Promise.all([
              model.generateContent([keywordPrompt, image]),
              model.generateContent([query, image]),
            ]);

            // If the API calls were successful, break out of the loop
            break;
          } catch (error) {
            // If the API calls failed and this was the third attempt, throw the error
            if (attempt === 2) throw error;
          }
        }

        setIsLoading(false);

        // Get the keyword from the AI's response
        let keyword = '';
        if (keywordResult && keywordResult.response && keywordResult.response.candidates && keywordResult.response.candidates[0] && keywordResult.response.candidates[0].content) {
          keyword = keywordResult.response.candidates[0].content.parts[0].text;
        }
        setKeyword(keyword);

        // Get the explanation from the AI's response
        let explanation = '';
        if (explanationResult && explanationResult.response && explanationResult.response.candidates && explanationResult.response.candidates[0] && explanationResult.response.candidates[0].content) {
          explanation = explanationResult.response.candidates[0].content.parts[0].text;
        }


const regex = /(\*\*[\s\S]*?\*\*)|(```[\s\S]*?```)|(\$\$[\s\S]*?\$\$)|([\s\S]*?(?=(\*\*[\s\S]*?\*\*)|(```[\s\S]*?```)|(\$\$[\s\S]*?\$\$)|$))/g;
const parts = [...explanation.matchAll(regex)].map(match => match[0]);

let renderedParts = [];

parts.forEach((part, index) => {
  if (/^\*\*[\s\S]*\*\*$/.test(part)) {
    const boldText = part.replace(/^\*\*|\*\*$/g, '');
    renderedParts.push({ type: 'bold', content: boldText });
  } else if (/^```[\s\S]*```$/im.test(part)) {
    const code = part.replace(/^```|```$/g, '');
    renderedParts.push({ type: 'code', content: code });
  } else if (/^\$\$[\s\S]*\$\$$/.test(part)) {
    const mathExpression = part.replace(/^\$\$|\$\$$/g, '');
    renderedParts.push({ type: 'math', content: mathExpression });
  } else {
    renderedParts.push({ type: 'text', content: part });
  }
});

const renderedExplanation = renderedParts.map((part, index) => {
  if (part.type === "bold") {
    return (
      <Text key={index} style={{ fontWeight: "bold" }}>
        {part.content}
      </Text>
    );
  } else if (part.type === "code") {
    return (
      <Text key={index} style={{ fontFamily: "monospace", color: "green" }}>
        {part.content}
      </Text>
    );
  } else if (part.type === "math") {
    return <MathView key={index} math={part.content} />;
  } else {
    return <Text key={index}>{part.content}</Text>;
  }
});

const codeBlockContent = renderedExplanation
  .filter((part) => part.type === "code")
  .map((part) => part.content)
  .join("");

const codeBlock = (
  <View
    style={{
    
     
    }}
    contentContainerStyle={{ flexGrow: 1 }}>
    <Text style={{ fontFamily: "monospace", color: "green", fontSize: 14 }}>
      {codeBlockContent}
    </Text>
  </View>
);




setText([codeBlock, ...renderedExplanation.filter(part => part.type !== 'code')]);

       






      }
    }
    run()},[])

  useEffect(() => {
    if (keyword) {
      searchYouTube(keyword).then((links) => {
        setYoutubeLinks(links);
      });
    }
  },[keyword])

  const renderItem = ({ item: link, index }) => {
    const videoId = link.split("=")[1];
    return (
      <TouchableOpacity
        key={index}
        style={{
          marginBottom: 20,
          borderRadius: 10,
          overflow: "hidden",
        }}
        onPress={() => {
          navigation.navigate("WebViewScreen", { videoId });
        }}
      >
        <Image
          source={{ uri: `https://img.youtube.com/vi/${videoId}/0.jpg` }}
          style={{ height: 200 }}
        />
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <View>
      <Text style={styles.content}>{text}</Text>
      {youtubeLinks && youtubeLinks.length > 0 && (
        <Text
          
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            color: "white",
          }}>
          Here are some suggested tutorials:
        </Text>
      )}
    </View>
  );
  return (
    <View style={styles.container}>
      {isLoading && (
        <View>
        <LottieView
            source={require("../assets/scan.json")}
            autoPlay
            loop
            style={{
              width: 100,
              height: 100,

              justifyContent: "center",
              alignItems: "center",

              alignSelf: "center",
            }}
          />
          <LottieView
            source={require("../assets/robot.json")}
            autoPlay
            loop
            style={{
              width: 350,
              height: 350,

              justifyContent: "center",
              alignItems: "center",

              alignSelf: "center",
            }}
          />
          

          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            Generating your results...
          </Text>
        </View>
      )}

      <FlatList
        data={youtubeLinks}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString()}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#343541",
    color:"white",
  },
  content: {
    fontSize: 17,
    marginBottom: 20,
    color:"white",
    
    textAlign: "justify",
    
    fontFamily: "Roboto",
  },
});