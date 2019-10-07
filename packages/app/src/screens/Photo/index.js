import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import styles from './styles';
import useFaceDescriptors from '../../hooks/useFaceDescriptors';

const Comp = ({ photo, navigation }) => {
  const [, run] = useFaceDescriptors();
  useEffect(componentDidMount({ navigation, run, photo }), []);
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

Comp.navigationOptions = ({ isLoading }) => {
  return {
    title: !isLoading ? 'Photo' : 'Loading...',
  };
};

export default withMappedNavigationParams()(Comp);

function componentDidMount({ navigation, run, photo }) {
  return () => {
    navigation.setParams({ isLoading: true });
    run(photo).then(() => {
      navigation.setParams({ isLoading: false });
    });
  };
}
