import React, { useState } from 'react';
import { Avatar, Card, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import PrimaryButton from './PrimaryButton';
import StarRating from './Rating';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const LeftContent = props => <Avatar.Icon {...props} icon="city" />;

const HotelCard = ({ hotel, onSelect, selectedNights, setSelectedNights }) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const nightCost = hotel?.night_cost || 0;
  const rating = hotel?.rating || 0;

  const handleNightChange = (nights) => {
    setSelectedNights(hotel._id, parseInt(nights) || 0);
  };

  const handleSelectHotel = async () => {
    setLoading(true);
    try {
      await onSelect(hotel);
      setSelected(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Title title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`} left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{hotel.address.full_address}</Text>
        <Text variant="bodyMedium">Cost per night: ${nightCost}</Text>
        <StarRating rating={rating} />
        <TextInput
          label="Number of nights"
          keyboardType="numeric"
          value={selectedNights.toString()}
          onChangeText={handleNightChange}
          style={{ marginTop: 8 }}
        />
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <PrimaryButton onPress={handleSelectHotel}>
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

export default HotelCard;
