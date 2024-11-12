import React, { useState } from 'react';
import { Avatar, Card, Text, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // or 'react-native-vector-icons/MaterialCommunityIcons'
import PrimaryButton from './PrimaryButton';

const LeftContent = (props) => <Avatar.Icon {...props} icon="map-marker" />;

const AttractionCard = ({ attraction, onSelect }) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);

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
            <Card.Cover source={{ uri: attraction.image || 'default_image_url' }} />
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
