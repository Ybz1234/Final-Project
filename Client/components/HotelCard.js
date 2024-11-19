import React, { useState, useEffect } from 'react';
import { Avatar, Card, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import PrimaryButton from './PrimaryButton';
import StarRating from './Rating';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = "lHBWLGm7YURX1Uk9XrDLxNSvcrtwC1rLY5k3rjF5CTs";

const LeftContent = (props) => <Avatar.Icon {...props} icon="city" style={{ backgroundColor: '#8957e5' }}/>;

const HotelCard = ({ hotel, onSelect, selectedNights, setSelectedNights }) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const nightCost = hotel?.night_cost || 0;
  const rating = hotel?.rating || 0;

  const fetchHotelImage = async (query) => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`;
      const response = await axios.get(url);
      // if (response.data.results.length > 0) {
      //   setImageUrl(response.data.results[0].urls.regular);
      // } else {
        setImageUrl("https://via.placeholder.com/150");
      //}
    } catch (error) {
      console.error("Error fetching hotel image:", error);
      setImageUrl("https://via.placeholder.com/150");
    }
  };

  useEffect(() => {
    fetchHotelImage(hotel.name);
  }, [hotel.name]);

  const handleNightChange = (nights) => {
    setSelectedNights(hotel._id, parseInt(nights) || 0);
  };

  const handleSelectHotel = async () => {
    setLoading(true);
    try {
      await onSelect(hotel);
      setSelected(true);
    } catch (error) {
      console.error("Error selecting hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginVertical: 8, backgroundColor: '#151b23' }}>
      <Card.Title
        title={hotel.name}
        subtitle={`${hotel.city}, ${hotel.country}`}
        left={LeftContent}
        titleStyle={{ color: "white" }}
        subtitleStyle={{ color: "white" }}
      />
      <Card.Content>
        <Text variant="titleLarge" style={{ color: "white" }}>{hotel.address.full_address}</Text>
        <Text variant="bodyMedium" style={{ color: "white" }}>Cost per night: ${nightCost}</Text>
        <StarRating rating={rating} />
        <TextInput
          label="Number of nights"
          keyboardType="numeric"
          value={selectedNights.toString()}
          onChangeText={handleNightChange}
          style={{ marginTop: 8 }}
        />
      </Card.Content>

      {imageUrl ? (
        <Card.Cover source={{ uri: imageUrl }} />
      ) : (
        <ActivityIndicator size="large" color="#0d1117" />
      )}

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
