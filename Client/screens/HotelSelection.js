import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { List, Card, Headline, Divider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HotelCard from "../components/HotelCard";
import PageFrame from "../components/PageFrame";
import PrimaryButton from "../components/PrimaryButton";

const HotelSelection = ({ route, navigation }) => {
  const { cityArr } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState({});
  const [nightsPerHotel, setNightsPerHotel] = useState({});
  const [error, setError] = useState(null);
  const [expandedCities, setExpandedCities] = useState({});

  const MAIN_SERVER = "https://final-project-sqlv.onrender.com/api";
  const COLLECTION = "hotels";

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
        return {
          ...prevSelected,
          [city]: selectedCityHotels.filter((h) => h._id !== hotel._id),
        };
      } else {
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

  const handleNavigateToAttractions = () => {
    navigation.replace("Main", {
      screen: "Attractions selection",
      params: {
        cityArr: cityArr,
      },
    });
  };

  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Select Your Hotels</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : hotels.length > 0 ? (
          <List.Section>
            {hotels.map((cityHotels, index) => (
              <List.Accordion
                key={index}
                title={`Hotels in ${cityHotels.city}`}
                expanded={expandedCities[cityHotels.city] || false}
                onPress={() => toggleCityAccordion(cityHotels.city)}
                left={(props) => <List.Icon {...props} icon="city" />}
              >
                {cityHotels.hotels.map((hotel) => (
                  <HotelCard
                    key={hotel._id}
                    hotel={hotel}
                    onSelect={() => handleSelect(cityHotels.city, hotel)}
                    selectedNights={nightsPerHotel[hotel._id] || ""}
                    setSelectedNights={setSelectedNights}
                  />
                ))}
              </List.Accordion>
            ))}
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
                      <PrimaryButton
                        onPress={() => handleRemoveHotel(city, hotel)}
                        color="red"
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
                      </PrimaryButton>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Roboto-BoldItalic",
    color: "#1B3E90",
    marginBottom: 16,
  },
  selectedHotelContainer: {
    marginTop: 20,
    paddingBottom: 10,
  },
  confirmationHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B3E90",
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    backgroundColor: "#1B3E90",
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
    color: "#1B3E90",
  },
  valueText: {
    fontWeight: "normal",
    color: "#000",
  },
  grandTotalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B3E90",
    textAlign: "right",
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "red",
    alignSelf: "flex-start",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});

export default HotelSelection;
