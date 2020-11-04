import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {API, cover_url} from '../../apiConfig';
import {Gap, Header, Loading} from '../../components';
import {UserContext} from '../../context/UserContext';
import {colors, fonts} from '../../utils';

const AddCollection = ({navigation}) => {
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [myLiteratures, setMyLiteratures] = useState([]);

  useEffect(() => {
    myLiteratureLists();
  }, []);

  const myLiteratureLists = async () => {
    try {
      setLoading(true);
      const res = await API.get('/my-literatures');
      setMyLiteratures(res.data.data.myliteratures);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="My Literatures" onPress={() => navigation.goBack()} />
      {loading || !myLiteratures ? (
        <Loading />
      ) : (
        <FlatList
          data={myLiteratures}
          renderItem={({item}) => {
            return (
              <View>
                <View style={{marginVertical: 10, marginHorizontal: 10}}>
                  {item.status !== 'approved' ? (
                    <>
                      <Image
                        source={{uri: `${cover_url}${item.cover}`}}
                        style={styles.imgContent}
                      />
                      <View style={styles.descContent}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.publication}>
                          {item.publication}
                        </Text>
                      </View>
                      <Gap height={15} />
                      <Text style={styles.publication}>
                        Status ({item.status})
                      </Text>
                    </>
                  ) : (
                    <>
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
                        <Text style={styles.publication}>
                          {item.publication}
                        </Text>
                        <Gap height={15} />
                      </View>
                      <Text style={styles.status}>Status: {item.status}</Text>
                    </>
                  )}
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          refreshing={loading}
          onRefresh={myLiteratureLists}
        />
      )}
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default AddCollection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  imgContent: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').height / 2.5 - 20,
    borderRadius: 7,
  },
  descContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text.orange,
    fontSize: 14,
    fontFamily: fonts.primary[700],
    width: 120,
  },
  status: {
    color: colors.text.greenLight,
  },
  publication: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.button.greenLight,
  },
});
