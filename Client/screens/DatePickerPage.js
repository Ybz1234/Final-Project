import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
const PageDatePicker = ({ route, navigation }) => {
  const { cityNameArr } = route?.params;
  const cityArr = cityNameArr.slice(1, cityNameArr.length);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daysArr, setDaysArr] = useState(new Array(cityArr.length).fill(""));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
        setIsLoading(false);
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
  const toggleIsLoading = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  };
  if (!isLoading) {
    toggleIsLoading();
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
        keyboardShouldPersistTaps="handled"
      >
        <Button
          labelStyle={styles.backbuttonLabel}
          style={styles.backButton}
          icon="arrow-left-circle"
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Home",
            })
          }
        ></Button>

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
                onFocus={() => setKeyboardVisible(true)}
                onBlur={() => setKeyboardVisible(false)}
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
      {isKeyboardVisible && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <MaterialCommunityIcons name="close" size={24} color="#1B3E90" />
        </TouchableOpacity>
      )}
    </PageFrame>
  );
};

export default PageDatePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  backButton: {
    width: "10%",
    borderRadius: 15,
    top: 10,
    left: -175,
    // backgroundColor: "#1B3E90",
  },
  cityContainer: {
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center",
  },
  cityText: {
    alignSelf: "left",
    marginBottom: 12,
    color: "#1B3E90",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
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
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    fontFamily: "Roboto-Medium",
  },
  backbuttonLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 23,
  },
  image: {
    backgroundColor: "white",
    width: "110%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: -320,
    zIndex: 99,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
