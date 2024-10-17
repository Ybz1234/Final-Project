import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { Card, Button, Modal, Portal } from "react-native-paper";

const CustomModal = ({
  visible,
  onDismiss,
  data,
  onSelect,
  title,
  labelExtractor,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          {data.map((item, index) => (
            <Card key={index} style={styles.modalCard}>
              <Card.Content>
                <Text>{labelExtractor(item)}</Text>
                <Button
                  mode="contained"
                  style={styles.modalButton}
                  labelStyle={styles.modalButtonLabel}
                  onPress={() => onSelect(item)}
                >
                  Select
                </Button>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalCard: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#1B3E90",
    borderWidth: 1,
  },
  modalButton: {
    backgroundColor: "#1B3E90",
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  modalButtonLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
