import React from 'react';
import {View} from 'react-native';

import styles from './styles';

const Comp = () => {
  return (
    <>
      <View style={styles.container} />
    </>
  );
};

Comp.navigationOptions = () => {
  return {
    title: 'All Photos',
  };
};

export default Comp;
