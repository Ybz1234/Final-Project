import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import PageFrame from "../components/PageFrame";
import { Button } from "react-native-paper";
import CardsSlide from "../components/CardsSlide";
import VerticalSlide from "../components/VerticalSlide";
import CustomModal from "../components/CustomModal";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";

const FullTrip = ({ route, navigation }) => {
  const { daysArray } = route.params;
  const [detailedFlightTickets, setDetailedFlightTickets] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showVerticalCards, setShowVerticalCards] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [hotelModalVisible, setHotelModalVisible] = useState(false);
  const [attractionModalVisible, setAttractionModalVisible] = useState(false);
  const [alternativeHotels, setAlternativeHotels] = useState([]);
  const [alternativeAttractions, setAlternativeAttractions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
      fetchFlightDetails();
    }, [])
  );

  useEffect(() => {
    fetchFlightDetails();
  }, []);

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
  const fetchFlightDetails = async () => {
    try {
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/FlightTicket/userUpToDateFlightTickets",
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
      setDetailedFlightTickets(data.flightTickets);
      setIsDataFetched(true);

      const initialDestinations = data.flightTickets.map((flight) => ({
        city: flight.arrivalCity,
        flight: flight,
        hotel: null,
        attraction: null,
      }));
      setDestinations(initialDestinations);
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
      const hotelDataJson = await hotelResponse.json();

      // Fetch attraction data
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

      const attractionDataJson = await attractionResponse.json();

      // Update destinations array
      setDestinations((prevDestinations) => {
        const updatedDestinations = [...prevDestinations];
        updatedDestinations[index] = {
          ...updatedDestinations[index],
          hotel: hotelDataJson.hotel[0],
          attraction: attractionDataJson.attractions[0],
        };
        return updatedDestinations;
      });

      // Show the vertical cards
      setShowVerticalCards(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const selectHotelAlternative = (hotel) => {
    setHotelModalVisible(false);
    setDestinations((prevDestinations) => {
      const updatedDestinations = [...prevDestinations];
      updatedDestinations[selectedIndex] = {
        ...updatedDestinations[selectedIndex],
        hotel: hotel,
      };
      return updatedDestinations;
    });
  };

  const selectAttractionAlternative = (attraction) => {
    setAttractionModalVisible(false);
    setDestinations((prevDestinations) => {
      const updatedDestinations = [...prevDestinations];
      updatedDestinations[selectedIndex] = {
        ...updatedDestinations[selectedIndex],
        attraction: attraction,
      };
      return updatedDestinations;
    });
  };

  const handleAlternativeHotels = async () => {
    setHotelModalVisible(true);
    const city = destinations[selectedIndex].city;

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

      const hotelDataJson = await hotelResponse.json();
      setAlternativeHotels(hotelDataJson.hotel);
    } catch (error) {
      console.error("Error fetching alternative hotels:", error.message);
    }
  };

  const handleAlternativeAttractions = async () => {
    setAttractionModalVisible(true);
    const city = destinations[selectedIndex].city;

    try {
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

      const attractionDataJson = await attractionResponse.json();
      setAlternativeAttractions(attractionDataJson.attractions);
    } catch (error) {
      console.error("Error fetching alternative attractions:", error.message);
    }
  };

  const handleDestination = async () => {
    const updatedDestinations = await Promise.all(
      destinations.map(async (destination) => {
        if (!destination.hotel || !destination.attraction) {
          const city = destination.city;
          let hotel = destination.hotel;
          let attraction = destination.attraction;

          if (!hotel) {
            // Fetch default hotel
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

              const hotelDataJson = await hotelResponse.json();
              hotel = hotelDataJson.hotel[0];
            } catch (error) {
              console.error("Error fetching hotel data:", error);
            }
          }

          if (!attraction) {
            // Fetch default attraction
            try {
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

              const attractionDataJson = await attractionResponse.json();
              attraction = attractionDataJson.attractions[0];
            } catch (error) {
              console.error("Error fetching attraction data:", error);
            }
          }

          return { ...destination, hotel, attraction };
        } else {
          return destination;
        }
      })
    );

    // Navigate to FullDestination screen with updated destinations
    navigation.navigate("Main", {
      screen: "FullDestination",
      params: {
        destinations: updatedDestinations,
      },
    });
  };

  // Retrieve current destination data
  const currentDestination = destinations[selectedIndex];
  const toggleIsLoading = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
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
      <ScrollView>
        {isDataFetched && detailedFlightTickets.length > 0 ? (
          <>
            <CardsSlide
              flightTickets={detailedFlightTickets}
              daysArray={daysArray}
              onFullDetails={handleFullDetails}
            />

            {showVerticalCards && currentDestination && (
              <VerticalSlide
                currentDestination={currentDestination}
                handleAlternativeHotels={handleAlternativeHotels}
                handleAlternativeAttractions={handleAlternativeAttractions}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </ScrollView>

      {/* Hotel Alternatives Modal */}
      <CustomModal
        visible={hotelModalVisible}
        onDismiss={() => setHotelModalVisible(false)}
        data={alternativeHotels}
        onSelect={selectHotelAlternative}
        labelExtractor={(item) => item.name}
      />

      {/* Attraction Alternatives Modal */}
      <CustomModal
        visible={attractionModalVisible}
        onDismiss={() => setAttractionModalVisible(false)}
        data={alternativeAttractions}
        onSelect={selectAttractionAlternative}
        labelExtractor={(item) => item.name}
      />

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
        <Button
          title="Dev DEl"
          style={styles.button2}
          icon="check-circle"
          labelStyle={styles.buttonLabel}
          iconColor="white"
          onPress={envDevDeleteUsersFlightTicket}
        >
          Dev DEl
        </Button>
      </View>
    </PageFrame>
  );
};

export default FullTrip;

const styles = StyleSheet.create({
  buttonContainerbot: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainerbot: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: "100%",
    // marginBottom: 10,
    // marginTop: 10,
    marginHorizontal: 10,
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
  image: {
    backgroundColor: "white",
    width: "110%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
