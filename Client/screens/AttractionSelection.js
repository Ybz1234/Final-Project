import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import AttractionCard from '../components/AttractionCard';
import PageFrame from '../components/PageFrame';
import PrimaryButton from '../components/PrimaryButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            setLoading(true);
            setError(null);

            try {
                const responses = await Promise.all(
                    cityArr.map(city =>
                        fetch("https://final-project-sqlv.onrender.com/api/Attractions/findAttractionsByCity", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ city }),
                        })
                    )
                );

                const allAttractions = await Promise.all(responses.map(async (response, index) => {
                    if (response.ok) {
                        const data = await response.json();
                        return { city: cityArr[index], attractions: data.attractions || [] };
                    }
                    return { city: cityArr[index], attractions: [] };
                }));

                setAttractions(allAttractions.filter(item => item.attractions.length > 0));
            } catch (error) {
                setError("Failed to load attraction data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttractions();
    }, [cityArr]);

    const handleSelectAttraction = (city, attraction) => {
        setSelectedAttractions(prev => {
            const selected = prev[city] || [];
            const isSelected = selected.some(item => item._id === attraction._id);

            return {
                ...prev,
                [city]: isSelected
                    ? selected.filter(item => item._id !== attraction._id)
                    : [...selected, attraction],
            };
        });
    };

    const handleConfirmSelection = () => {
        if (Object.keys(selectedAttractions).length === 0) {
            setConfirmationMessage("No attractions selected.");
            return;
        }

        let confirmationText = 'You have selected the following attractions:\n';
        for (let city in selectedAttractions) {
            confirmationText += `\nIn ${city}:\n`;
            selectedAttractions[city].forEach(attraction => {
                confirmationText += `- ${attraction.name}\n`;
            });
        }
        setConfirmationMessage(confirmationText);
    };

    const toggleCityAccordion = city => {
        setExpandedCities(prev => ({
            ...prev,
            [city]: !prev[city],
        }));
    };

    return (
        <PageFrame>
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
                                left={props => <List.Icon {...props} icon="city" />}
                            >
                                {cityAttractions.attractions.map(attraction => (
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
                                    <MaterialCommunityIcons name="check-circle" size={22} color="white" />
                                </View>
                            )}
                        />
                        {confirmationMessage && (
                            <View style={styles.confirmationContainer}>
                                <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </PageFrame>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: 400,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    button: {
        width: "60%",
        alignSelf: "center",
        paddingHorizontal: 20,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        marginRight: 8,
        fontSize: 17,
        color: "white",
        fontWeight: "bold",
    },
});

export default AttractionSelection;
