import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

const VerticalSlide = ({
  currentDestination,
  handleAlternativeHotels,
  handleAlternativeAttractions,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={`Destination: ${currentDestination.city}`}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.cardContainer}
        >
          {/* Hotel Card */}
          {currentDestination.hotel && (
            <Card style={styles.verticalCard}>
              <Card.Title title="Hotel" titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text style={styles.cardText}>Name:</Text>
                <Text>{currentDestination.hotel.name}</Text>

                <Text style={styles.cardText}>Address:</Text>
                <Text>{currentDestination.hotel.address.full_address}</Text>
              </Card.Content>
              <Button
                onPress={handleAlternativeHotels}
                style={styles.button2}
                labelStyle={styles.buttonLabel}
              >
                Alternative
              </Button>
            </Card>
          )}

          {/* Attraction Card */}
          {currentDestination.attraction && (
            <Card style={styles.verticalCard}>
              <Card.Title title="Attraction" titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text style={styles.cardText}>Name:</Text>
                <Text>{currentDestination.attraction.name}</Text>
                <Text style={styles.cardText}>Description:</Text>
                <Text>{currentDestination.attraction.description}</Text>
              </Card.Content>
              <Button
                onPress={handleAlternativeAttractions}
                style={styles.button2}
                labelStyle={styles.buttonLabel}
              >
                Alternative
              </Button>
            </Card>
          )}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default VerticalSlide;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#1B3E90",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 490,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#1B3E90",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-BoldItalic",
    textDecorationLine: "underline",
  },
  scrollView: {
    height: 400, // Set a fixed height less than the parent card
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  verticalCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#1B3E90",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#1B3E90",
    marginVertical: 15,
    marginBottom: 5,
    fontFamily: "Roboto-MediumItalic",
  },
  button2: {
    width: "50%",
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
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
    fontSize: 14, // Font size
    fontWeight: "bold", // Bold text
    fontFamily: "Roboto-Medium",
  },
});
