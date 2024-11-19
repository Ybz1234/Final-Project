import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, ActivityIndicator, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import SumCard from "../components/SumCard";
import PageFrame from "../components/PageFrame";

const FinalDetails = ({ route }) => {
  const { userId, selectedHotels, selectedAttractions, date, totalPrices } = route.params;

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

  const renderCard = (title, subtitle, details) => (
    <Card style={styles.card}>
      <Card.Title title={title} subtitle={subtitle} />
      <Card.Content>
        {details.map((detail, index) => (
          <Text key={index} style={styles.cardText}>
            {detail}
          </Text>
        ))}
      </Card.Content>
    </Card>
  );

  const renderFlightDetails = () =>
    flightDetails.map((flight, index) => {
      const departureAirport = airportDetails[flight.departureCity];
      const arrivalAirport = airportDetails[flight.arrivalCity];

      return renderCard(
        "Flight Details",
        `${flight.departureCity} to ${flight.arrivalCity}`,
        [
          `Flight ID: ${flight.flightId}`,
          `From: ${flight.departureCity} (${departureAirport?.name || "N/A"})`,
          `To: ${flight.arrivalCity} (${arrivalAirport?.name || "N/A"})`,
          `Departure Time: ${String(flight.flightHour).padStart(2, "0")}:${String(
            flight.flightMinute
          ).padStart(2, "0")}`,
          `Date: ${new Date(flight.flightDate).toLocaleDateString()}`,
        ]
      );
    });

  const renderHotelDetails = () =>
    selectedHotels && Object.keys(selectedHotels).length > 0 ? (
      Object.entries(selectedHotels).map(([city, hotels]) => (
        <View key={city}>
          <Text style={styles.sectionHeader}>{city} Hotels:</Text>
          {hotels.map((hotel, index) => {
            const hotelTotalPrice = totalPrices[city]?.find(
              (hotelPrice) => hotelPrice.hotelId === hotel._id
            )?.totalPrice;

            const totalCost = hotelTotalPrice ? hotelTotalPrice : "Price not available";

            return renderCard(
              hotel.name,
              `${hotel.city}, ${hotel.country}`,
              [
                `Address: ${hotel.address.full_address}`,
                `Total Stay Fee: $${totalCost}`,
              ]
            );
          })}
        </View>
      ))
    ) : (
      <Text style={styles.noDetailsText}>No hotels selected.</Text>
    );

  const renderAttractionDetails = () =>
    selectedAttractions && Object.keys(selectedAttractions).length > 0 ? (
      Object.entries(selectedAttractions).map(([city, attractions]) => (
        <View key={city}>
          <Text style={styles.sectionHeader}>{city} Attractions:</Text>
          {attractions.map((attraction, index) =>
            renderCard(attraction.name, attraction.city, [attraction.description])
          )}
        </View>
      ))
    ) : (
      <Text style={styles.noDetailsText}>No attractions selected.</Text>
    );

  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.container}>
        <SumCard title="Flight Details" iconType="flight" />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : flightDetails.length > 0 ? (
          renderFlightDetails()
        ) : (
          <Text style={styles.noDetailsText}>No flight details available.</Text>
        )}

        <SumCard title="Selected Hotels" iconType="hotel" />
        {renderHotelDetails()}

        <SumCard title="Selected Attractions" iconType="attraction" />
        {renderAttractionDetails()}
      </ScrollView>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#fff",
  },
  cardText: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  noDetailsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
});

export default FinalDetails;
