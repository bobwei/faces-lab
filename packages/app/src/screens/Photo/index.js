import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import styles from './styles';
import useFaceDescriptors from '../../hooks/useFaceDescriptors';

const Comp = ({ photo }) => {
  const [, run] = useFaceDescriptors();
  useEffect(() => {
    run(photo);
  }, []);
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
