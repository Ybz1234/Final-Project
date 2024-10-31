import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ActivityIndicator, Headline, TextInput } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
import Toast from "react-native-toast-message";
import BackButton from "../components/BackButton";
import PrimaryButton from "../components/PrimaryButton";
import CloseButton from "../components/CloseButton";
const PageDatePicker = ({ route, navigation }) => {
  const cityNameArr = route?.params?.cityNameArr || [];
  const cityArr = cityNameArr.length > 0 ? cityNameArr.slice(1) : [];
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daysArr, setDaysArr] = useState(new Array(cityArr.length).fill(""));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (!route?.params?.cityNameArr) {
      Toast.show({
        type: "info",
        text1: "You Have to choose cities in order to continue",
        text2: "Please return to home page and select cities",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 280,
        bottomOffset: 40,
      });
      navigation.replace("Main", {
        screen: "Home",
      });
    }
  }, [route?.params]);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
    }, [])
  );
  const checkInputs = () => {
    if (!date) {
      Toast.show({
        type: "error",
        text1: "Date Not Selected",
        text2: "Please pick a date before proceeding.",
        position: "top",
        visibilityTime: 3000,
      });
      return false;
    }
    const emptyDurationIndex = daysArr.findIndex(
      (value) => value.trim() === ""
    );
    if (emptyDurationIndex !== -1) {
      Toast.show({
        type: "error",
        text1: "Duration Missing",
        text2: `Please enter the duration for ${
          cityNameArr[emptyDurationIndex + 1]
        }.`,
        position: "top",
        visibilityTime: 3000,
      });
      return false;
    }
    return true;
  };
  const flyMeATravel = async () => {
    const inputsAreValid = checkInputs();
    if (!inputsAreValid) {
      setIsSubmitting(false);
      return;
    }
    setIsLoading(true);
    hadleButtonIsPressed();

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
        setIsLoading(false);
        navigation.replace("Main", {
          screen: "FullTrip",
          params: {
            flightTickets: data.flightTickets,
            userId: "670296627d17e676255dff0f",
            daysArray: daysArr,
            date: date,
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

  const hadleButtonIsPressed = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
    }, 4000);
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
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <BackButton></BackButton>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <DatePicker
            date={date}
            setDate={setDate}
            dateConfirmed={dateConfirmed}
            setDateConfirmed={setDateConfirmed}
          />
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
          <PrimaryButton onPress={flyMeATravel}>
            {buttonPressed ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              "Fly Me A Travel"
            )}
          </PrimaryButton>
        </ScrollView>
      </KeyboardAvoidingView>
      {isKeyboardVisible && (
        <CloseButton
          onPress={() => {
            Keyboard.dismiss();
          }}
        />
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
    height: "100%",
    marginTop: -40,
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

  image: {
    backgroundColor: "white",
    width: "110%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
