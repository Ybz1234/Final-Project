import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const PageFrame = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default PageFrame;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    flex: 1,
    backgroundColor: "#151b23",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
