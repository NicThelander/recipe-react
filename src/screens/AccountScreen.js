import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Spacing from '../components/Spacing';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <View style={styles.containerStyle}>
      <Spacing>
        <Text style={styles.headingStyle}>Account Screen</Text>
      </Spacing>
      <Spacing>
        <Button title="Sign out" onPress={signout} />
      </Spacing>
    </View>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <MaterialCommunityIcons name="account" size={30} />,
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
  headingStyle: {
    fontSize: 40,
    marginLeft: 45,
  },
});

export default AccountScreen;
