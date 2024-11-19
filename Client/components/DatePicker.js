import React, { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";
import { Portal, Provider, DefaultTheme } from "react-native-paper";
import { TripContext } from "../context/TripContext";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";
registerTranslation("en", en);
const DatePicker = ({ date, setDate }) => {
  const [visible, setVisible] = useState(true);
  const openDatePicker = () => setVisible(true);
  const { tripData, setTripData } = useContext(TripContext);
  const closeDatePicker = () => {
    setVisible(false);
  };
  const onConfirm = (params) => {
    setTripData((prevData) => ({
      ...prevData,
      date: params.date,
    }));
    setDate(params.date);
    closeDatePicker();
  };
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#8957e5",
      accent: "#8957e5",
      surface: "#0d1117",
      background: "#8957e5",
      onSurface: "#8957e5",
      text: "#0d1117",
      placeholder: "#8957e5",
    },
  };
  useEffect(() => {
    if (date === null) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);
  return (
    <Provider theme={theme}>
      <View style={styles.undoContainer}>
        <MaterialCommunityIcons
          name="calendar-refresh"
          size={26}
          style={styles.undoButton}
          color="#2EB8B8"
          onPress={() => {
            openDatePicker();
          }}
        />
      </View>
      <Portal>
        <DatePickerModal
          mode="single"
          visible={visible}
          date={date}
          onConfirm={onConfirm}
          onDismiss={closeDatePicker}
          theme={theme}
          contentStyle={styles.modalContent}
        />
      </Portal>
    </Provider>
  );
};
export default DatePicker;
const styles = StyleSheet.create({
  undoContainer: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#8957e5",
    borderRadius: 15,
    fontFamily: "Roboto-Medium",
    padding: 5,
    right: 167,
    marginVertical: 15,
  },
  undoButton: {
    alignSelf: "left",
    backgroundColor: "#8957e5",
    color: "white",
    shadowColor: "#000",
  },
  undoButtonLabel: {
    fontSize: 23,
  },
});
