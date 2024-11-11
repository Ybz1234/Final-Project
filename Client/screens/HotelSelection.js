import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import HotelCard from '../components/HotelCard';
import ConfirmationCheckbox from '../components/ConfirmationCheckbox';

const HotelSelection = ({ route }) => {
  const { cityArr } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
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

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    setIsConfirmed(false);
  };

  const handleConfirm = (checked) => {
    setIsConfirmed(checked);
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
                  onSelect={handleSelect}
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
      {selectedHotel && (
        <View style={styles.selectedHotelContainer}>
          <Text style={styles.selectedHotelText}>
            Selected Hotel: {selectedHotel.name}
          </Text>
          <ConfirmationCheckbox label="Confirm Selection" onConfirm={handleConfirm} />
          {isConfirmed && (
            <Text style={styles.confirmationMessage}>Hotel selection confirmed!</Text>
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
  selectedHotelText: {
    fontSize: 18,
  },
  confirmationMessage: {
    color: 'green',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
  },
});

export default HotelSelection;
