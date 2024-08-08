import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";

const Tag = ({ txt, cancel, index }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{index + 1}.</Text>
      <Text style={styles.text}>{txt}</Text>
      <IconButton
        icon="close"
        color="#FF7043"
        size={14}
        onPress={() => {
          cancel(index);
        }}
        style={styles.button}
      />
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    color: "#42A5F5",
    fontSize: 15,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 2,
    marginLeft: 10,
  },
});
