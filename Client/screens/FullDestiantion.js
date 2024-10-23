import React, { useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ConfettiCannon from "react-native-confetti-cannon";
import { Button, Text } from "react-native-paper";

const FullDestination = ({ route }) => {
  const { destinations = [], flightsDetails = [] } = route.params || {};
  const confettiRef = useRef(null);
  const processDestinations = (destinations) => {
    return destinations.map((destination, index) => {
      const isFinalDestination = index === destinations.length - 1;
      const cityName = destination.city || "N/A";
      const flightDate = destination.flight
        ? destination.flight.flightDate
        : "N/A";
      const formattedDate =
        flightDate !== "N/A"
          ? new Date(flightDate).toLocaleDateString()
          : "N/A";

      if (isFinalDestination) {
        return {
          destinationTitle: `Destination ${index + 1} (Final)`,
          cityName,
          flightDate: formattedDate,
        };
      } else {
        const hotelName = destination.hotel ? destination.hotel.name : "N/A";
        const attractionName = destination.attraction
          ? destination.attraction.name
          : "N/A";

        return {
          destinationTitle: `Destination ${index + 1}`,
          cityName,
          flightDate: formattedDate,
          hotelName,
          attractionName,
        };
      }
    });
  };

  const processedDestinations = processDestinations(destinations);
  return (
    <PageFrame>
      <View style={styles.container}>
        {/* Glowing and Animated Checkmark Icon */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          style={styles.iconContainer}
          onAnimationEnd={() => confettiRef.current.start()}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={150}
            color="#1B3E90"
            style={styles.icon}
          />
        </Animatable.View>

        {/* Animated Text */}
        <Animatable.Text animation="fadeInUp" delay={500} style={styles.text}>
          Booking Confirmed!
        </Animatable.Text>

        {/* Confetti Effect */}
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: 0, y: 0 }}
          fadeOut={true}
          fallSpeed={3000}
        />
      </View>
      <Text>detail of the trip in simple list here </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {processedDestinations.map((dest, index) => (
          <View key={index} style={styles.destination}>
            <Text style={styles.title}>{dest.destinationTitle}</Text>
            <Text style={styles.text}>City Name: {dest.cityName}</Text>
            <Text style={styles.text}>Flight Date: {dest.flightDate}</Text>
            {!dest.destinationTitle.includes("Final") && (
              <>
                <Text style={styles.text}>Hotel Name: {dest.hotelName}</Text>
                <Text style={styles.text}>
                  Attraction: {dest.attractionName}
                </Text>
              </>
            )}
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </PageFrame>
  );
};

export default FullDestination;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textShadowColor: "#1B3E90",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 28,
    color: "#1B3E90",
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  destination: {
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#1B3E90",
  },

  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginTop: 10,
  },
});
