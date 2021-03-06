import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import Spacing from '../components/Spacing';
import ResultsList from '../components/ResultsList';

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();
  const [offset, setOffset] = useState(0);

  return (
    <View style={styles.containerStyle}>
      <Spacing>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchApi(`${term}&offset=${offset}`)}
        />
      </Spacing>
      {errorMessage ? (
        <Spacing>
          <Text>{errorMessage}</Text>
        </Spacing>
      ) : null}
      <View style={styles.listSpacing}>
        <ResultsList style={styles.listStyle} results={results.results} />
      </View>
      <KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.backButtonStyle}
          onPress={() => {
            const tempOffset = offset - 8 >= 0 ? offset - 8 : 0;
            searchApi(`${term}&offset=${tempOffset}`);
            setOffset(tempOffset);
          }}
        >
          <Text style={{ fontSize: 20 }}>back</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.nextButtonStyle}
          onPress={() => {
            const tempOffset = offset + 8 < 92 ? offset + 8 : 92;
            searchApi(`${term}&offset=${tempOffset}`);
            setOffset(tempOffset);
          }}
        >
          <Text style={{ fontSize: 20 }}>next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  listSpacing: {
    marginLeft: 15,
  },
  listStyle: {
    marginLeft: 10,
    marginBottom: 10,
  },
  backButtonStyle: {
    paddingVertical: 2,
    paddingHorizontal: 65,
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 2,
    position: 'absolute',
    bottom: 69,
    left: 25,
  },
  nextButtonStyle: {
    paddingVertical: 2,
    paddingHorizontal: 65,
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 2,
    position: 'absolute',
    bottom: 69,
    right: 25,
  },
});

export default HomeScreen;
