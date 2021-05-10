import { useEffect, useState } from 'react';
import spoonacular from '../api/spoonacular';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY1 = 'apiKey=7198e0ca838d4e85a39446d0ff58dc33';
  const API_KEY2 = 'apiKey=ec28f651e0dd40658b6185cf99543a83';
  const API_KEY3 = 'apiKey=8f025297f1454a169b5c66c3d46a2ab6';
  const searchApi = async (searchTerm) => {
    searchVal = `complexSearch?${API_KEY3}&query=${searchTerm}&number=8`;
    try {
      const response = await spoonacular.get(searchVal);
      setResults(response.data);
    } catch (err) {
      console.log(err);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi('');
  }, []);

  return [searchApi, results, errorMessage];
};
