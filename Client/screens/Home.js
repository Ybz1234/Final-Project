import { StyleSheet, Text, View, ScrollView, Alert, Button as RNButton } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { cities2 } from "../LatLng/LatLng2";
import PageFrame from "../components/PageFrame";
import Tag from "../components/Tag";

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
    const AutoCoords = autoLocation(newMarker.latitude, newMarker.longitude, cities2);
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

  const handleSignOut = () => {
    // Clear user data or perform sign-out actions
    Alert.alert("Signed out");
    navigation.navigate("SignUp");
  };

  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose your destinations</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            {cityNameArr.map((item, index) => (
              <View key={index} style={styles.item}>
                <Tag index={index} txt={item} cancel={removeCity} />
              </View>
            ))}
          </View>
        </View>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          onRegionChangeComplete={onRegionChange}
          onPress={addMarker}
          style={styles.map}
        >
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <RNButton title="Clean" onPress={CleanMarks} />
          <RNButton title="Continue" onPress={handleNextPage} />
          <RNButton title="Sign Out" onPress={handleSignOut} />
        </View>
      </ScrollView>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  map: {
    width: "100%",
    height: 400,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    padding: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Home;
