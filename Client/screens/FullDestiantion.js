import React, { useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ConfettiCannon from "react-native-confetti-cannon";
import { Text, Card } from "react-native-paper";

const FullDestination = ({ route }) => {
  const { destinations = [] } = route.params || {};
  const confettiRef = useRef(null);

  useEffect(() => {
    if (processedDestinations) {
      sendToMail();
    }
    if (!destinations || !processedDestinations) {
      Toast.show({
        type: "info",
        text1: "You Have to choose cities in order to continue",
        text2: "Please return to home page and select cities",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 280,
        bottomOffset: 40,
      });
      navigation.replace("Main", { screen: "Home" });
    }
  }, []);

  const sendToMail = async () => {
    try {
      const response = await fetch(
        "https://utilityserver-sa7p.onrender.com/routes/send_booking_email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to_email: "jonathanbz49@gmail.com",
            booking_details: processedDestinations,
          }),
        }
      );
      if (response.status === 200) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const processDestinations = (destinations) => {
    return destinations.map((destination, index) => {
      const isFinalDestination = index === destinations.length - 1;
      const cityName = destination.city || "N/A";
      const flightDate = destination.flight ? destination.flight.flightDate : "N/A";
      const formattedDate =
        flightDate !== "N/A" ? new Date(flightDate).toLocaleDateString() : "N/A";

      if (isFinalDestination) {
        return {
          destinationTitle: `Destination ${index + 1} (Final)`,
          cityName,
          flightDate: formattedDate,
        };
      } else {
        const hotelName = destination.hotel ? destination.hotel.name : "N/A";
        const attractionName = destination.attraction ? destination.attraction.name : "N/A";

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
        <Animatable.Text animation="fadeInUp" delay={500} style={styles.text}>
          Booking Confirmed!
        </Animatable.Text>
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: 0, y: 0 }}
          fadeOut={true}
          fallSpeed={3000}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {processedDestinations.map((dest, index) => (
          <Card key={index} style={styles.card} elevation={5}>
            <Card.Title title={dest.destinationTitle} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>City Name: </Text>{dest.cityName}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Flight Date: </Text>{dest.flightDate}
              </Text>
              {!dest.destinationTitle.includes("Final") && (
                <>
                  <Text style={styles.cardText}>
                    <Text style={styles.boldText}>Hotel Name: </Text>{dest.hotelName}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.boldText}>Attraction: </Text>{dest.attractionName}
                  </Text>
                </>
              )}
            </Card.Content>
          </Card>
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
  scrollContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#1B3E90",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardTitle: {
    color: "#1B3E90",
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    color: "#1B3E90",
    marginVertical: 5,
  },
  boldText: {
    fontWeight: "bold",
    color: "#1B3E90",
  },
});
