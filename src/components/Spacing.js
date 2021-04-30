import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacing = ({ children }) => {
  return <View style={styles.spacingStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  spacingStyle: {
    margin: 15,
  },
});

export default Spacing;
