import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CloseButton = ({ onPress, style, iconColor = "#1B3E90" }) => {
  return (
    <TouchableOpacity style={[styles.closeButton, style]} onPress={onPress}>
      <MaterialCommunityIcons name="close" size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: -370,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "relative",
    padding: 5,
    alignSelf: "center",
    shadowColor: "#1B3E90",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default CloseButton;
