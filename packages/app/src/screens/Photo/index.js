import React, { useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import styles from './styles';
import useFaceDescriptors from '../../hooks/useFaceDescriptors';

const Comp = ({ photo, navigation }) => {
  const [descriptors, run] = useFaceDescriptors();
  useEffect(componentDidMount({ navigation, run, photo }), []);
  return (
    <>
      <View style={styles.container}>
        <ImageBackground style={styles.container} resizeMode="contain" source={photo.source}>
          {descriptors.map(({ detection }) => (
            <View style={[styles.photo, styles.detection, detection]} />
          ))}
        </ImageBackground>
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
