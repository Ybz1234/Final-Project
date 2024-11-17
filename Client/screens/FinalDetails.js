import React, { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
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

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://final-project-sqlv.onrender.com/api/user/${userId}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const renderHotelDetails = () => {
    if (!Array.isArray(selectedHotels)) {
      return <Text>No hotels selected.</Text>;
    }

    return selectedHotels.map((hotel) => (
      <Card key={hotel._id} style={{ marginBottom: 10 }}>
        <Card.Title title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`} />
        <Card.Content>
          <Text>{hotel.address.full_address}</Text>
          <Text>Cost per night: ${hotel.night_cost}</Text>
        </Card.Content>
      </Card>
    ));
  };

  const renderAttractionDetails = () => {
    if (!Array.isArray(selectedAttractions)) {
      return <Text>No attractions selected.</Text>;
    }

    return selectedAttractions.map((attraction) => (
      <Card key={attraction._id} style={{ marginBottom: 10 }}>
        <Card.Title title={attraction.name} subtitle={attraction.city} />
        <Card.Content>
          <Text>{attraction.description}</Text>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Final Travel Details</Text>

      <Text style={{ marginVertical: 10 }}>
        Date: {date}
      </Text>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Flight Tickets:</Text>
      {flightTickets.map((ticket, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Card.Title title={ticket.flightNumber} subtitle={`${ticket.origin} to ${ticket.destination}`} />
          <Card.Content>
            <Text>Departure: {ticket.departureTime}</Text>
            <Text>Arrival: {ticket.arrivalTime}</Text>
            <Text>Price: ${ticket.price}</Text>
          </Card.Content>
        </Card>
      ))}

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Selected Hotels:</Text>
      {renderHotelDetails()}

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Selected Attractions:</Text>
      {renderAttractionDetails()}

      {userDetails && (
        <Button style={{ marginTop: 20 }} mode="contained" onPress={() => alert('Booking Complete')}>
          Complete Booking
        </Button>
      )}
    </ScrollView>
  );
};

export default FinalDetails;
