import React, {useState} from 'react';
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import * as R from 'ramda';
import PhotoView from '@merryjs/photo-viewer';

import styles, {getPhotoStyle} from './styles';
import usePhotos from './usePhotos';

const Comp = ({numColumns}) => {
  const [selected, setSelected] = useState(null);
  const [photos] = usePhotos();
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={photos}
          numColumns={numColumns}
          contentContainerStyle={styles.photoContainer}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelected(index)}>
                <View style={styles.photoContainer}>
                  <Image
                    style={getPhotoStyle(numColumns)}
                    source={item.source}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={R.path(['image', 'uri'])}
        />
      </View>
      <PhotoView
        visible={selected !== null}
        data={photos}
        initial={selected !== null ? selected : 0}
        onDismiss={() => setSelected(null)}
      />
    </>
  );
};

Comp.defaultProps = {
  numColumns: 4,
};

Comp.navigationOptions = () => {
  return {
    title: 'All Photos',
  };
};

export default Comp;
