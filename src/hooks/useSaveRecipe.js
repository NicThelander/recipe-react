import { useContext } from 'react';
import { Context as RecipeContext } from '../context/RecipeContext';
import { navigate } from '../navigationRef';

export default () => {
  const {
    state: { recipeId, name },
    saveRecipe,
  } = useContext(RecipeContext);

  const addRecipe = async () => {
    await saveRecipe(name, recipeId);
    navigate('Recipe');
  };

  return [addRecipe];
};
