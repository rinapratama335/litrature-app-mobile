import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Searchbar} from 'react-native-paper';

const SearchForm = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  // const handleSearch = () => {
  //   console.log('Keyword : ', searchQuery);

  //   navigation.navigate());

  //   setSearchQuery('');
  // };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onPress={() => navigation.navigate('SearchPage')}
      />
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({});
