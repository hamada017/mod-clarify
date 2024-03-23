import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";


export default function ProgressAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a task that takes 5 seconds to complete
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prevProgress + 0.01;
      });
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <Progress.Circle
        size={100}
        progress={progress}
        showsText={true}
        thickness={10}
        color={"green"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
