import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as RecipeContext } from '../context/RecipeContext';

const SavedRecipesScreen = ({ navigation }) => {
  const { state, fetchRecipes } = useContext(RecipeContext);
  // console.log(state);

  return (
    <View style={styles.containerStyle}>
      <NavigationEvents onWillFocus={() => fetchRecipes()} />
      {state.length === undefined ? (
        <Text>Loading</Text> // it will crash without this because it tries to load the flat list when not on the page and it crashes the app because the array is undefined at that point
      ) : (
        <FlatList
          data={state}
          keyExtractor={(item) => item.recipeId.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Recipe', { id: item.recipeId })
                }
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

SavedRecipesScreen.navigationOptions = {
  title: 'Recipes',
};
const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 100,
  },
});

export default SavedRecipesScreen;
