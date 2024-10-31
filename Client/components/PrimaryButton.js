import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const PrimaryButton = ({
  onPress,
  icon,
  children,
  style,
  labelStyle,
  iconColor = "white",
  mode = "elevated",
  backgroundColor = "#1B3E90",
  ...props
}) => {
  return (
    <Button
      mode={mode}
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      icon={icon}
      labelStyle={[styles.buttonLabel, labelStyle]}
      iconColor={iconColor}
      {...props}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "45%",
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonLabel: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
});

export default PrimaryButton;
