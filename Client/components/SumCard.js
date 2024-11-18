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
            default:
                return "question";
        }
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
            <IconButton
                icon={getIcon()}
                size={30}
                style={{
                    backgroundColor: "#1B3E90",
                    borderRadius: 50,
                    padding: 10,
                }}
                iconColor="white"
                onPress={() => {}}
            />
        </View>
    );
};

export default SumCard;