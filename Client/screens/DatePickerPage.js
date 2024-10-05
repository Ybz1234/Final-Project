import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import { Image } from "react-native-animatable";
const PageDatePicker = ({ route, navigation }) => {
  const { cityNameArr } = route?.params;

  const cityArr = cityNameArr.slice(1, cityNameArr.length);

  const [date, setDate] = useState(null);
  const [daysArr, setDaysArr] = useState(new Array(cityArr.length).fill(""));
  const flyMeATravel = async () => {
    if (cityNameArr === undefined) {
      return (
        <>
          <Image source={require("../assets/plane.gif")}></Image>
        </>
      );
    }

    console.log(new Date());
    console.log("flyMeATravel!!");
    console.log(cityNameArr);
    console.log(date);
    console.log(daysArr);

    try {
      const response = await axios.post(
        "https://final-project-sqlv.onrender.com/api/FlightTicket/",
        {
          userId: "667e745b85bee8cf5b8c3253",
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
        navigation.navigate("FullTrip", {
          flightTickets: data.flightTickets,
          userId: "667e745b85bee8cf5b8c3253",
          daysArray: daysArr,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDaysChange = (value, index) => {
    const updatedDaysArr = [...daysArr];
    updatedDaysArr[index] = value;
    setDaysArr(updatedDaysArr);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        mode="elevated"
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        Back
      </Button>
      <DatePicker date={date} setDate={setDate} />
      {date &&
        cityArr.map((city, index) => (
          <View key={index} style={styles.cityContainer}>
            <Text style={styles.cityText}>{city}</Text>
            <TextInput
              style={styles.input}
              label="Duration (days)"
              keyboardType="numeric"
              value={daysArr[index]}
              onChangeText={(value) => handleDaysChange(value, index)}
            />
          </View>
        ))}
      <Button mode="elevated" onPress={flyMeATravel} style={styles.button}>
        Fly Me A Travel
      </Button>
    </ScrollView>
  );
};

export default PageDatePicker;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backButton: {
    width: "25%",
    color: "white",
  },
  cityContainer: {
    marginBottom: 20,
  },
  cityText: {
    marginBottom: 8,
    color: "blue",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  button: {
    marginTop: 50,
    marginBottom: 10,

    width: "70%",
    backgroundColor: "white",
    marginHorizontal: "auto",
  },
});
