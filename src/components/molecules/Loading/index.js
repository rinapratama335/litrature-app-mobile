import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {colors} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator animating={true} color={colors.orangeText} />
      <Text style={styles.text}>Loading.....</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackOpacity,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: colors.text.secondary,
  },
});
