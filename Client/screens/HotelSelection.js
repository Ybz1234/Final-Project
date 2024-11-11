import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { List } from 'react-native-paper';
import HotelCard from '../components/HotelCard';

const HotelSelection = ({ route }) => {
  const { cityArr, daysArray } = route.params; // Destructure daysArray from route params
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState({});
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
        // If hotel is already selected, remove it
        return {
          ...prevSelected,
          [city]: selectedCityHotels.filter((h) => h._id !== hotel._id),
        };
      } else {
        // If hotel is not selected, add it
        return {
          ...prevSelected,
          [city]: [...selectedCityHotels, hotel],
        };
      }
    });
  };

  const calculateTotalPrice = (hotel, cityIndex) => {
    const days = daysArray[cityIndex] || 0; // Get days from daysArray for each city
    console.log(`Calculating total price for hotel: ${hotel.name} in city ${cityArr[cityIndex]}`);
    console.log(`Price per night: ${hotel.price}, Days: ${days}`);
    return hotel.price * days; // Multiply the price per night by the number of days
  };

  const handleConfirmSelection = () => {
    let confirmationText = 'You have selected the following hotels:\n';
    let totalPrice = 0;

    for (let city in selectedHotels) {
      confirmationText += `\nIn ${city}:\n`;
      selectedHotels[city].forEach((hotel, index) => {
        // Log the selected hotel and the associated city index
        console.log(`Selected hotel: ${hotel.name} in ${city}`);
        console.log(`Index in daysArray: ${index}`);

        // Ensure the days value is valid for each hotel
        const days = daysArray[index] && !isNaN(daysArray[index]) ? daysArray[index] : 1;  // Default to 1 day if undefined or NaN
        const pricePerNight = hotel?.night_cost && !isNaN(hotel?.night_cost) ? hotel?.night_cost : 0; // Default to 0 if price is invalid

        // If the price is 0, warn the user
        if (pricePerNight === 0) {
          console.warn(`Invalid price for hotel: ${hotel.name} in ${city}`);
        }

        // Log the days and price per night for the hotel
        console.log(`Price per night for ${hotel.name}: $${pricePerNight}`);
        console.log(`Days selected for ${hotel.name}: ${days}`);

        const totalHotelPrice = pricePerNight * days;  // Calculate total price for the hotel stay
        totalPrice += totalHotelPrice;  // Add to total price

        confirmationText += `- ${hotel.name} for ${days} day(s): $${totalHotelPrice.toFixed(2)}\n`;
      });
    }

    // Add the total price of all selected hotels
    confirmationText += `\nTotal price for all selections: $${totalPrice.toFixed(2)}`;
    setConfirmationMessage(confirmationText);
  };

  const toggleCityAccordion = (city) => {
    setExpandedCities((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };

  return (
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
                  selected={selectedHotels[cityHotels.city]?.some((h) => h._id === hotel._id)}
                  accessible={true}
                  accessibilityLabel={`Hotel: ${hotel.name}`}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});

export default HotelSelection;
