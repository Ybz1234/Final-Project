import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

const SumCard = ({ title, iconType }) => {
  const getIcon = () => {
    switch (iconType) {
      case "flight":
        return "airplane";
      case "hotel":
        return "city";
      case "attraction":
        return "ferris-wheel";
      case "map-marker":
        return "map-marker";
      case "calendar":
        return "calendar";
      default:
        return "question";
    }
  };

  return (
    <View
      style={{
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#f1e8ff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#8957e5",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <IconButton
          icon={getIcon()}
          size={24}
          iconColor="#FFF"
          style={{
            margin: 0,
          }}
        />
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#8957e5" }}>
        {title}
      </Text>
    </View>
  );
};

export default SumCard;
