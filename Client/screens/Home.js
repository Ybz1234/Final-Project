import {
  StyleSheet,
  View,
  ScrollView,
  Button as RNButton,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, Headline, IconButton } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
import Tag from "../components/Tag";
import Toast from "react-native-toast-message";
import { cities2 } from "../LatLng/LatLng2";
import PrimaryButton from "../components/PrimaryButton";
import AnimatedSearchBar from "../components/AnimatedSearchBar";
import CustomMap from "../components/CustomMap";

const Home = ({ navigation, route }) => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityNameArr, setCityNameArr] = useState([]);
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recentlyLoggedOut, setRecentlyLoggedOut] = useState(false);

  const userIdd = "667e745b85bee8cf5b8c3253";
  useEffect(() => {
    // Check if the user recently logged out
    if (route.params?.recentlyLoggedOut) {
      setRecentlyLoggedOut(true);
    }
  }, [route.params]);

  const CleanMarks = () => {
    setMarkers([]);
    setCityNameArr([]);
    setCityName("");
  };

  const handleNextPage = () => {
    if (checkNameArr()) {
      Toast.show({ type: "error", text1: "Cannot add same city twice" });
      return;
    }
    if (cityNameArr.length < 1) {
      Toast.show({
        type: "error",
        text1: "Please choose at least 1 destination",
      });
      return;
    }
    console.log("cityNameArr from handleNextPage", cityNameArr);
    setRecentlyLoggedOut(false);
    setTimeout(() => {
      navigation.navigate("Main", {
        screen: "Date Picker",
        params: { cityNameArr },
        setRecentlyLoggedOut: false,
      });
    }, 500);
  };

  const removeCity = (index) => {
    setCityNameArr((prevArr) => prevArr.filter((_, i) => i !== index));
    setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index));
    console.log("cityNameArr from remove city", cityNameArr);
  };

  const checkNameArr = () => {
    for (let index = 0; index < cityNameArr.length - 1; index++) {
      if (cityNameArr[index] === cityNameArr[index + 1]) {
        return true;
      }
    }
    return false;
  };
  const onSearch = (query) => {
    setSearchQuery(query);
    if (query && query.trim() !== "") {
      const searchInput = query.trim().toLowerCase();
      const city = cities2.find((c) => {
        const cityName = c.name.split(",")[0].trim().toLowerCase();
        console.log("on search finding city name", cityName);
        return cityName === searchInput;
      });
      if (city) {
        const cityName = city.name.split(",")[0].trim();
        if (!cityNameArr.includes(cityName)) {
          setCityNameArr((prevArr) => [...prevArr, cityName]);
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            { latitude: city.lat, longitude: city.lng },
          ]);
        }
        console.log("cityNameArr from onSearch", cityNameArr);
      } else {
        // setTimeout(() => {
        //   Toast.show({
        //     type: "info",
        //     text1: "no city in the name of",
        //     text2: query,
        //     visibilityTime: 2000,
        //     position: "top",
        //     autoHide: true,
        //     bottomOffset: 50,
        //   });
        // }, 3500);
      }
    }
  };

  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Headline style={styles.headline}>Choose your destinations</Headline>
        <AnimatedSearchBar onSearch={onSearch} />
        <CustomMap
          markers={markers}
          setMarkers={setMarkers}
          cityNameArr={cityNameArr}
          setCityNameArr={setCityNameArr}
        />
        <View>
          <View style={styles.list}>
            {cityNameArr.map((item, index) => (
              <View key={index} style={styles.item}>
                <Tag index={index} txt={item} cancel={removeCity} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={CleanMarks} icon="trash-can">
          Clean
        </PrimaryButton>
        <PrimaryButton onPress={handleNextPage} icon="airplane-takeoff">
          Fly Me A Travel
        </PrimaryButton>
      </View>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  headline: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    paddingVertical: 1,
    paddingHorizontal: 2,
    textAlign: "center",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textTransform: "uppercase",
    fontFamily: "Roboto-BoldItalic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});

export default Home;
