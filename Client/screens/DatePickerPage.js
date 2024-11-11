import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import PageFrame from "../components/PageFrame";
import Toast from "react-native-toast-message";
import BackButton from "../components/BackButton";
import PrimaryButton from "../components/PrimaryButton";
import CloseButton from "../components/CloseButton";
import CityDurationInput from "../components/CityDurationInput";
import { useUser } from "../context/UserContext";
import { TripContext } from "../context/TripContext";

const PageDatePicker = ({ route, navigation }) => {
  const { tripData, setTripData } = useContext(TripContext);
  const cityNameArr = route?.params?.cityNameArr || tripData.cityNameArr || [];
  const cityArr = cityNameArr.length > 0 ? cityNameArr.slice(1) : [];
  const [date, setDate] = useState(tripData.date || null);
  const [daysArr, setDaysArr] = useState(
    tripData.daysArr.length > 0
      ? tripData.daysArr
      : new Array(cityArr.length).fill("")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const { user, setUser: setGlobalUser } = useUser();
  const [currentlyIn, setCurrentlyIn] = useState(false);
  // useEffect(() => {
  //   setCurrentlyIn(true);
  //   const globalCityNameArr = tripData.cityNameArr;
  //   const paramCityNameArr = route?.params?.cityNameArr;

  //   if (
  //     (!globalCityNameArr || globalCityNameArr.length === 0) &&
  //     (!paramCityNameArr || (paramCityNameArr.length === 0 && currentlyIn))
  //   ) {
  //     Toast.show({
  //       type: "info",
  //       text1: "You have to choose cities in order to continue",
  //       text2: "Please return to the home page and select cities",
  //       position: "top",
  //       visibilityTime: 4000,
  //       autoHide: true,
  //       topOffset: 280,
  //       bottomOffset: 40,
  //     });
  //     navigation.replace("Main", { screen: "Home" });
  //   } else {
  //     // Update tripData.cityNameArr only if it's empty and params have data
  //     if (
  //       paramCityNameArr &&
  //       paramCityNameArr.length > 0 &&
  //       (!globalCityNameArr || globalCityNameArr.length === 0)
  //     ) {
  //       setTripData((prevData) => ({
  //         ...prevData,
  //         cityNameArr: paramCityNameArr,
  //       }));
  //     }
  //   }
  // }, [route?.params, tripData.cityNameArr]);

  useFocusEffect(
    useCallback(() => {
      const globalCityNameArr = tripData.cityNameArr;
      const paramCityNameArr = route?.params?.cityNameArr;

      if (
        (!globalCityNameArr || globalCityNameArr.length === 0) &&
        (!paramCityNameArr || paramCityNameArr.length === 0)
      ) {
        Toast.show({
          type: "info",
          text1: "You have to choose cities in order to continue",
          text2: "Please return to the home page and select cities",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 280,
          bottomOffset: 40,
        });
        navigation.replace("Main", { screen: "Home" });
      } else {
        // Update tripData.cityNameArr only if it's empty and params have data
        if (
          paramCityNameArr &&
          paramCityNameArr.length > 0 &&
          (!globalCityNameArr || globalCityNameArr.length === 0)
        ) {
          setTripData((prevData) => ({
            ...prevData,
            cityNameArr: paramCityNameArr,
          }));
        }
      }
    }, [route?.params, tripData.cityNameArr])
  );
  const checkInputs = () => {
    if (daysArr.map(Number) === undefined || daysArr.map(Number) == 0) {
      Toast.show({
        type: "error",
        text1: "Go BacK and SELECT CITIES!",
        position: "top",
        visibilityTime: 3000,
      });
      return false;
    }
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
        text1: "One or More Duration Inputs is Missing",
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
      return;
    }
    setIsLoading(true);
    hadleButtonIsPressed();

    try {
      const response = await axios.post(
        "https://final-project-sqlv.onrender.com/api/FlightTicket/",
        {
          userId: user.user._id,
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
        setCurrentlyIn(false);
        setIsLoading(false);
        setTripData((prevData) => ({
          ...prevData,
          date: date,
          daysArr: daysArr,
        }));
        // navigation.replace("Main", {
        //   screen: "Route Info",
        //   params: {
        //     flightTickets: data.flightTickets,
        //     userId: user.user._id,
        //     daysArray: daysArr,
        //     date: date,
        //   },
        // });
        navigation.replace("Main", {
          screen: "Hotels selection",
          params: {
            cityArr: cityArr,
            flightTickets: data.flightTickets,
            userId: user.user._id,
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

  const hadleButtonIsPressed = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
    }, 4000);
  };

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
          <DatePicker date={date} setDate={setDate} />
          {date &&
            cityArr.map((city, index) => (
              <CityDurationInput
                key={index}
                city={city}
                value={daysArr[index]}
                onChangeText={(value) => handleDaysChange(value, index)}
                setKeyboardVisible={setKeyboardVisible}
              />
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
  image: {
    backgroundColor: "white",
    width: "110%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
