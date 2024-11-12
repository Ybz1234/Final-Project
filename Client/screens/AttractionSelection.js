import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { List } from 'react-native-paper';
import AttractionCard from '../components/AttractionCard';

const AttractionSelection = ({ route }) => {
    const { cityArr } = route.params;
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAttractions, setSelectedAttractions] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [error, setError] = useState(null);
    const [expandedCities, setExpandedCities] = useState({});

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const allAttractions = [];
                console.log("Starting to fetch attractions for cities:", cityArr);

                for (let city of cityArr) {
                    const attractionResponse = await fetch(
                        "https://final-project-sqlv.onrender.com/api/Attractions/findAttractionsByCity",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ city }),
                        }
                    );

                    if (!attractionResponse.ok) {
                        console.error(`Failed to fetch attractions for ${city}. Status: ${attractionResponse.status}`);
                        continue;
                    }

                    const attractionDataJson = await attractionResponse.json();

                    if (attractionDataJson && attractionDataJson.attractions) {
                        allAttractions.push({ city, attractions: attractionDataJson.attractions });
                    } else {
                        console.log(`No attractions found for city: ${city}`);
                    }
                }
                setAttractions(allAttractions);
            } catch (error) {
                console.error("An error occurred while fetching attractions:", error);
                setError("Failed to load attraction data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttractions();
    }, [cityArr]);

    const handleSelectAttraction = (city, attraction) => {
        setSelectedAttractions((prevSelected) => {
            const selectedCityAttractions = prevSelected[city] || [];
            const isAttractionSelected = selectedCityAttractions.some((a) => a._id === attraction._id);

            if (isAttractionSelected) {
                return {
                    ...prevSelected,
                    [city]: selectedCityAttractions.filter((a) => a._id !== attraction._id),
                };
            } else {
                return {
                    ...prevSelected,
                    [city]: [...selectedCityAttractions, attraction],
                };
            }
        });
    };

    const handleConfirmSelection = () => {
        console.log("Confirming selection of attractions:", selectedAttractions);
        let confirmationText = 'You have selected the following attractions:\n';

        for (let city in selectedAttractions) {
            confirmationText += `\nIn ${city}:\n`;
            selectedAttractions[city].forEach((attraction) => {
                confirmationText += `- ${attraction.name}\n`;
            });
        }

        setConfirmationMessage(confirmationText);
        console.log("Confirmation message:", confirmationText);
    };

    const toggleCityAccordion = (city) => {
        setExpandedCities((prev) => ({
            ...prev,
            [city]: !prev[city],
        }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Select Attractions</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
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
                                    onSelect={() => handleSelectAttraction(cityAttractions.city, attraction)}
                                />
                            ))}
                        </List.Accordion>
                    ))}
                </List.Section>
            ) : (
                <Text>No attractions available.</Text>
            )}

            {Object.keys(selectedAttractions).length > 0 && (
                <View style={styles.selectedAttractionContainer}>
                    <Button title="Confirm Selection" onPress={handleConfirmSelection} />
                    {confirmationMessage && (
                        <View style={styles.confirmationContainer}>
                            <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 16,
    },
    selectedAttractionContainer: {
        marginTop: 20,
    },
    confirmationContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    confirmationMessage: {
        fontSize: 16,
        color: 'green',
    },
    errorMessage: {
        color: 'red',
    },
});

export default AttractionSelection;
