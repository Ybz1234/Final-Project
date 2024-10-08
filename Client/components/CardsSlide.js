import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Image, Dimensions, View } from "react-native";
import { Card, Text, Button, TextInput } from "react-native-paper";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const UNSPLASH_ACCESS_KEY = "lHBWLGm7YURX1Uk9XrDLxNSvcrtwC1rLY5k3rjF5CTs";

const getCityPicture = async (city) => {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      return response.data.results[0].urls.regular; // Return the URL of the first image
    } else {
      throw new Error("No images found");
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/150"; // Fallback image URL
  }
};

const CardsSlide = ({ flightTickets, daysArray }) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const flight of flightTickets) {
        newImages[flight.arrivalCity] = await getCityPicture(
          flight.arrivalCity
        );
      }
      setImages(newImages);
    };
    fetchImages();
  }, [flightTickets]);

  return (
    <Card style={styles.card}>
      <Card.Title title="Suggested route" titleStyle={styles.cardTitle} />
      <Card.Content>
        <ScrollView horizontal contentContainerStyle={styles.cardContainer}>
          {flightTickets.map((flight, index) => (
            <Card key={index} style={styles.innerCard}>
              <Image
                source={{
                  uri:
                    images[flight.arrivalCity] ||
                    "https://via.placeholder.com/150",
                }}
                style={styles.image}
              />
              <Card.Content style={styles.innerCardContent}>
                <Text style={styles.innerCardText}>
                  {flight.departureCity} to {flight.arrivalCity}
                </Text>
                <Text style={styles.innerCardSubText}>
                  Date: {new Date(flight.flightDate).toLocaleDateString()}
                </Text>
                <Text style={styles.innerCardSubText}>
                  Flight Dep: {new Date(flight.flightDate).toLocaleTimeString()}
                </Text>
                <Text style={styles.innerCardSubText}>
                  Duration: {daysArray[index]} Days
                </Text>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="contained"
                  style={styles.innerButton}
                  labelStyle={styles.innerButtonText}
                >
                  Full Details
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default CardsSlide;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#1B3E90",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 490,
  },
  cardTitle: {
    color: "#1B3E90",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto-BoldItalic",
  },
  cardText: {
    color: "#1B3E90",
  },
  button: {
    backgroundColor: "#1B3E90",
  },
  buttonText: {
    color: "#fff", // White
    fontFamily: "Roboto-MediumItalic",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerCard: {
    width: windowWidth * 0.6,
    fontFamily: "Roboto-MediumItalic",
    height: 400,
    marginRight: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Purple
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  innerCardContent: {
    radius: 20,
    // padding: 5,
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingBottom: 10,
    margin: 10,
  },
  innerCardText: {
    color: "#1B3E90", // White
    fontSize: 16,
    fontFamily: "Roboto-BoldItalic",
    fontWeight: "bold",
    marginTop: 10,
  },
  innerCardSubText: {
    color: "#1B3E90", // White
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Roboto-Medium",
    marginTop: 10,
  },
  innerButton: {
    backgroundColor: "#1B3E90", // Teal
  },
  innerButtonText: {
    color: "1B3E90",
    fontFamily: "Roboto-Medium",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textInput: {
    backgroundColor: "#fff", // White
    borderRadius: 4,
    textAlign: "left",
    width: 55,
    height: 30,
    marginRight: 20,
  },
});
