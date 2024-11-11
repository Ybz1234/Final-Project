import * as React from 'react';
import { Avatar, Card, Button, Text } from 'react-native-paper';
import StarRating from './Rating';

const LeftContent = props => <Avatar.Icon {...props} icon="city" />;

const HotelCard = ({ hotel, onSelect }) => {

  const nightCost = hotel?.night_cost || 0;
  const rating = hotel?.rating || 0;

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
