import React from 'react';
import { View, Text } from 'react-native';

const PaginationView = ({ page }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Page {page}</Text>
    </View>
  );
};

export default PaginationView;