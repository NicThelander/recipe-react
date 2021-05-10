import { useContext } from 'react';
import { Context as RecipeContext } from '../context/RecipeContext';

export default () => {
  const { deleteRecipe } = useContext(RecipeContext);

  const removeRecipe = async (recipeId) => {
    await deleteRecipe(recipeId);
  };

  return [removeRecipe];
};
