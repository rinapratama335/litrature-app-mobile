import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {API, cover_url} from '../../apiConfig';
import {Header, Loading} from '../../components';
import {UserContext} from '../../context/UserContext';
import {colors, fonts} from '../../utils';

const Collection = ({navigation}) => {
  const [state, dispatch] = useContext(UserContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myCollections();
  }, []);

  const myCollections = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/mycollections`);
      setCollections(res.data.data.mycollections.literatures);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="My Collections" onPress={() => navigation.goBack()} />
      {loading || !collections ? (
        <Loading />
      ) : (
        <FlatList
          data={collections}
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
          onRefresh={myCollections}
        />
      )}
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  imgContent: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').height / 2 - 20,
    borderRadius: 7,
  },
  descContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text.orange,
    fontSize: 18,
    fontFamily: fonts.primary[700],
    width: 150,
  },
  publication: {
    color: colors.text.secondary,
    fontSize: 16,
  },
});
