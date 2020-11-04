import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILLanding} from '../../assets';
import {ButtonCustom, Gap} from '../../components';
import {colors, fonts} from '../../utils';

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imgLanding}>
          {/* <ILLogoSm alignSelf={'center'} /> */}
          <ILLanding height={250} alignSelf={'center'} />
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>source of intelligence</Text>
          <Text style={styles.subtitle}>
            Sign-up and receive unlimited accesss to all of your literatur -
            share your literature.
          </Text>
        </View>

        <View style={styles.btn}>
          <ButtonCustom
            title="Sign In"
            type="primary"
            onPress={() => navigation.replace('Login')}
          />
          <Gap height={16} />
          <ButtonCustom
            title="Sign Up"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.bgColor,
  },
  container: {
    marginTop: 20,
  },
  imgLanding: {
    marginTop: 15,
  },
  title: {
    color: colors.text.secondary,
    fontSize: 35,
    textAlign: 'center',
    fontFamily: fonts.secondary.normal,
  },
  subtitle: {
    marginVertical: 15,
    color: colors.text.secondary,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.primary.normal,
  },
  titleWrap: {
    marginHorizontal: 15,
  },
  btn: {
    marginBottom: '20%',
    marginHorizontal: 40,
  },
});
