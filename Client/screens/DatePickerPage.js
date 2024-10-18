import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
const PageDatePicker = ({ route, navigation }) => {
  const { cityNameArr } = route?.params;
  const cityArr = cityNameArr.slice(1, cityNameArr.length);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [daysArr, setDaysArr] = useState(new Array(cityArr.length).fill(""));
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
    }, [])
  );

  const flyMeATravel = async () => {
    setIsLoading(true);
    console.log("date picker page request started");
    console.log("new Date", new Date());
    console.log("cityNameArr", cityNameArr);
    console.log("date", date);
    console.log("daysArr", daysArr);

    try {
      const response = await axios.post(
        "https://final-project-sqlv.onrender.com/api/FlightTicket/",
        {
          userId: "670296627d17e676255dff0f",
          airportNameArr: cityNameArr,
          startDate: date,
          daysArr: daysArr.map(Number),
        }
      );
      const data = response.data;

      if (response.status === 200) {
        const flightTicektIds = response.data.flightTickets.map(
          (flightTicekt) => {
            return flightTicekt.insertedId;
          }
        );
        console.log("flightTicektIds", flightTicektIds);
        navigation.navigate("Main", {
          screen: "FullTrip",
          params: {
            flightTickets: data.flightTickets,
            userId: "670296627d17e676255dff0f",
            daysArray: daysArr,
          },
        });
      } else {
        setIsLoading(false);
        console.error("Unexpected response status:", response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error during API request", error);
      console.error(response);
    }
  };
  const handleDaysChange = (value, index) => {
    const updatedDaysArr = [...daysArr];
    updatedDaysArr[index] = value;
    setDaysArr(updatedDaysArr);
  };

  if (isLoading) {
    return (
      <Animatable.View>
        <Animatable.Image
          animation="fadeIn"
          duration={1500}
          style={styles.image}
          source={require("../assets/plane.gif")}
        />
      </Animatable.View>
    );
  }

  return (
    <PageFrame>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <Button
          labelStyle={styles.buttonLabel}
          style={styles.backButton}
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Home",
            })
          }
        >
          Back
        </Button>
        <DatePicker date={date} setDate={setDate} />
        {date &&
          cityArr.map((city, index) => (
            <View key={index} style={styles.cityContainer}>
              <Headline style={styles.cityText}>{city}</Headline>
              <TextInput
                style={styles.input}
                label="Duration (days)"
                keyboardType="numeric"
                value={daysArr[index]}
                onChangeText={(value) => handleDaysChange(value, index)}
              />
            </View>
          ))}
        <Button
          labelStyle={styles.buttonLabel}
          onPress={flyMeATravel}
          style={styles.button2}
        >
          Fly Me A Travel
        </Button>
      </ScrollView>
    </PageFrame>
  );
};

export default PageDatePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 90,

    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  backButton: {
    width: "20%",
    alignSelf: "flex-end",
    paddingVertical: 1,
    borderRadius: 15,
    marginBottom: 1,
    backgroundColor: "#1B3E90",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cityContainer: {
    marginBottom: 20,
    width: "90%", // Slightly reduce width to give a card feel
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center", // Centers the card on the screen
  },
  cityText: {
    alignSelf: "left",
    marginBottom: 12,
    color: "#1B3E90", // Adjust to a nice blue tone
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20, // Increase font size for better visibility
  },
  input: {
    backgroundColor: "#fff",
    width: "100%", // Ensure input takes the full width within the card
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  button2: {
    width: "60%",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 150,
    backgroundColor: "#1B3E90",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonLabel: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  image: {
    backgroundColor: "white",
    width: "110%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
