import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconAddCollection,
  IconAddCollectionActive,
  IconHome,
  IconHomeActive,
  IconMyCollection,
  IconMyCollectionActive,
  IconProfile,
  IconProfileActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Home') {
      return active ? (
        <IconHomeActive height={26} width={26} />
      ) : (
        <IconHome height={26} width={26} />
      );
    }

    if (title === 'My Collection') {
      return active ? (
        <IconMyCollectionActive height={26} width={26} />
      ) : (
        <IconMyCollection height={26} width={26} />
      );
    }

    if (title === 'Add Literature') {
      return active ? (
        <IconAddCollectionActive height={26} width={26} />
      ) : (
        <IconAddCollection height={26} width={26} />
      );
    }

    if (title === 'Profile') {
      return active ? (
        <IconProfileActive height={26} width={26} />
      ) : (
        <IconProfile height={26} width={26} />
      );
    }

    return active ? (
      <IconHomeActive height={26} width={26} />
    ) : (
      <IconHome height={26} width={26} />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.txtMenu(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  txtMenu: (active) => ({
    marginTop: 5,
    fontSize: 11,
    fontFamily: fonts.primary[700],
    color: active ? colors.text.orange : colors.text.primary,
  }),
});
