import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import HotelCard from '../components/HotelCard';
import ConfirmationCheckbox from '../components/ConfirmationCheckbox';

const HotelSelection = ({ route }) => {
  const { cityArr } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(null);

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
          console.log('API Response:', hotelDataJson); // Log the full API response
    
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
  }, [cityArr]); // Re-run effect if cityArr changes

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    setIsConfirmed(false); // Reset confirmation when selecting a new hotel
  };

  const handleConfirm = (checked) => {
    setIsConfirmed(checked);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Select Your Hotels</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorMessage}>{error}</Text>
      ) : hotels.length > 0 ? (
        hotels.map((cityHotels, index) => (
          <View key={index}>
            <Text style={styles.cityTitle}>Hotels in {cityHotels.city}</Text>
            {cityHotels.hotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                onSelect={handleSelect}
                accessible={true}
                accessibilityLabel={`Hotel: ${hotel.name}`}
              />
            ))}
          </View>
        ))
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
