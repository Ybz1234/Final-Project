import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import * as Animatable from "react-native-animatable";
const AnimatedSearchBar = ({
  placeholder = "Type In Destination...",
  placeholderTextColor = "#888",
  onSearch,
  inputStyle,
  containerStyle,
  animationFocused = "pulse",
  animationBlurred = "shake",
  duration = 800,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleChangeText = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleIconPress = () => {
    if (isFocused) {
      setSearchQuery("");
      if (onSearch) {
        onSearch("");
      }
    }
    setIsFocused(!isFocused);
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <Animatable.View
        style={[styles.animatedSearchBarContainer, containerStyle]}
        animation={isFocused ? animationFocused : animationBlurred}
        duration={duration}
      >
        <IconButton
          icon={isFocused ? "close" : "magnify"}
          size={24}
          color="#000"
          style={{ marginLeft: 5 }}
          onPress={handleIconPress}
        />
        <TextInput
          style={[styles.animatedSearchBar, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          onChangeText={handleChangeText}
          value={searchQuery}
        />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  animatedSearchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 35,
    alignSelf: "center",
    paddingHorizontal: 10,
    width: "80%",
    height: 60,
    justifyContent: "center",
  },
  animatedSearchBar: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
export default AnimatedSearchBar;
