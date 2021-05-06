import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ResultDetails = ({ result }) => {
  return (
    <View style={styles.containerStyle}>
      <Image style={styles.imageStyle} source={{ uri: result.image }} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameStyle}>
        {result.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    margin: 5,
  },
  imageStyle: {
    width: 170,
    height: 120,
    borderRadius: 4,
  },
  nameStyle: {
    fontWeight: 'bold',
    marginLeft: 6,
    width: 170,
    flex: 1,
  },
});

export default ResultDetails;
