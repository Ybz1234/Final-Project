import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StyleSheet, View } from "react-native"; // Corrected import
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Button,
  Portal,
  Provider,
  DefaultTheme,
  IconButton,
} from "react-native-paper";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";

registerTranslation("en", en);

const DatePicker = ({ date, setDate, dateConfirmed, setDateConfirmed }) => {
  const [visible, setVisible] = useState(false);
  // const [dateConfirmed, setDateConfirmed] = useState(false);

  const openDatePicker = () => setVisible(true);
  const closeDatePicker = () => setVisible(false);

  const onConfirm = (params) => {
    setDate(params.date);
    setDateConfirmed(true);
    closeDatePicker();
  };

  // Custom theme
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1B3E90",
      accent: "#1B3E90",
      surface: "white",
      background: "white",
      onSurface: "#1B3E90",
      text: "#1B3E90",
      placeholder: "#1B3E90",
    },
  };

  return (
    <Provider theme={theme}>
      {!dateConfirmed ? (
        <Button
          mode="elevated"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={openDatePicker}
        >
          Pick a date
        </Button>
      ) : (
        <View style={styles.undoContainer}>
          <MaterialCommunityIcons
            name="calendar-refresh"
            size={26}
            style={styles.undoButton}
            color="#2EB8B8"
            onPress={() => {
              setDate(null);
              setDateConfirmed(false);
            }}
          />
        </View>
      )}
      <Portal>
        <DatePickerModal
          mode="single"
          visible={visible}
          onDismiss={closeDatePicker}
          date={date}
          onConfirm={onConfirm}
          theme={theme}
          contentStyle={styles.modalContent}
        />
      </Portal>
    </Provider>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 50,
    marginHorizontal: 10,
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
  modalContent: {
    backgroundColor: "white",
  },
  undoContainer: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    fontFamily: "Roboto-Medium",
    padding: 5,
    right: 167,
    marginVertical: 15,
  },
  undoButton: {
    alignSelf: "left",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "lightblue",
    shadowColor: "#000",
  },
  undoButtonLabel: {
    fontSize: 23,
  },
});
