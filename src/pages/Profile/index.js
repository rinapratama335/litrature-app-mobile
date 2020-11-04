import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {UserContext} from '../../context/UserContext';
import {colors} from '../../utils';
import {image_url} from '../../apiConfig';
import {Gap, Header} from '../../components';

const Profile = () => {
  const [state, dispatch] = useContext(UserContext);

  console.log('Detail Profile : ', state);

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <Gap height={15} />
      <Image
        source={{uri: `${image_url}${state.user.avatar}`}}
        style={styles.avatar}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
