import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { List } from "react-native-paper";
import AttractionCard from "../components/AttractionCard";
import PageFrame from "../components/PageFrame";
import PrimaryButton from "../components/PrimaryButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SumCard from "../components/SumCard";

const AttractionSelection = ({ route, navigation }) => {
  const {
    cityArr,
    flightTickets,
    userId,
    daysArray,
    date,
    selectedHotels,
    totalPrices,
  } = route.params;
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttractions, setSelectedAttractions] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [error, setError] = useState(null);
  const [expandedCities, setExpandedCities] = useState({});

  const MAIN_SERVER = "https://final-project-sqlv.onrender.com/api";
  const COLLECTION = "Attractions";

  useEffect(() => {
    const fetchAttractions = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses = await Promise.all(
          cityArr.map((city) =>
            fetch(`${MAIN_SERVER}/${COLLECTION}/findAttractionsByCity`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ city }),
            })
          )
        );

        const allAttractions = await Promise.all(
          responses.map(async (response, index) => {
            if (response.ok) {
              const data = await response.json();
              return {
                city: cityArr[index],
                attractions: data.attractions || [],
              };
            }
            return { city: cityArr[index], attractions: [] };
          })
        );

        setAttractions(
          allAttractions.filter((item) => item.attractions.length > 0)
        );
      } catch (error) {
        setError("Failed to load attraction data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [cityArr]);

  const handleSelectAttraction = (city, attraction) => {
    setSelectedAttractions((prev) => {
      const selected = prev[city] || [];
      const isSelected = selected.some((item) => item._id === attraction._id);

      return {
        ...prev,
        [city]: isSelected
          ? selected.filter((item) => item._id !== attraction._id)
          : [...selected, attraction],
      };
    });
  };

  const handleConfirmSelection = () => {
    if (Object.keys(selectedAttractions).length === 0) {
      setConfirmationMessage("No attractions selected.");
      return;
    }

    let confirmationText = "You have selected the following attractions:\n";
    for (let city in selectedAttractions) {
      confirmationText += `\nIn ${city}:\n`;
      selectedAttractions[city].forEach((attraction) => {
        confirmationText += `- ${attraction.name}\n`;
      });
    }
    setConfirmationMessage(confirmationText);
  };

  const toggleCityAccordion = (city) => {
    setExpandedCities((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };

  const handleProceed = () => {
    navigation.navigate("Booking", {
      cityArr,
      flightTickets,
      userId,
      daysArray,
      date,
      selectedAttractions,
      selectedHotels,
      totalPrices,
    });
  };

  return (
    <PageFrame>
      <ScrollView contentContainerStyle={styles.container}>
      <SumCard title="Select Attractions" iconType="attraction" />
        {loading ? (
          <ActivityIndicator size="large" color="#151b23" />
        ) : error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : attractions.length > 0 ? (
          <List.Section>
            {attractions.map((cityAttractions, index) => (
              <List.Accordion
                key={index}
                title={`Attractions in ${cityAttractions.city}`}
                expanded={expandedCities[cityAttractions.city] || false}
                onPress={() => toggleCityAccordion(cityAttractions.city)}
                left={(props) => <List.Icon {...props} icon="city" />}
              >
                {cityAttractions.attractions.map((attraction) => (
                  <AttractionCard
                    key={attraction._id}
                    attraction={attraction}
                    onSelect={() =>
                      handleSelectAttraction(cityAttractions.city, attraction)
                    }
                  />
                ))}
              </List.Accordion>
            ))}
          </List.Section>
        ) : (
          <Text>No attractions available for the selected cities.</Text>
        )}

        {Object.keys(selectedAttractions).length > 0 && (
          <View style={styles.selectedAttractionContainer}>
            <PrimaryButton
              style={styles.button}
              onPress={handleConfirmSelection}
              icon={() => (
                <View style={styles.iconContainer}>
                  <Text style={styles.buttonText}>Confirm Selection</Text>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={22}
                    color="white"
                  />
                </View>
              )}
            />
            {confirmationMessage && (
              <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationMessage}>
                  {confirmationMessage}
                </Text>
              </View>
            )}
            <PrimaryButton onPress={handleProceed} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </PrimaryButton>
          </View>
        )}
      </ScrollView>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 16,
    width: 380,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    width: "110%",
    fontFamily: "Roboto-BoldItalic",
    color: "#8957e5",
    marginBottom: 16,
  },
  selectedAttractionContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  confirmationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  confirmationMessage: {
    fontSize: 16,
    color: "black",
    fontFamily: "Roboto-BoldItalic",
  },
  errorMessage: {
    color: "red",
  },
  button: {
    width: "60%",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 10,
  },
  buttonText: {
    alignSelf: "center",
    margin: 8,
    fontSize: 17,
    left: 5,
    color: "white",
    fontWeight: "bold",
  },
});

export default AttractionSelection;
