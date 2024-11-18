import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import SumCard from "../components/SumCard";

const FinalDetails = ({ route }) => {
  const { userId, selectedHotels, selectedAttractions, date } = route.params;

  const [flightDetails, setFlightDetails] = useState([]);
  const [airportDetails, setAirportDetails] = useState({});
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
        console.error("Error fetching flight details:", response.statusText);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.flightTickets && data.flightTickets.length > 0) {
        setFlightDetails(data.flightTickets);

        const cities = Array.from(
          new Set(
            data.flightTickets.flatMap((ticket) => [
              ticket.departureCity,
              ticket.arrivalCity,
            ])
          )
        );

        const airportPromises = cities.map((city) =>
          fetch(
            `https://final-project-sqlv.onrender.com/api/Airports/getAirPortByCity?city=${encodeURIComponent(
              city
            )}`
          ).then((res) => res.json())
        );

        const airports = await Promise.all(airportPromises);
        const airportData = airports.reduce((acc, curr) => {
          if (curr.airport && curr.airport.length > 0) {
            acc[curr.airport[0].city] = curr.airport[0];
          }
          return acc;
        }, {});

        setAirportDetails(airportData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightDetails();
  }, []);

  const renderFlightDetails = (flight, index) => {
    const departureAirport = airportDetails[flight.departureCity];
    const arrivalAirport = airportDetails[flight.arrivalCity];

    return (
      <Card key={index} style={{ marginBottom: 10 }}>
        <Card.Title title="Flight Details" />
        <Card.Content>
          <Text>Flight ID: {flight.flightId}</Text>
          <Text>
            From: {flight.departureCity}{" "}
            {departureAirport && `(${departureAirport.name})`}
          </Text>
          <Text>
            To: {flight.arrivalCity}{" "}
            {arrivalAirport && `(${arrivalAirport.name})`}
          </Text>
          <Text>
            Departure Time:{" "}
            {`${String(flight.flightHour).padStart(2, "0")}:${String(
              flight.flightMinute
            ).padStart(2, "0")}`}
          </Text>
          <Text>
            Date: {new Date(flight.flightDate).toLocaleDateString()}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <SumCard title="Flight Details" iconType="flight" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : flightDetails.length > 0 ? (
        flightDetails.map((flight, index) => renderFlightDetails(flight, index))
      ) : (
        <Text>No flight details available.</Text>
      )}

      <SumCard title="Selected Hotels" iconType="hotel" />
      {selectedHotels && Object.keys(selectedHotels).length > 0 ? (
        Object.keys(selectedHotels).map((city, cityIndex) => (
          <View key={cityIndex}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {city} Hotels:
            </Text>
            {selectedHotels[city].map((hotel, index) => (
              <Card key={index} style={{ marginBottom: 10 }}>
                <Card.Title
                  title={hotel.name}
                  subtitle={`${hotel.city}, ${hotel.country}`}
                />
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

      <SumCard title="Selected Attractions" iconType="attraction" />
      {selectedAttractions && Object.keys(selectedAttractions).length > 0 ? (
        Object.keys(selectedAttractions).map((city, cityIndex) => (
          <View key={cityIndex}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {city} Attractions:
            </Text>
            {selectedAttractions[city].map((attraction, index) => (
              <Card key={index} style={{ marginBottom: 10 }}>
                <Card.Title
                  title={attraction.name}
                  subtitle={attraction.city}
                />
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