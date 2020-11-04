import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ILLogo width={'80%'} />
      <Text style={styles.logoTitle}>Literature Mobile</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
  },
  logoTitle: {
    marginTop: 15,
    fontSize: 30,
    color: colors.text.secondary,
    fontFamily: fonts.secondary.normal,
  },
});
