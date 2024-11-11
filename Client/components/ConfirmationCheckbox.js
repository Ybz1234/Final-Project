import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { View, Text } from 'react-native';

const ConfirmationCheckbox = ({ label, onConfirm }) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
    onConfirm(!checked);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
      <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={handlePress} />
      <Text>{label}</Text>
    </View>
  );
};

export default ConfirmationCheckbox;
