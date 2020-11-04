import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconBack, IconNext} from '../../../assets';

const IconOnly = ({onPress, iconName}) => {
  const Icon = () => {
    if (iconName === 'back') {
      return <IconBack height={25} width={25} color="white" />;
    }

    if (iconName === 'next') {
      return <IconNext height={25} width={25} color="white" />;
    }

    return <IconBack height={25} width={25} color="white" />;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
