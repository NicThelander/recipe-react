import createDataContext from './createDataContext';
import onlineApi from '../api/online';

const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_recipes':
      return action.payload;
    case 'change_name':
      return { ...state, name: action.payload };
    case 'add_recipeId':
      return { ...state, recipeId: action.payload };
    default:
      return state;
  }
};

const addName = (dispatch) => (name) => {
  dispatch({ type: 'change_name', payload: name });
};

const addRecipeId = (dispatch) => (recipeId) => {
  dispatch({ type: 'add_recipeId', payload: recipeId });
};

const fetchRecipes = (dispatch) => async () => {
  const response = await onlineApi.get('/recipes');
  dispatch({ type: 'fetch_recipes', payload: response.data });
};

const saveRecipe = (dispatch) => async (name, recipeId) => {
  // console.log('testPre');
  await onlineApi.post('/recipes', { name, recipeId });
  // console.log('testPost');
};

export const { Provider, Context } = createDataContext(
  recipeReducer,
  { fetchRecipes, saveRecipe, addRecipeId, addName },
  []
);
