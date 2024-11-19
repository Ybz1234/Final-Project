import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ onPress, style, labelStyle, ...props }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Button
      labelStyle={[styles.backbuttonLabel, labelStyle]}
      style={[styles.backButton, style]}
      icon="arrow-left-circle"
      onPress={handlePress}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: "10%",
    marginVertical: 40,
    borderRadius: 15,
    backgroundColor: "transparent",
  },
  backbuttonLabel: {
    color: "#8957e5",
    fontSize: 23,
  },
});

export default BackButton;
