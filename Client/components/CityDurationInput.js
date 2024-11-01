import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline, TextInput } from "react-native-paper";

const CityDurationInput = ({
  city,
  value,
  onChangeText,
  setKeyboardVisible,
}) => {
  return (
    <View style={styles.cityContainer}>
      <Headline style={styles.cityText}>{city}</Headline>
      <TextInput
        style={styles.input}
        label="Duration (days)"
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setKeyboardVisible(true)}
        onBlur={() => setKeyboardVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cityContainer: {
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
  cityText: {
    alignSelf: "flex-start", // Corrected 'left' to 'flex-start'
    marginBottom: 12,
    color: "#1B3E90",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
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
});

export default CityDurationInput;
