import { useContext } from 'react';
import { Context as RecipeContext } from '../context/RecipeContext';
import { navigate } from '../navigationRef';

export default () => {
  const {
    state: { recipeId, name },
    saveRecipe,
  } = useContext(RecipeContext);

  const addRecipe = async () => {
    console.log(name), console.log(recipeId);
    await saveRecipe(name, recipeId);
    console.log('yum');
    navigate('Recipe');
  };

  return [addRecipe];
};
