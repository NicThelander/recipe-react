import { useContext } from 'react';
import { Context as RecipeContext } from '../context/RecipeContext';
import { navigate } from '../navigationRef';

export default () => {
  const {
    state: { recipeId, name },
    saveRecipe,
  } = useContext(RecipeContext);

  const addRecipe = async () => {
    // adds the recipe to saved recipes as long as it isn't already present
    try {
      await saveRecipe(name, recipeId);
    } catch (err) {
      console.log(err);
    }
    navigate('SavedRecipes');
  };

  return [addRecipe];
};
