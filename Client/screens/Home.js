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
  const onRegionChange = (region) => {
    const AutoCoords = autoLocation(region.latitude, region.longitude, cities2);
    setPosition({ latitude: AutoCoords.lat, longitude: AutoCoords.lng });
  };

  const addMarker = async (e) => {
    const newMarker = e.nativeEvent.coordinate;
    const AutoCoords = autoLocation(
      newMarker.latitude,
      newMarker.longitude,
      cities2
    );
    setMarkers([
      ...markers,
      { latitude: AutoCoords.lat, longitude: AutoCoords.lng },
    ]);
    const name = AutoCoords.name.split(",")[0];
    setCityName(name);
    setCityNameArr((prevArr) => [...prevArr, name]);
  };

  const CleanMarks = () => {
    setMarkers([]);
    setCityNameArr([]);
    setCityName("");
  };

  const calcDis = (pointA, pointB) => {
    return Math.sqrt(
      Math.pow(pointB.lat - pointA.lat, 2) +
        Math.pow(pointB.lng - pointA.lng, 2)
    );
  };

  const autoLocation = (lat, lng, markers) => {
    const customMarker = { lat, lng };
    if (markers.length < 1) {
      return customMarker;
    }
    let minDis = calcDis(markers[0], customMarker);
    let mainMarker = markers[0];
    for (let index = 0; index < markers.length; index++) {
      const calculatedDistance = calcDis(markers[index], customMarker);
      if (calculatedDistance < minDis) {
        minDis = calculatedDistance;
        mainMarker = markers[index];
      }
    }
    return mainMarker;
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
        screen: "DatePicker",
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
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSearchQuery("");
    Keyboard.dismiss();
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

  const envDevDeleteUsersFlightTicket = async () => {
    try {
      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/devEnv/deleteUsersFlightsTickets`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "670296627d17e676255dff0f" }),
        }
      );
      const data = await response.json();
      console.log("FullTripDATA!", data);
    } catch (error) {
      console.log("Error FullTrip", error.message);
    }
  };
  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Headline style={styles.headline}>Choose your destinations</Headline>
        <Button onPress={envDevDeleteUsersFlightTicket}>LALALALAL</Button>
        <TouchableWithoutFeedback onPress={handleBlur}>
          <Animatable.View
            style={styles.animatedSearchBarContainer}
            animation={isFocused ? "pulse" : "shake"}
            duration={800}
          >
            <IconButton
              icon={isFocused ? "close" : "magnify"}
              name="magnify"
              size={24}
              color="#000"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              style={styles.animatedSearchBar}
              placeholder=" Type In Destination..."
              placeholderTextColor="#888"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={onSearch}
              value={searchQuery}
            />
          </Animatable.View>
        </TouchableWithoutFeedback>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          onRegionChangeComplete={onRegionChange}
          onPress={addMarker}
        >
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
          ))}
        </MapView>
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
      <View style={styles.buttonContainerbot}>
        <Button
          mode="elevated"
          style={styles.button2}
          onPress={CleanMarks}
          icon="trash-can"
          labelStyle={styles.buttonLabel}
          iconColor="white"
        >
          Clean
        </Button>
        <Button
          mode="elevated"
          style={styles.button2}
          onPress={handleNextPage}
          icon="airplane-takeoff"
          labelStyle={styles.buttonLabel}
          iconColor="white"
        >
          Fly Me A Travel
        </Button>
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
  map: {
    alignSelf: "center",
    width: "95%",
    height: 390,
    borderRadius: 10,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 4,
    marginVertical: 25,
  },
  button: {
    marginTop: 10,
    width: "30%",
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainerbot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  button2: {
    width: "45%",
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#1B3E90",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonLabel: {
    color: "white",
    fontSize: 17, // Font size
    fontWeight: "bold", // Bold text
    fontFamily: "Roboto-Medium",
  },
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
  },
});

export default Home;
