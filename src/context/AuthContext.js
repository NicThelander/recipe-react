import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import onlineApi from '../api/online';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('Home');
  } else {
    navigate('loginFlow');
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await onlineApi.post('/signup', { email, password });

      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('Home');
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong during signup',
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await onlineApi.post('/signin', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('Home');
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong during sign in',
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
