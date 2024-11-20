import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { cities2 } from "../LatLng/LatLng2";
const CustomMap = ({ markers, setMarkers, setCityNameArr, style }) => {
  const [position, setPosition] = useState(null);
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
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { latitude: AutoCoords.lat, longitude: AutoCoords.lng },
    ]);
    const name = AutoCoords.name.split(",")[0];
    setCityNameArr((prevArr) => [...prevArr, name]);
  };

  return (
    <MapView
      style={[styles.map, style]}
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
  );
};

const styles = StyleSheet.create({
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
});

export default CustomMap;
