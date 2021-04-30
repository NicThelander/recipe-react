import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacing from './Spacing';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacing>
        <Text h3 style={styles.headerTextStyle}>
          {headerText}
        </Text>
      </Spacing>
      <Spacing>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacing>
      <Spacing>
        <Input
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacing>
      {errorMessage ? (
        <Spacing>
          <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
        </Spacing>
      ) : null}

      <Spacing>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacing>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessageStyle: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  headerTextStyle: {
    marginLeft: 8,
  },
});

export default AuthForm;
