import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import spoonacular from '../api/spoonacular';
import Spacing from '../components/Spacing';
import { Context as RecipeContext } from '../context/RecipeContext';
import useSaveRecipe from '../hooks/useSaveRecipe';

const RecipeScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState(''); // needed to use state here because it wasn't loading fast enough
  const id = navigation.getParam('id');
  let ingredients = '';

  let summaryEdited = '';

  const {
    state: { name, recipeId },
    addRecipeId,
    addName,
  } = useContext(RecipeContext);

  const [addRecipe] = useSaveRecipe();

  const API_KEY1 = 'apiKey=7198e0ca838d4e85a39446d0ff58dc33';
  const API_KEY2 = 'apiKey=ec28f651e0dd40658b6185cf99543a83';
  const API_KEY3 = 'apiKey=8f025297f1454a169b5c66c3d46a2ab6';

  const getResult = async (id) => {
    setLoading(true);

    const response = await spoonacular.get(
      `${id}/information?${API_KEY2}&includeNutrition=false` // might need &include not ?include
    );
    await setResult(response.data);
    addRecipeId(id);
    addName(response.data.title);

    var instructions1 = '';
    for (
      let i = 0;
      i < response.data.analyzedInstructions[0].steps.length;
      i++
    ) {
      instructions1 +=
        'Step ' +
        response.data.analyzedInstructions[0].steps[i]['number'] +
        ': ' +
        response.data.analyzedInstructions[0].steps[i]['step'] +
        '\n\n';
    }
    setInstructions(instructions1);
    setLoading(false);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!loading) {
    let summary = result.summary;
    summaryEdited = summary.replace(/\<b\>/g, '');
    summaryEdited = summaryEdited.replace(/\<\/b\>/g, '');
    summaryEdited = summaryEdited.replace(/\<a href="/g, '');
    summaryEdited = summaryEdited.replace(/\<\/a\>/g, '');
    summaryEdited = summaryEdited.replace(/\"\>/g, ' ');
    summaryEdited = summaryEdited.split('This score')[0];

    for (let key in result.extendedIngredients) {
      ingredients +=
        '- ' + result.extendedIngredients[key].originalString + '\n';
    }
  }

  return (
    <View style={styles.containerStyle}>
      {!loading ? (
        <ScrollView>
          <Spacing>
            <Text style={styles.headerStyle}>{result.title}</Text>
          </Spacing>
          <Spacing>
            <Image style={styles.imageStyle} source={{ uri: result.image }} />
          </Spacing>
          <Spacing>
            <Text>{summaryEdited}</Text>
          </Spacing>
          <Spacing>
            <Text style={styles.subHeaderStyle}>Ingredients</Text>
            <Text>{ingredients}</Text>
          </Spacing>
          <Spacing>
            <Text style={styles.subHeaderStyle}>Instructions</Text>
            <Text>{instructions}</Text>
          </Spacing>
          <Spacing>
            <Button title="Save Recipe!" onPress={addRecipe} />
          </Spacing>
        </ScrollView>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 250,
    width: 350,
  },
  subHeaderStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  containerStyle: {
    flex: 1,
    marginTop: 30,
  },
});

export default RecipeScreen;
