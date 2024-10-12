import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CardsSlide from "../components/CardsSlide";
import PageFrame from "../components/PageFrame";
import { Card, Button } from "react-native-paper";

const FullTrip = ({ route, navigation }) => {
  const { daysArray } = route.params;
  const [detailedFlightTickets, setDetailedFlightTickets] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showVerticalCards, setShowVerticalCards] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchFlightDetails();
  }, []);
  const fetchFlightDetails = async () => {
    try {
      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/FlightTicket/userUpToDateFlightTickets`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "670296627d17e676255dff0f" }),
        }
      );

      if (!response.ok) {
        console.log("Error:", response.data);
        return;
      }

      const data = await response.json();
      //console.log("FullTripDATA!", data);
      setDetailedFlightTickets(data.flightTickets);
      setIsDataFetched(true);
    } catch (error) {
      console.log("Error FullTrip", error.message);
    }
  };

  const handleDestination = () => {
    navigation.navigate("FullDestiantion");
  };

  const envDevDeleteUsersFlightTicket = async () => {
    try {
      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/devEnv/deleteUsersFlightsTickets`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "670296627d17e676255dff0f" }),
        }
      );
      const data = await response.json();
      console.log("FullTripDATA!", data);
    } catch (error) {
      console.log("Error FullTrip", error.message);
    }
  };
  const handleFullDetails = (flight, index) => {
    setSelectedFlight(flight);
    setSelectedIndex(index);
    setShowVerticalCards(true);
  };

  const hadnleFullDetailInformation = () => {
    console.log(
      "need to build a page to handle alternative and come back to this page"
    );
    navigation.navigate("");
  };
  return (
    <PageFrame>
      <ScrollView>
        {/* <Button title="Activate Card" onPress={fetchFlightDetails} /> */}
        <Button onPress={envDevDeleteUsersFlightTicket}>
          "Delete user's flight ticket
        </Button>
        {isDataFetched && detailedFlightTickets.length > 0 ? (
          <>
            <CardsSlide
              flightTickets={detailedFlightTickets}
              daysArray={daysArray}
              onFullDetails={handleFullDetails}
            />

            {showVerticalCards && (
              <Card style={styles.card}>
                <Card.Title
                  title="Detailed Information"
                  titleStyle={styles.cardTitle}
                />
                <Card.Content>
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.cardContainer}
                  >
                    {detailedFlightTickets.map((flight, index) => (
                      <Card key={index} style={styles.innerCard}>
                        <Card.Content>
                          <Text>Index: {selectedIndex}</Text>
                          <Text>City Name: {selectedFlight.arrivalCity}</Text>
                          <Button
                            onPress={() => hadnleFullDetailInformation()}
                            style={styles.button2}
                            labelStyle={styles.buttonLabel}
                          >
                            Alternative
                          </Button>
                        </Card.Content>
                      </Card>
                    ))}
                  </ScrollView>
                </Card.Content>
              </Card>
            )}
          </>
        ) : (
          <></>
        )}
      </ScrollView>
      <View style={styles.buttonContainerbot}>
        <Button
          title="Confirm Booking"
          style={styles.button2}
          icon="check-circle"
          labelStyle={styles.buttonLabel}
          iconColor="white"
          onPress={handleDestination}
        >
          Confirm Booking
        </Button>
      </View>
    </PageFrame>
  );
};

export default FullTrip;

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
  scrollView: {
    height: 400, // Set a fixed height less than the parent card
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  innerCard: {
    fontFamily: "Roboto-MediumItalic",
    height: 150, // Adjust height to fit within the ScrollView
    width: "100%", // Ensure the card fits within the parent width
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10, // Add spacing between cards
  },
  image: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    borderRadius: 1000,
    marginBottom: 24,
  },
  buttonContainerbot: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: "100%",
  },
  button2: {
    width: "50%",
    paddingVertical: 8,
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
    fontSize: 16, // Font size
    fontWeight: "bold", // Bold text
    fontFamily: "Roboto-Medium",
  },
});
