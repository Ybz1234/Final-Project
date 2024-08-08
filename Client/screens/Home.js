import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";
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
    // console.log(markers);
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

    navigation.navigate("DatePicker", { cityNameArr });
  };
  const removeCity = (index) => {
    setCityNameArr((prevArr) => prevArr.filter((_, i) => i !== index));
    //? prevArr.filter((_, i) => i !== index): This part filters the prevArr array. The filter method creates a new array that includes only the elements for which the provided function returns true.
    //? (_, i): These are the parameters for the function passed to filter. The underscore _ represents the current element (which we don't need in this case), and i represents the
  };
  const checkNameArr = () => {
    for (let index = 0; index < cityNameArr.length - 1; index++) {
      if (cityNameArr[index] === cityNameArr[index + 1]) {
        return true;
      }
      return false;
    }
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
          showsBuildings={true}
          style={styles.map}
          onRegionChange={onRegionChange}
          initialRegion={{
            latitude: 48.2082,
            longitude: 16.3738,
            latitudeDelta: 12.1922,
            longitudeDelta: 0.0421,
          }}
          onPress={addMarker}
        >
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button onPress={CleanMarks}>Reset</Button>
          <Button
            style={styles.button}
            onPress={() => {
              handleNextPage();
            }}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </PageFrame>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
  },
  listContainer: {
    width: "90%",
    marginVertical: 20,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 15,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#42A5F5",
    color: "#FFF",
  },
});
