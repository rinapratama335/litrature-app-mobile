import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import {ButtonCustom, Gap} from '../../atoms';

const Header = ({onPress, title}) => {
  return (
    <View style={styles.container}>
      <ButtonCustom type="icon-only" iconName="back" onPress={onPress} />
      <Text style={styles.txtHeader}>{title}</Text>
      <Gap width={15} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.bgColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHeader: {
    color: colors.text.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
