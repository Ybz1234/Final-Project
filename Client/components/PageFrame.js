import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const PageFrame = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default PageFrame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29A3A3",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
