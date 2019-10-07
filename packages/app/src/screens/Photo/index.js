import React from 'react';
import { View, Image } from 'react-native';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import styles from './styles';

const Comp = ({ photo }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={[styles.container, styles.photo]}
          resizeMode="contain"
          source={photo.source}
        />
      </View>
    </>
  );
};

Comp.navigationOptions = () => {
  return {
    title: 'Photo',
  };
};

export default withMappedNavigationParams()(Comp);
