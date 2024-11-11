import React from 'react';
import { AirbnbRating } from 'react-native-ratings';

const StarRating = ({ rating = 5 }) => (
  <AirbnbRating defaultRating={rating} size={20} isDisabled showRating={false} />
);

export default StarRating;
