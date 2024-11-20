import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  List,
  Card,
  Headline,
  Divider,
  IconButton,
  Button,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HotelCard from "../components/HotelCard";
import PageFrame from "../components/PageFrame";
import Toast from "react-native-toast-message";

import PrimaryButton from "../components/PrimaryButton";

const HotelSelection = ({ route, navigation }) => {
  const { cityArr, flightTickets, userId, daysArray, date } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState({});
  const [nightsPerHotel, setNightsPerHotel] = useState({});
  const [error, setError] = useState(null);
  const [expandedCities, setExpandedCities] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");

  const MAIN_SERVER = "https://final-project-sqlv.onrender.com/api";
  const COLLECTION = "hotels";

  const cityDaysMap = {};
  cityArr.forEach((city, index) => {
    cityDaysMap[city] = daysArray[index];
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const allHotels = [];
        for (let city of cityArr) {
          const hotelResponse = await fetch(
            `${MAIN_SERVER}/${COLLECTION}/findHotelsByCity`,
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

          if (hotelDataJson && hotelDataJson.hotel) {
            allHotels.push({ city, hotels: hotelDataJson.hotel });
          }
        }

        setHotels(allHotels);
      } catch (error) {
        setError("Failed to load hotel data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [cityArr]);

  const handleSelect = (city, hotel) => {
    setSelectedHotels((prevSelected) => {
      const selectedCityHotels = prevSelected[city] || [];
      const isHotelSelected = selectedCityHotels.some(
        (h) => h._id === hotel._id
      );

      if (isHotelSelected) {
        setNightsPerHotel((prev) => {
          const { [hotel._id]: _, ...rest } = prev;
          return rest;
        });
        return {
          ...prevSelected,
          [city]: selectedCityHotels.filter((h) => h._id !== hotel._id),
        };
      } else {
        setNightsPerHotel((prev) => ({
          ...prev,
          [hotel._id]: prev[hotel._id] || cityDaysMap[city],
        }));
        return {
          ...prevSelected,
          [city]: [...selectedCityHotels, hotel],
        };
      }
    });
  };

  const handleRemoveHotel = (city, hotel) => {
    setSelectedHotels((prevSelected) => {
      const selectedCityHotels = prevSelected[city] || [];
      return {
        ...prevSelected,
        [city]: selectedCityHotels.filter((h) => h._id !== hotel._id),
      };
    });

    setNightsPerHotel((prev) => {
      const { [hotel._id]: removed, ...remainingNights } = prev;
      return remainingNights;
    });
  };

  const setSelectedNights = (hotelId, nights) => {
    setNightsPerHotel((prev) => ({
      ...prev,
      [hotelId]: nights,
    }));
  };

  const calculateTotalPrice = (hotel) => {
    const nights = nightsPerHotel[hotel._id] || 0;
    return hotel.night_cost * nights;
  };

  const calculateGrandTotal = () => {
    return Object.keys(selectedHotels).reduce((total, city) => {
      return (
        total +
        selectedHotels[city].reduce(
          (cityTotal, hotel) => cityTotal + calculateTotalPrice(hotel),
          0
        )
      );
    }, 0);
  };

  const toggleCityAccordion = (city) => {
    setExpandedCities((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };

  const validateSelections = () => {
    const totalSelectedHotels = Object.keys(selectedHotels).reduce(
      (total, city) => total + selectedHotels[city].length,
      0
    );

    if (totalSelectedHotels === 0) {
      Toast.show({
        type: "error",
        text1: "No Hotels Selected",
        text2: "Please select at least one hotel before proceeding.",
      });
      return false;
    }

    for (const city of cityArr) {
      const cityHotels = selectedHotels[city] || [];
      if (cityHotels.length === 0) {
        Toast.show({
          type: "error",
          text1: `No Hotel Selected in ${city}`,
          text2: `Please select at least one hotel for ${city}.`,
        });
        return false;
      }

      let totalNights = 0;
      for (const hotel of cityHotels) {
        const nights = parseInt(nightsPerHotel[hotel._id]) || 0;
        totalNights += nights;
      }
      const allocatedDays = cityDaysMap[city];
      if (totalNights > allocatedDays) {
        Toast.show({
          type: "error",
          text1: `Too many nights in ${city}`,
          text2: `You have selected ${totalNights} nights but only ${allocatedDays} days are allocated to ${city}.`,
        });
        return false;
      } else if (totalNights < allocatedDays) {
        Toast.show({
          type: "error",
          text1: `Not enough nights in ${city}`,
          text2: `You have selected ${totalNights} nights but ${allocatedDays} days are allocated to ${city}.`,
        });
        return false;
      }
    }
    return true;
  };

  const handleNavigateToAttractions = () => {
    const totalPrices = Object.keys(selectedHotels).reduce((total, city) => {
      console.log(`Processing city: ${city}`);
      const cityHotels = selectedHotels[city];
      const hotelPrices = cityHotels.map((hotel) => {
        const totalPrice = calculateTotalPrice(hotel);
        return {
          hotelId: hotel._id,
          totalPrice: totalPrice,
        };
      });
      return {
        ...total,
        [city]: hotelPrices,
      };
    }, {});
    navigation.replace("Main", {
      screen: "Attractions selection",
      params: {
        cityArr: cityArr,
        flightTickets: flightTickets,
        userId: userId,
        daysArray: daysArray,
        date: date,
        selectedHotels: selectedHotels,
        totalPrices: totalPrices,
      },
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Select Your Hotels</Text>
          <IconButton
            style={{ top: -5, right: -15 }}
            icon={sortOrder === "asc" ? "sort-ascending" : "sort-descending"}
            size={22}
            iconColor="#8957e5"
            onPress={toggleSortOrder}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#151b23" />
        ) : error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : hotels.length > 0 ? (
          <List.Section>
            {hotels.map((cityHotels, index) => {
              const sortedHotels = [...cityHotels.hotels].sort((a, b) => {
                if (sortOrder === "asc") {
                  return a.night_cost - b.night_cost;
                } else {
                  return b.night_cost - a.night_cost;
                }
              });

              return (
                <List.Accordion
                  key={index}
                  title={`Hotels in ${cityHotels.city}`}
                  expanded={expandedCities[cityHotels.city] || false}
                  onPress={() => toggleCityAccordion(cityHotels.city)}
                  left={(props) => <List.Icon {...props} icon="city" />}
                >
                  {sortedHotels.map((hotel) => (
                    <HotelCard
                      key={hotel._id}
                      hotel={hotel}
                      onSelect={() => handleSelect(cityHotels.city, hotel)}
                      selectedNights={nightsPerHotel[hotel._id] || ""}
                      setSelectedNights={setSelectedNights}
                    />
                  ))}
                </List.Accordion>
              );
            })}
          </List.Section>
        ) : (
          <Text>No hotels available.</Text>
        )}

        {Object.keys(selectedHotels).length > 0 && (
          <View style={styles.selectedHotelContainer}>
            <Text style={styles.confirmationHeader}>Order Confirmation</Text>
            <Divider style={styles.divider} />
            {Object.keys(selectedHotels).map((city) => (
              <View key={city}>
                <Headline style={styles.cityText}>{city}</Headline>
                {selectedHotels[city].map((hotel) => (
                  <Card key={hotel._id} style={styles.hotelCard}>
                    <Card.Content>
                      <Text style={styles.labelText}>
                        Hotel Name:{" "}
                        <Text style={styles.valueText}>{hotel.name}</Text>
                      </Text>
                      <Text style={styles.labelText}>
                        Nights:{" "}
                        <Text style={styles.valueText}>
                          {nightsPerHotel[hotel._id] || 1}
                        </Text>
                      </Text>
                      <Text style={styles.labelText}>
                        Total Price:{" "}
                        <Text style={styles.valueText}>
                          ${calculateTotalPrice(hotel).toFixed(2)}
                        </Text>
                      </Text>
                      <Button
                        onPress={() => handleRemoveHotel(city, hotel)}
                        style={styles.removeButton}
                      >
                        <View style={styles.buttonContent}>
                          <Text style={styles.removeButtonText}>Remove</Text>
                          <MaterialCommunityIcons
                            name="trash-can"
                            size={20}
                            color="white"
                          />
                        </View>
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            ))}
            <Divider style={styles.divider} />
            <Text style={styles.grandTotalText}>
              Grand Total:{" "}
              <Text style={styles.totalPrice}>
                ${calculateGrandTotal().toFixed(2)}
              </Text>
            </Text>
          </View>
        )}

        <PrimaryButton
          style={styles.button}
          onPress={handleNavigateToAttractions}
          icon={() => (
            <View style={styles.iconContainer}>
              <Text style={styles.buttonText}>Select Attractions</Text>
              <MaterialCommunityIcons
                name="ferris-wheel"
                size={22}
                color="white"
              />
            </View>
          )}
        />
      </ScrollView>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 16,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#f1e8ff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Roboto-BoldItalic",
    color: "#8957e5",
    marginBottom: 16,
  },
  selectedHotelContainer: {
    marginTop: 20,
    paddingBottom: 10,
  },
  confirmationHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8957e5",
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    backgroundColor: "#8957e5",
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
  },
  button: {
    width: "60%",
    alignSelf: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginRight: 8,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  hotelCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8957e5",
  },
  icon: {
    textShadowColor: "#1B3E90",
    alignItems: "right",
    fontWeight: "bold",
  },
  valueText: {
    fontWeight: "normal",
    color: "#000",
    fontFamily: "Roboto-Italic",
  },
  grandTotalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto-BoldItalic",

    textAlign: "right",
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "red",
    alignSelf: "flex-start",
    borderRadius: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
    fontFamily: "Roboto-BoldItalic",
  },
  totalPrice: {
    fontFamily: "Roboto-BoldItalic",

    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});

export default HotelSelection;
