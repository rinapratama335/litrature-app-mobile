import React, {useState, useEffect, useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {API, cover_url} from '../../apiConfig';
import {Gap, Header, Loading} from '../../components';
import {UserContext} from '../../context/UserContext';
import {colors, fonts} from '../../utils';

const DetailLiterature = ({route, navigation}) => {
  const {id} = route.params;

  const [detailLiterature, setDetailLiterature] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    const literatureDetail = async () => {
      try {
        setLoading(true);
        const resDetail = await API.get(`/literature/${id}`);
        setDetailLiterature(resDetail.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };

    literatureDetail();
  }, []);

  const onSubmitLibrary = async () => {
    try {
      setLoading(true);
      await API.post(`/mycollection/${detailLiterature.id}`);
      setLoading(false);
      showMessage({
        message: 'Success adding data to your collection',
        backgroundColor: colors.greenLight,
        color: colors.text.secondary,
      });
    } catch (err) {
      showMessage({
        message: 'Data is already exist in your collection',
        backgroundColor: colors.redDanger,
        color: colors.text.secondary,
      });
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Detail Literature" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.wrapper}>
          {loading || !detailLiterature ? (
            <Loading />
          ) : (
            <>
              <View>
                <Image
                  source={{uri: `${cover_url}${detailLiterature.cover}`}}
                  style={styles.cover}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <View>
                  <Text style={styles.titleValue}>
                    {detailLiterature.title}
                  </Text>
                  <Text style={styles.title}>Title</Text>
                  <Gap height={20} />
                  <Text style={styles.titleValue}>
                    {detailLiterature.user?.fullName}
                  </Text>
                  <Text style={styles.title}>Uploaded By</Text>
                  <Gap height={20} />
                  <Text style={styles.titleValue}>{detailLiterature.ISBN}</Text>
                  <Text style={styles.title}>ISBN</Text>
                </View>
                <View>
                  <Text style={styles.titleValue}>
                    {detailLiterature.publication}
                  </Text>
                  <Text style={styles.title}>Publcation</Text>
                  <Gap height={20} />
                  <Text style={styles.titleValue}>
                    {detailLiterature.pages}
                  </Text>
                  <Text style={styles.title}>Pages</Text>
                </View>
              </View>
              <View style={styles.btnWrapper}>
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => onSubmitLibrary()}>
                  <Text style={styles.txtBtnAdd}>Add to Collection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnDownload}>
                  <Text style={styles.txtBtnDownload}>Download</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailLiterature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  wrapper: {
    marginHorizontal: 15,
    paddingBottom: 15,
  },
  cover: {
    height: 300,
    width: '100%',
    resizeMode: 'stretch',
    marginTop: 15,
    borderRadius: 7,
  },
  title: {
    fontSize: 16,
    color: colors.text.orange,
    fontFamily: fonts.primary[700],
  },
  titleValue: {
    fontSize: 20,
    color: colors.text.secondary,
    fontFamily: fonts.primary[700],
  },
  btnWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnAdd: {
    backgroundColor: colors.button.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  txtBtnAdd: {
    color: colors.text.secondary,
  },
  btnDownload: {
    backgroundColor: colors.button.greenLight,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  txtBtnDownload: {
    color: colors.text.secondary,
  },
});
