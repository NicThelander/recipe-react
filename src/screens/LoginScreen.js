import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import Spacing from '../components/Spacing';

const LoginScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.containerStyle}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Spacing>
        <AuthForm
          headerText="Sign in"
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="Sign in!"
        />
      </Spacing>
      <Spacing>
        <Spacing>
          <NavLink routeName="Register" text="No Account? Register now!" />
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

export default LoginScreen;
