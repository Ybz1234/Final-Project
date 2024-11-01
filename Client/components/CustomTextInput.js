import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { Headline, TextInput } from "react-native-paper";

const CustomTextInput = ({ style, ...props }) => {
  return (
    <View style={styles.container}>
      <Headline style={styles.Text}></Headline>
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  Text: {
    alignSelf: "left",
    marginBottom: 12,
    color: "#1B3E90",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export default CustomTextInput;
