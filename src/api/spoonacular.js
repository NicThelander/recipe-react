import axios from 'axios';

const API_KEY1 = 'apiKey=7198e0ca838d4e85a39446d0ff58dc33';
const API_KEY2 = 'apiKey=ec28f651e0dd40658b6185cf99543a83';
const API_KEY3 = 'apiKey=8f025297f1454a169b5c66c3d46a2ab6';

export default axios.create({
  baseURL: `https://api.spoonacular.com/recipes/`,
});
