import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Portal, Provider, DefaultTheme } from "react-native-paper";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";
registerTranslation("en", en);

const DatePicker = ({ date, setDate }) => {
  const [visible, setVisible] = useState(false);
  const openDatePicker = () => setVisible(true);
  const closeDatePicker = () => setVisible(false);

  const onConfirm = (params) => {
    setDate(params.date);
    closeDatePicker();
  };

  // Custom theme
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1B3E90", // Changes text color
      accent: "#1B3E90",
      surface: "white", // Changes background color of the modal
      background: "white", // Changes background color of modal content
      onSurface: "#1B3E90", // Changes color of text on the surface
      text: "#1B3E90", // General text color
      placeholder: "#1B3E90", // Placeholder text color
    },
  };

  return (
    <Provider theme={theme}>
      <Button
        mode="elevated"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={openDatePicker}
      >
        Pick a date
      </Button>
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
    backgroundColor: "white", // Sets the background color of the modal content
  },
});
