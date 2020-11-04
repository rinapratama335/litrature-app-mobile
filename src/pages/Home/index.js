import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {API, cover_url, setAuthToken} from '../../apiConfig';
import {SearchForm} from '../../components';
import {colors, fonts, getData} from '../../utils';

const getToken = getData('token');
if (getToken) setAuthToken(getToken);
console.log('Nilai data asyncStorage: ', getToken);

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [literatures, setLiteratures] = useState([]);

  useEffect(() => {
    loadLiteratures();
  }, []);

  const loadLiteratures = async () => {
    try {
      setLoading(true);
      const res = await API.get('/all-literatures');
      setLiteratures(res.data.data.literature);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  console.log('Data literature : ', literatures);

  return (
    <View style={styles.container}>
      <SearchForm />
      <FlatList
        data={literatures}
        renderItem={({item}) => {
          return (
            <View>
              <View style={{marginVertical: 10, marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailLiterature', {id: item.id})
                  }>
                  <Image
                    source={{uri: `${cover_url}${item.cover}`}}
                    style={styles.imgContent}
                  />
                </TouchableOpacity>
                <View style={styles.descContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.publication}>{item.publication}</Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        refreshing={loading}
        onRefresh={loadLiteratures}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },

  imgContent: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').height / 3 - 20,
    borderRadius: 7,
  },
  descContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text.orange,
    fontSize: 16,
    fontFamily: fonts.primary[700],
    width: 120,
  },
  publication: {
    color: colors.text.secondary,
    fontSize: 16,
  },
});
