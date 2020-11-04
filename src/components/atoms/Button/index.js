import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';

const ButtonCustom = ({title, type, onPress, iconName}) => {
  if (type === 'icon-only') {
    return <IconOnly iconName={iconName} onPress={onPress} />;
  }

  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.txtBtn(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor:
      type === 'primary' ? colors.button.primary : colors.button.secondary,
    padding: 15,
    borderRadius: 5,
  }),
  txtBtn: (type) => ({
    color: type === 'primary' ? colors.text.secondary : colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
  }),
});

export default ButtonCustom;
