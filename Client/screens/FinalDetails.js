import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';

const FinalDetails = ({ route }) => {
  const {
    cityArr,
    flightTickets,
    userId,
    daysArray,
    date,
    selectedAttractions,
    selectedHotels,
  } = route.params;

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // for handling loading state

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://final-project-sqlv.onrender.com/api/user/${userId}`);
      const data = await response.json();
      setUserDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setLoading(false);
    }
  };

  const renderDetailsSection = (title, items, renderItem) => {
    if (!items || items.length === 0) {
      return <Text>{`No ${title.toLowerCase()} selected.`}</Text>;
    }

    return (
      <View>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>{title}:</Text>
        {items.map((item, index) => renderItem(item, index))}
      </View>
    );
  };

  const renderFlightDetails = (flight, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={flight.flightNumber} subtitle={`${flight.origin} to ${flight.destination}`} />
      <Card.Content>
        <Text>Departure: {flight.departureTime}</Text>
        <Text>Arrival: {flight.arrivalTime}</Text>
        <Text>Price: ${flight.price}</Text>
      </Card.Content>
    </Card>
  );

  const renderHotelDetails = (hotel, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`} />
      <Card.Content>
        <Text>{hotel.address.full_address}</Text>
        <Text>Cost per night: ${hotel.night_cost}</Text>
      </Card.Content>
    </Card>
  );

  const renderAttractionDetails = (attraction, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={attraction.name} subtitle={attraction.city} />
      <Card.Content>
        <Text>{attraction.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Final Travel Details</Text>

      <Text style={{ marginVertical: 10 }}>
        Date: {date}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Display Flight Tickets */}
          {renderDetailsSection('Flight Tickets', flightTickets, renderFlightDetails)}

          {/* Display Selected Hotels */}
          {renderDetailsSection('Selected Hotels', selectedHotels, renderHotelDetails)}

          {/* Display Selected Attractions */}
          {renderDetailsSection('Selected Attractions', selectedAttractions, renderAttractionDetails)}

          {/* User Details and Booking Button */}
          {userDetails && (
            <View style={{ marginTop: 20 }}>
              <Text>{`User: ${userDetails.name}`}</Text>
              <Text>{`Email: ${userDetails.email}`}</Text>
              <Button mode="contained" onPress={() => alert('Booking Complete')}>
                Complete Booking
              </Button>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default FinalDetails;
