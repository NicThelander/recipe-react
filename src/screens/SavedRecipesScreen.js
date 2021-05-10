import React, { useContext, useEffect } from 'react';
import {
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as RecipeContext } from '../context/RecipeContext';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import useDeleteRecipe from '../hooks/useDeleteRecipe';

// screen to see the recipes users have saved to their account

if (Platform.OS === 'android') {
  if (!ActivityIndicator.defaultProps) ActivityIndicator.defaultProps = {};
  ActivityIndicator.defaultProps.color = 'gray';
} // there's currently a bug where the colour defaults to null on android so this is required to see the loading circle

const SavedRecipesScreen = ({ navigation }) => {
  const { state, fetchRecipes } = useContext(RecipeContext);
  console.log(state);

  const [removeRecipe] = useDeleteRecipe();

  return (
    <View style={styles.containerStyle}>
      <NavigationEvents onWillFocus={() => fetchRecipes()} />
      {state.length === 0 || state.length === undefined ? (
        <ActivityIndicator animating={true} size="large" color="gray" />
      ) : (
        // The array becomes undefined as you leave the page and it causes an error, this deals with that and gives a loading image for when you enter the page
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
                  </ListItem.Content>
                  <TouchableOpacity
                    onPress={() => {
                      removeRecipe(item.recipeId);
                      fetchRecipes();
                    }}
                  >
                    <MaterialIcons name="delete" size={25} />
                  </TouchableOpacity>
                  <ListItem.Chevron size={25} />
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
    justifyContent: 'center',
    flex: 1,
  },
  listItemStyle: {
    borderBottomWidth: 1,
    borderColor: 'rgb(169,169,169)',
  },
});

export default SavedRecipesScreen;
