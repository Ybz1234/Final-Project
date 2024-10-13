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
  const [hotelData, setHotelData] = useState(null);
  const [attractionData, setAttractionData] = useState(null);

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
  const handleFullDetails = async (flight, index) => {
    setSelectedFlight(flight);
    setSelectedIndex(index);
    const city = flight.arrivalCity;

    try {
      const hotelResponse = await fetch(
        "https://final-project-sqlv.onrender.com/api/hotels/findHotelsByCity",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city }),
        }
      );
      if (!hotelResponse.ok) {
        console.log("Error:", hotelResponse.data);

        throw new Error(
          `Hotel request failed with status: ${hotelResponse.status}`
        );
      }
      const hotelData = await hotelResponse.json();

      const attractionResponse = await fetch(
        "https://final-project-sqlv.onrender.com/api/attractions/findAttractionsByCity",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city }),
        }
      );

      if (!attractionResponse.ok) {
        throw new Error(
          `Attraction request failed with status: ${attractionResponse.status}`
        );
      }

      const attractionData = await attractionResponse.json();

      // Store the first hotel and attraction
      setHotelData(hotelData.hotel[0]);
      setAttractionData(attractionData.attractions[0]);

      // Show the vertical cards
      setShowVerticalCards(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setShowVerticalCards(true);
  };

  const hadnleFullDetailInformation = () => {
    console.log(
      "need to build a page to handle alternative and come back to this page"
    );
    navigation.navigate("");
  };

  const testHotels = async () => {
    console.log("testHotels");
    try {
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/hotels/findHotelsByCity",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city: "London" }),
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Hotels", data);
    } catch (error) {
      console.error("Error fetching hotels:", error.message);
    }
  };

  const testAttractions = async () => {
    console.log("testAttractions");
    try {
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/attractions/findAttractionsByCity",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city: "London" }),
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Attractions", data);
    } catch (error) {
      console.error("Error fetching attractions:", error.message);
    }
  };

  return (
    <PageFrame>
      <ScrollView>
        {/* <Button onPress={testHotels}>Destination</Button>
        <Button onPress={testAttractions}>Attraction</Button> */}
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
                  title={`${selectedFlight.arrivalCity}: Information`}
                  titleStyle={styles.cardTitle}
                />
                <Card.Content>
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.cardContainer}
                  >
                    {/* Hotel Card */}
                    {hotelData && (
                      <Card style={styles.innerCard}>
                        <Card.Title
                          title="Hotel Information"
                          titleStyle={styles.cardTitle}
                        />
                        <Card.Content>
                          <Text style={styles.cardText}>
                            Name: {hotelData.name}
                          </Text>
                          <Text style={styles.cardText}>
                            Address: {hotelData.address.full_address}
                          </Text>
                        </Card.Content>
                        <Button>Alternative</Button>
                      </Card>
                    )}

                    {/* Attraction Card */}
                    {attractionData && (
                      <Card style={styles.innerCard}>
                        <Card.Title
                          title="Attraction Information "
                          titleStyle={styles.cardTitle}
                        />
                        <Card.Content>
                          <Text style={styles.cardText}>
                            Name: {attractionData.name}
                          </Text>
                          <Text style={styles.cardText}>
                            Description: {attractionData.description}
                          </Text>
                        </Card.Content>

                        <Button>Alternative</Button>
                      </Card>
                    )}
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
  verticalCardsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  verticalCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#1B3E90",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#1B3E90",
    marginBottom: 5,
  },
});
