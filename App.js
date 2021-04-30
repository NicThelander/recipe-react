import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { setNavigator } from './src/navigationRef';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as RecipeProvider } from './src/context/RecipeContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import SavedRecipesScreen from './src/screens/SavedRecipesScreen';
import AccountScreen from './src/screens/AccountScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const homeFlow = createStackNavigator({
  Home: HomeScreen,
  Recipe: RecipeScreen,
});

homeFlow.navigationOptions = {
  title: 'Home',
};

const recipeListFLow = createStackNavigator({
  SavedRecipes: SavedRecipesScreen,
  Recipe: RecipeScreen,
});

recipeListFLow.navigationOptions = {
  title: 'Recipes',
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Register: RegisterScreen,
    Login: LoginScreen,
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow,
    recipeListFLow,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </RecipeProvider>
    </AuthProvider>
  );
};
