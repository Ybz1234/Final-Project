import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Portal, Provider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

const DatePicker = ({ date, setDate }) => {
  const [visible, setVisible] = useState(false);
  const openDatePicker = () => setVisible(true);
  const closeDatePicker = () => setVisible(false);

  const onConfirm = (params) => {
    setDate(params.date);
    console.log(date);

    closeDatePicker();
  };
  return (
    <Provider>
      <Button mode="elevated" style={styles.button} onPress={openDatePicker}>
        Pick a date
      </Button>
      <Portal>
        <DatePickerModal
          mode="single"
          visible={visible}
          onDismiss={closeDatePicker}
          date={date}
          onConfirm={onConfirm}
          locale={"en"} // optional
        />
      </Portal>
    </Provider>
  );
};

export default DatePicker;
const styles = StyleSheet.create({
  button: {
    marginTop: 70,
    width: "50%",
    alignSelf: "center",
  },
});
