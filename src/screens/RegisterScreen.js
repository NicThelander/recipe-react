import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext.js';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import Spacing from '../components/Spacing';

const RegisterScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.containerStyle}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Spacing>
        <AuthForm
          headerText="Register"
          errorMessage={state.errorMessage}
          onSubmit={signup}
          submitButtonText="Register!"
        />
      </Spacing>
      <Spacing>
        <Spacing>
          <NavLink routeName="Login" text="Already Registered? Sign in!" />
        </Spacing>
      </Spacing>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
});

export default RegisterScreen;
