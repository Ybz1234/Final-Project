import React, { useState, useEffect } from 'react';
import { Avatar, Card, Text, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from './PrimaryButton';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = "lHBWLGm7YURX1Uk9XrDLxNSvcrtwC1rLY5k3rjF5CTs";

const LeftContent = (props) => <Avatar.Icon {...props} icon="map-marker" style={{ backgroundColor: '#1B3E90' }}/>;

const AttractionCard = ({ attraction, onSelect }) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    const [attractionImageUrl, setAttractionImageUrl] = useState(null);

    const fetchAttractionImage = async (query) => {
        try {
            const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`;
            const response = await axios.get(url);
            if (response.data.results.length > 0) {
                setAttractionImageUrl(response.data.results[0].urls.regular);
            } else {
                setAttractionImageUrl("https://via.placeholder.com/150");
            }
        } catch (error) {
            console.error("Error fetching attraction image:", error);
            setAttractionImageUrl("https://via.placeholder.com/150");
        }
    };

    useEffect(() => {
        fetchAttractionImage(attraction.name);
    }, [attraction.name]);

    const handleSelectAttraction = async () => {
        setLoading(true);
        try {
            await onSelect(attraction);
            setSelected(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ marginVertical: 8 }}>
            <Card.Title title={attraction.name} subtitle={attraction.city} left={LeftContent} />
            <Card.Content>
                <Text variant="titleLarge">{attraction.description || "No description available."}</Text>
            </Card.Content>

            {attractionImageUrl ? (
                <Card.Cover source={{ uri: attractionImageUrl }} />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}

            <Card.Actions>
                <PrimaryButton onPress={handleSelectAttraction}>
                    {loading ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : selected ? (
                        <MaterialCommunityIcons name="check" size={20} color="white" />
                    ) : (
                        'Select'
                    )}
                </PrimaryButton>
            </Card.Actions>
        </Card>
    );
};

export default AttractionCard;
