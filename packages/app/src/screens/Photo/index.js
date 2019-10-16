/* eslint-disable no-restricted-syntax, no-await-in-loop */
import React, { useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import useFaceDescriptors from '../../hooks/useFaceDescriptors';

const Comp = ({ photo, navigation }) => {
  const [descriptors, run] = useFaceDescriptors();
  useEffect(componentDidMount({ navigation, run, photo }), []);
  return (
    <>
      <View style={styles.container}>
        <ImageBackground style={styles.container} resizeMode="contain" source={photo.source}>
          {descriptors.map((face, i) => {
            return (
              <TouchableOpacity
                style={[styles.photo, styles.detection, face.detection]}
                onPress={onFacePress(face)}
                key={i}
              />
            );
          })}
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

function onFacePress(f1) {
  return async () => {
    const keys = await AsyncStorage.getAllKeys();
    let min = Infinity;
    let f = null;
    for (const key of keys) {
      const f2 = JSON.parse(await AsyncStorage.getItem(key));
      const score = euclideanDistance(f1.descriptor, f2.descriptor);
      if (score < min) {
        min = score;
        f = f2;
      }
    }
    console.log(1 / (1 + min), min, f.data);
  };
}

function euclideanDistance(arr1, arr2) {
  const desc1 = Array.from(arr1);
  const desc2 = Array.from(arr2);
  return Math.sqrt(
    desc1.map((val, i) => val - desc2[i]).reduce((res, diff) => res + Math.pow(diff, 2), 0),
  );
}
