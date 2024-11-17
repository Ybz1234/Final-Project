import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';

const FinalDetails = ({ route }) => {
  const { selectedHotels, selectedAttractions, flightTickets } = route.params;

  console.log("FinalDetails -> Selected Hotels:", selectedHotels);
  console.log("FinalDetails -> Selected Attractions:", selectedAttractions);
  console.log("FinalDetails -> Flight Tickets:", flightTickets);

  const [flightDetails, setFlightDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlightTicketInfo = async (flightId) => {
    try {
      const response = await fetch('https://final-project-sqlv.onrender.com/api/FlightTicket/getFlightTicketInformationById', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flightId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setFlightDetails(data.information);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching flight ticket info:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (flightTickets && flightTickets.length > 0) {
      flightTickets.forEach(flight => {
        fetchFlightTicketInfo(flight.id); // Assuming each flight has an 'id' property
      });
    }
  }, [flightTickets]);

  // Render the selected hotel details
  const renderHotelDetails = (hotel, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`} />
      <Card.Content>
        <Text>{hotel.address.full_address}</Text>
        <Text>Cost per night: ${hotel.night_cost}</Text>
      </Card.Content>
    </Card>
  );

  // Render the selected attraction details
  const renderAttractionDetails = (attraction, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={attraction.name} subtitle={attraction.city} />
      <Card.Content>
        <Text>{attraction.description}</Text>
      </Card.Content>
    </Card>
  );

  // Render the flight details
  const renderFlightDetails = (flight, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={`Flight to ${flight.arrival.city}`} subtitle={`From ${flight.departure.city}`} />
      <Card.Content>
        <Text>Departure Date: {flight.departure.date}</Text>
        <Text>Flight Number: {flight.flightNumber}</Text>
        <Text>Cost: ${flight.cost}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Flight Details</Text>

      {/* Check if flightDetails is being fetched and render each flight */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : flightDetails.length > 0 ? (
        flightDetails.map((flight, index) => renderFlightDetails(flight, index))
      ) : (
        <Text>No flight details available.</Text>
      )}

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Selected Hotels</Text>

      {/* Check if selectedHotels is an object with cities and arrays of hotels */}
      {selectedHotels && Object.keys(selectedHotels).length > 0 ? (
        Object.keys(selectedHotels).map((city, cityIndex) => (
          <View key={cityIndex}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {city} Hotels:
            </Text>
            {selectedHotels[city].map((hotel, index) => renderHotelDetails(hotel, index))}
          </View>
        ))
      ) : (
        <Text>No hotels selected.</Text>
      )}

      {/* Display selected attractions */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
        Selected Attractions
      </Text>

      {/* Check if selectedAttractions is an object with cities and arrays of attractions */}
      {selectedAttractions && Object.keys(selectedAttractions).length > 0 ? (
        Object.keys(selectedAttractions).map((city, cityIndex) => (
          <View key={cityIndex}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {city} Attractions:
            </Text>
            {selectedAttractions[city].map((attraction, index) =>
              renderAttractionDetails(attraction, index)
            )}
          </View>
        ))
      ) : (
        <Text>No attractions selected.</Text>
      )}
    </ScrollView>
  );
};

export default FinalDetails;
