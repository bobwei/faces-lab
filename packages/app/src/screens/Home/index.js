import React, {useEffect, useState} from 'react';
import {View, FlatList, Image} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import * as R from 'ramda';

import styles, {getPhotoStyle} from './styles';

const Comp = () => {
  const [photos] = usePhotos();
  const numColumns = 4;
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={photos}
          numColumns={numColumns}
          renderItem={({item}) => {
            return (
              <View style={styles.photoContainer}>
                <Image style={getPhotoStyle(numColumns)} source={item.image} />
              </View>
            );
          }}
          keyExtractor={R.path(['image', 'uri'])}
        />
      </View>
    </>
  );
};

Comp.navigationOptions = () => {
  return {
    title: 'All Photos',
  };
};

export default Comp;

function usePhotos() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    CameraRoll.getPhotos({first: 10})
      .then(
        R.pipe(
          R.prop('edges'),
          R.map(R.prop('node')),
        ),
      )
      .then(data => setPhotos(data));
  }, []);
  return [photos, setPhotos];
}
