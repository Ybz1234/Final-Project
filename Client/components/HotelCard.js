import * as React from 'react';
import { Avatar, Card, Button, Text } from 'react-native-paper';
import StarRating from './Rating';

const LogHotelData = (hotel) => {
  console.log('Hotel Data:');
  console.log('Name:', hotel.name);
  console.log('City:', hotel.city);
  console.log('Country:', hotel.country);
  console.log('Full Address:', hotel.address.full_address);
  console.log('Night Cost:', hotel.night_cost);
  console.log('Rating:', hotel.rating);
  console.log('Additional Hotel Data:', hotel); // Logs the full hotel object for detailed inspection
};

const LeftContent = props => <Avatar.Icon {...props} icon="city" />;

const HotelCard = ({ hotel, onSelect }) => {
  // Log all hotel-related data in a single function
  LogHotelData(hotel);

  const nightCost = hotel?.night_cost || 0; // Safe access with default value
  const rating = hotel?.rating || 0; // Safe access with default value

  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Title title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`} left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{hotel.address.full_address}</Text>
        <Text variant="bodyMedium">Cost per night: ${nightCost}</Text>
        <StarRating rating={rating} />
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button onPress={() => onSelect(hotel)}>Select</Button>
      </Card.Actions>
    </Card>
  );
};

export default HotelCard;
