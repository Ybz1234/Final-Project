import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { Card } from "react-native-paper";
import SumCard from "../components/SumCard";
import PageFrame from "../components/PageFrame";

const FinalDetails = ({ route }) => {
  const { userId, selectedHotels, selectedAttractions, date, totalPrices } =
    route.params;

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
      <Card.Title
        titleStyle={styles.cardTitleText}
        subtitleStyle={styles.cardSubtitleText}
        style={styles.cardTitle}
        title={title}
        subtitle={subtitle}
      />
      <Card.Content>
        {details.map((detail, index) => {
          const [key, ...rest] = detail.split(":");
          const value = rest.join(":").trim();
          return (
            <Text key={index} style={styles.cardText}>
              <Text style={styles.cardTextKey}>{key}:</Text>
              <Text style={styles.cardTextValue}> {value}</Text>
            </Text>
          );
        })}
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
          `Departure Time: ${String(flight.flightHour).padStart(
            2,
            "0"
          )}:${String(flight.flightMinute).padStart(2, "0")}`,
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

            const totalCost = hotelTotalPrice
              ? hotelTotalPrice
              : "Price not available";

            return renderCard(hotel.name, `${hotel.city}, ${hotel.country}`, [
              `Address: ${hotel.address.full_address}`,
              `Total Stay Fee: $${totalCost}`,
            ]);
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
            renderCard(attraction.name, attraction.city, [
              `Description: ${attraction.description}`,
            ])
          )}
        </View>
      ))
    ) : (
      <Text style={styles.noDetailsText}>No attractions selected.</Text>
    );

  // Function to log the finalDetailsData object with detailed information
  const logFinalDetails = () => {
    const logData = {
      flights: flightDetails.map((flight) => ({
        from: `${flight.departureCity} (${
          airportDetails[flight.departureCity]?.name || "N/A"
        })`,
        to: `${flight.arrivalCity} (${
          airportDetails[flight.arrivalCity]?.name || "N/A"
        })`,
        departureTime: `${String(flight.flightHour).padStart(2, "0")}:${String(
          flight.flightMinute
        ).padStart(2, "0")}`,
        date: new Date(flight.flightDate).toLocaleDateString(),
      })),
      hotels: Object.entries(selectedHotels).map(([city, hotels]) => ({
        city,
        hotels: hotels.map((hotel) => ({
          name: hotel.name,
          address: hotel.address.full_address,
          totalStayFee:
            totalPrices[city]?.find(
              (hotelPrice) => hotelPrice.hotelId === hotel._id
            )?.totalPrice || "Price not available",
          attractions: selectedAttractions[city]?.map((attraction) => ({
            name: attraction.name,
            description: attraction.description,
          })),
        })),
      })),
    };
    console.log("Final Details Data:", JSON.stringify(logData, null, 2));
  };

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

        {/* Button to log the finalDetailsData */}
        <View style={styles.buttonContainer}>
          <Button title="Log Final Details" onPress={logFinalDetails} />
        </View>
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
  },
  cardText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  cardTextKey: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "black",
  },
  cardTextValue: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    color: "black",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  noDetailsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  cardTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8957e5",
    fontFamily: "Roboto-BoldItalic",
  },
  cardSubtitleText: {
    fontSize: 16,
    color: "#010409",
    fontFamily: "Roboto-Medium",
  },
});

export default FinalDetails;
