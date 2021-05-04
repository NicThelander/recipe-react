import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultDetails from './ResultDetails';

const ResultsList = ({ results, navigation }) => {
  // if (!results.length) {
  //   return null;
  // }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        numColumns={2}
        data={results}
        keyExtractor={(results) => results.id.toString()} // added. toString() to get rid of virtualizedCell.cellKey error for numbers
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Recipe', { id: item.id })}
            >
              <ResultDetails result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 100,
  },
});

export default withNavigation(ResultsList);
