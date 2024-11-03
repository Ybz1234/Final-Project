import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import PageFrame from "../components/PageFrame";
import CardsSlide from "../components/CardsSlide";
import VerticalSlide from "../components/VerticalSlide";
import CustomModal from "../components/CustomModal";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import PrimaryButton from "../components/PrimaryButton";
import { useUser } from "../context/UserContext";

const WEATHERBIT_API_KEY = "aa05a952953b4714bf00a93b013cb6fb";

const FullTrip = ({ route, navigation }) => {
  const { daysArray, date } = route.params || [];
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
  const [loading, setLoading] = useState(false);
  const { user, setUser: setGlobalUser } = useUser();

  const PYTHON_UTILITY_SERVER_URL = "https://utilityserver-kka0.onrender.com";

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
      fetchFlightDetails();
    }, [])
  );

  useEffect(() => {
    if (route?.params?.daysArray == undefined) {
      Toast.show({
        type: "info",
        text1: "You Have to follow the instructions",
        text2: "Please return to Pick a date or go to select cities",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 280,
        bottomOffset: 40,
      });
      navigation.replace("Main", {
        screen: "Home",
      });
    }
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
          body: JSON.stringify({ userId: user.user._id }),
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
        "https://final-project-sqlv.onrender.com/api/FlightTicket/userFlightTicketsFromDate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user._id,
            startDate: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        console.error("Error:", response.statusText);
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
      console.error("Error fetching flight details:", error);
    }
  };

  const handleFullDetails = async (flight, index) => {
    setSelectedFlight(flight);
    setSelectedIndex(index);
    const city = flight.arrivalCity;
    setLoading(true);
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

      // Fetch weather data
      const weatherResponse = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily`,
        {
          params: {
            city: city,
            key: WEATHERBIT_API_KEY, // Make sure to define this API key
            units: "M",
          },
        }
      );

      const temperatures = weatherResponse.data.data.map((day) => ({
        date: day.valid_date,
        temperature: day.temp, // Average temperature
        maxTemp: day.max_temp, // Maximum temperature
        minTemp: day.min_temp, // Minimum temperature
        description: day.weather.description, // Weather description
      }));

      // Update destinations array
      setDestinations((prevDestinations) => {
        const updatedDestinations = [...prevDestinations];
        updatedDestinations[index] = {
          ...updatedDestinations[index],
          hotel: hotelDataJson.hotel[0],
          attraction: attractionDataJson.attractions[0],
          weather: temperatures,
        };
        return updatedDestinations;
      });

      // Show the vertical cards

      setShowVerticalCards(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
      // End loading
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

    navigation.navigate("Main", {
      screen: "Booking",
      params: {
        destinations: updatedDestinations,
        flightsDetails: detailedFlightTickets,
      },
    });
  };

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

            {showVerticalCards &&
              currentDestination &&
              (loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#1B3E90" />
                </View>
              ) : (
                <VerticalSlide
                  currentDestination={currentDestination}
                  handleAlternativeHotels={handleAlternativeHotels}
                  handleAlternativeAttractions={handleAlternativeAttractions}
                />
              ))}
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
        <PrimaryButton
          style={styles.button2}
          icon="check-circle"
          onPress={handleDestination}
        >
          Confirm Booking
        </PrimaryButton>
        <PrimaryButton
          style={styles.button2}
          icon="delete"
          onPress={envDevDeleteUsersFlightTicket}
        >
          Dev Del
        </PrimaryButton>
      </View>
    </PageFrame>
  );
};

export default FullTrip;

const styles = StyleSheet.create({
  buttonContainerbot: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: "100%",
    marginHorizontal: 10,
  },
  image: {
    backgroundColor: "white",
    width: "110%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
