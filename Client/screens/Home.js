import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Headline } from "react-native-paper";
import PageFrame from "../components/PageFrame";
import Tag from "../components/Tag";
import Toast from "react-native-toast-message";
import { cities2 } from "../LatLng/LatLng2";
import PrimaryButton from "../components/PrimaryButton";
import AnimatedSearchBar from "../components/AnimatedSearchBar";
import CustomMap from "../components/CustomMap";
import { TripContext } from "../context/TripContext";
import SumCard from "../components/SumCard";

const Home = ({ navigation, route }) => {
  const [markers, setMarkers] = useState([]);
  const { tripData, setTripData } = useContext(TripContext);
  const [cityName, setCityName] = useState("");
  const [cityNameArr, setCityNameArr] = useState(
    tripData.cityNameArr.length > 0 ? tripData.cityNameArr : []
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recentlyLoggedOut, setRecentlyLoggedOut] = useState(false);
  const { resetTripData } = useContext(TripContext);

  useEffect(() => {
    if (tripData.cityNameArr && tripData.cityNameArr.length > 0) {
      setRecentlyLoggedOut(true);
      setCityNameArr(tripData.cityNameArr);
      updateMarkersFromCityNames(tripData.cityNameArr);
    }
  }, [tripData.cityNameArr]);

  useEffect(() => {
    updateMarkersFromCityNames(cityNameArr);
  }, [cityNameArr]);

  const CleanMarks = () => {
    setMarkers([]);
    setCityNameArr([]);
    setCityName("");
    resetTripData();
  };

  const updateMarkersFromCityNames = (cityNames) => {
    const newMarkers = cityNames
      .map((cityName) => {
        const city = cities2.find((c) => {
          const name = c.name.split(",")[0].trim();
          return name === cityName;
        });
        if (city) {
          return { latitude: city.lat, longitude: city.lng };
        } else {
          return null;
        }
      })
      .filter((marker) => marker !== null);
    setMarkers(newMarkers);
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
    setTripData((prevData) => ({
      ...prevData,
      cityNameArr: cityNameArr,
    }));
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
        }
        console.log("cityNameArr from onSearch", cityNameArr);
      }
    }
  };
  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SumCard title="       Pin - Point Your Destinations       " iconType="map-marker" />
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
        <PrimaryButton onPress={CleanMarks}>Clean</PrimaryButton>
        <PrimaryButton onPress={handleNextPage}>Continue</PrimaryButton>
      </View>
    </PageFrame>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20, // Adjust padding top here
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
