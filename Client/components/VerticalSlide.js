import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";

const UNSPLASH_ACCESS_KEY = "lHBWLGm7YURX1Uk9XrDLxNSvcrtwC1rLY5k3rjF5CTs";

const VerticalSlide = ({
  currentDestination,
  handleAlternativeHotels,
  handleAlternativeAttractions,
  arrivalDate,
  duration,
}) => {
  const [hotelImageUrl, setHotelImageUrl] = useState(null);
  const [attractionImageUrl, setAttractionImageUrl] = useState(null);
  const [displayWeather, setDisplayWeather] = useState(false);

  useEffect(() => {
    if (currentDestination.hotel) {
      fetchHotelImage(currentDestination.hotel.name);
    }
    if (currentDestination.attraction) {
      fetchAttractionImage(currentDestination.attraction.name);
    }
  }, [currentDestination, arrivalDate, duration]);

  const fetchHotelImage = async (query) => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_ACCESS_KEY}`;
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setHotelImageUrl(response.data.results[0].urls.regular);
      } else {
        setHotelImageUrl("https://via.placeholder.com/150");
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
      setHotelImageUrl("https://via.placeholder.com/150");
    }
  };

  const fetchAttractionImage = async (query) => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_ACCESS_KEY}`;
      const response = await axios.get(url);
      if (response.data.results.length > 0 || !response.data.results) {
        setAttractionImageUrl(response.data.results[0].urls.regular);
      } else {
        setAttractionImageUrl("https://via.placeholder.com/150");
      }
    } catch (error) {
      console.error("Error fetching attraction image:", error);
      setAttractionImageUrl("https://via.placeholder.com/150");
    }
  };

  const toggleWeather = () => {
    if (displayWeather) {
      setDisplayWeather(false);
    } else {
      setDisplayWeather(true);
    }
  };
  return (
    <Card style={styles.card}>
      <Card.Title
        title={`Destination: ${currentDestination.city}`}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.cardContainer}
        >
          {/* Hotel Card */}
          {currentDestination.hotel && (
            <Card style={styles.verticalCard}>
              <Card.Title
                titleStyle={styles.cardTitle}
                title={currentDestination.hotel.name}
                titleNumberOfLines={null}
              />
              <Card.Content>
                {hotelImageUrl && (
                  <Image source={{ uri: hotelImageUrl }} style={styles.image} />
                )}
                <Text style={styles.cardTitle}>Hotel Address:</Text>
                <Text style={styles.cardText}>
                  {currentDestination.hotel.address.full_address}
                </Text>
              </Card.Content>
              <Button
                onPress={handleAlternativeHotels}
                style={styles.button2}
                labelStyle={styles.buttonLabel}
              >
                Alternative
              </Button>
            </Card>
          )}

          {/* Attraction Card */}
          {currentDestination.attraction && (
            <Card style={styles.verticalCard}>
              <Card.Title
                title={currentDestination.attraction.name}
                titleStyle={styles.cardTitle}
                titleNumberOfLines={null}
              />
              <Card.Content>
                {attractionImageUrl && (
                  <Image
                    source={{ uri: attractionImageUrl }}
                    style={styles.image}
                  />
                )}
                <Text style={styles.cardTitle}>Activity Description:</Text>
                <Text style={styles.cardText}>
                  {currentDestination.attraction.description}
                </Text>
              </Card.Content>
              <Button
                onPress={handleAlternativeAttractions}
                style={styles.button2}
                labelStyle={styles.buttonLabel}
              >
                Alternative
              </Button>
            </Card>
          )}
          <Button
            onPress={toggleWeather}
            style={styles.button2}
            labelStyle={styles.buttonLabel}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name={displayWeather ? "chevron-up" : "chevron-down"}
                size={size}
                color={color}
              />
            )}
          >
            Display Weather
          </Button>
          {currentDestination.weather && displayWeather && (
            <Card style={styles.verticalCard}>
              <Card.Title
                title="Weather Forecast:"
                titleStyle={styles.cardTitle}
              />
              <Card.Content>
                <Text style={styles.cardTitle}>
                  Weather is from current date to 5 days in the advance only!
                </Text>
              </Card.Content>
              <Card.Content>
                {currentDestination.weather.map((day, index) => (
                  <View key={index} style={styles.weatherItem}>
                    <Text style={styles.cardText}>Date: {day.date}</Text>
                    <Text style={styles.cardText}>
                      Temperature: {day.temperature}°C
                    </Text>
                    <Text style={styles.cardText}>
                      Description: {day.description}
                    </Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default VerticalSlide;

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
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#1B3E90",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-BoldItalic",
  },
  scrollView: {
    height: 400,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  verticalCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
    width: "100%", // Ensure the card uses available space
    padding: 0,
    // alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#1B3E90",
    fontFamily: "Roboto-MediumItalic",
    marginVertical: 10,
  },
  button2: {
    width: "50%",
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#1B3E90",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginVertical: 5,
  },
});
