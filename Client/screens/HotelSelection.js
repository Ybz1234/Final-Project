import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { List } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HotelCard from '../components/HotelCard';
import PageFrame from '../components/PageFrame';
import PrimaryButton from '../components/PrimaryButton';

const HotelSelection = ({ route, navigation }) => {
  const { cityArr } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState({});
  const [nightsPerHotel, setNightsPerHotel] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState(null);
  const [expandedCities, setExpandedCities] = useState({});

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const allHotels = [];

        for (let city of cityArr) {
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
      const isHotelSelected = selectedCityHotels.some((h) => h._id === hotel._id);

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

  const handleConfirmSelection = () => {
    let confirmationText = 'You have selected the following hotels:\n';
    let totalPrice = 0;

    for (let city in selectedHotels) {
      confirmationText += `\nIn ${city}:\n`;
      selectedHotels[city].forEach((hotel) => {
        const totalHotelPrice = calculateTotalPrice(hotel);
        totalPrice += totalHotelPrice;

        confirmationText += `- ${hotel.name} for ${nightsPerHotel[hotel._id] || 1} night(s): $${totalHotelPrice.toFixed(2)}\n`;
      });
    }

    confirmationText += `\nTotal price for all selections: $${totalPrice.toFixed(2)}`;
    setConfirmationMessage(confirmationText);
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
        cityArr: cityArr
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
                    selectedNights={nightsPerHotel[hotel._id] || ''}
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
            <Button title="Confirm Selection" onPress={handleConfirmSelection} />
            {confirmationMessage && (
              <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
              </View>
            )}
          </View>
        )}
        <PrimaryButton
          style={styles.button}
          onPress={handleNavigateToAttractions}
          icon={() => (
            <View style={styles.iconContainer}>
              <Text style={styles.buttonText}>Select Attractions</Text>
              <MaterialCommunityIcons name="ferris-wheel" size={22} color="white" />
            </View>
          )}
        />
      </ScrollView>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 400,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 16,
  },
  selectedHotelContainer: {
    marginTop: 20,
  },
  confirmationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  confirmationMessage: {
    fontSize: 16,
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  },
  button: {
    width: "60%",
    alignSelf: "center",
    paddingHorizontal: 20,
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
});

export default HotelSelection;
