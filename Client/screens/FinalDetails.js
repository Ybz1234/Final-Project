import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";

const FinalDetails = ({ route }) => {
  const { userId, selectedHotels, selectedAttractions, date } = route.params;

  const [flightDetails, setFlightDetails] = useState([]);
  const [loading, setLoading] = useState(true);

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
            userId: userId,
            startDate: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        console.error("Error:", response.statusText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setFlightDetails(data.flightTickets || []);
    } catch (error) {
      console.error("Error fetching flight details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightDetails();
  }, []);

  // Helper function to render flight details
  const renderFlightDetails = (flight, index) => (
    <Card key={index} style={{ marginBottom: 10 }}>
      <Card.Title title={`Flight ${index + 1}`} />
      <Card.Content>
        <Text>Flight ID: {flight._id}</Text>
        <Text>Departure City: {flight.departureCity}</Text>
        <Text>Arrival City: {flight.arrivalCity}</Text>
        <Text>
          Flight Date: {new Date(flight.flightDate).toLocaleDateString()}{" "}
          {flight.flightHour}:{flight.flightMinute.toString().padStart(2, "0")}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Flight Details</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : flightDetails.length > 0 ? (
        flightDetails.map((flight, index) => renderFlightDetails(flight, index))
      ) : (
        <Text>No flight details available.</Text>
      )}

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Selected Hotels
      </Text>

      {selectedHotels && Object.keys(selectedHotels).length > 0 ? (
        Object.keys(selectedHotels).map((city, cityIndex) => (
          <View key={cityIndex}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{city} Hotels:</Text>
            {selectedHotels[city].map((hotel, index) => (
              <Card key={index} style={{ marginBottom: 10 }}>
                <Card.Title title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`} />
                <Card.Content>
                  <Text>{hotel.address.full_address}</Text>
                  <Text>Cost per night: ${hotel.night_cost}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        ))
      ) : (
        <Text>No hotels selected.</Text>
      )}

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Selected Attractions
      </Text>

      {selectedAttractions && Object.keys(selectedAttractions).length > 0 ? (
        Object.keys(selectedAttractions).map((city, cityIndex) => (
          <View key={cityIndex}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {city} Attractions:
            </Text>
            {selectedAttractions[city].map((attraction, index) => (
              <Card key={index} style={{ marginBottom: 10 }}>
                <Card.Title title={attraction.name} subtitle={attraction.city} />
                <Card.Content>
                  <Text>{attraction.description}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        ))
      ) : (
        <Text>No attractions selected.</Text>
      )}
    </ScrollView>
  );
};

export default FinalDetails;
