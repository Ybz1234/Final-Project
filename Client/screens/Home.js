import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Button as RNButton,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { cities2 } from "../LatLng/LatLng2";
import PageFrame from "../components/PageFrame";
import Tag from "../components/Tag";
import { Button, Headline } from "react-native-paper";

const Home = ({ navigation }) => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityNameArr, setCityNameArr] = useState([]);
  const userIdd = "667e745b85bee8cf5b8c3253";

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
      Alert.alert("Cannot add same city twice in a row");
      return;
    }
    navigation.navigate("DatePickerPage", { cityNameArr });
  };

  const removeCity = (index) => {
    setCityNameArr((prevArr) => prevArr.filter((_, i) => i !== index));
  };

  const checkNameArr = () => {
    for (let index = 0; index < cityNameArr.length - 1; index++) {
      if (cityNameArr[index] === cityNameArr[index + 1]) {
        return true;
      }
    }
    return false;
  };

  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Headline style={styles.headline}>Choose your destinations</Headline>
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
        <View style={styles.listContainer}>
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
  itemContainer: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
  headline: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    paddingVertical: 1,
    paddingHorizontal: 2,
    textAlign: "center",
    overflow: "hidden",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Roboto-BoldItalic",
  },
  map: {
    width: "100%",
    height: 450,
    borderRadius: 10,
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
    marginBottom: 10,
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
    fontSize: 17,              // Font size
    fontWeight: "bold",        // Bold text
    fontFamily: "Roboto-Medium",
  },
});

export default Home;
