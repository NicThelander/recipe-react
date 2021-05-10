import React, { useContext, useEffect } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';
import useDeleteRecipe from '../hooks/useDeleteRecipe';

const SavedRecipesScreen = ({ navigation }) => {
  const { state, fetchRecipes } = useContext(RecipeContext);

  const [removeRecipe] = useDeleteRecipe();

  // useEffect(async () => {
  //   await fetchRecipes();
  // }, []);

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
                <ListItem style={styles.listItemStyle}>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <TouchableOpacity
                      onPress={() => {
                        removeRecipe(item.recipeId);
                        fetchRecipes();
                      }}
                    >
                      <MaterialIcons name="delete" size={25} />
                    </TouchableOpacity>
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
    flex: 1,
  },
  listItemStyle: {
    borderBottomWidth: 1,
    borderColor: 'rgb(169,169,169)',
  },
});

export default SavedRecipesScreen;
