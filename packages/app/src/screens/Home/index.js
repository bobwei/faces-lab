import React, { useState } from 'react';
import { View, Image, TouchableOpacity, VirtualizedList } from 'react-native';
import PhotoView from '@merryjs/photo-viewer';

import styles, { getPhotoStyle } from './styles';
import usePhotos from './usePhotos';

const Comp = ({ numColumns }) => {
  const [selected, setSelected] = useState(null);
  const [photos, , loadData] = usePhotos();
  return (
    <>
      <View style={styles.container}>
        <VirtualizedList
          data={photos}
          getItemCount={(data) => Math.ceil(data.length / numColumns)}
          getItem={getItem(numColumns)}
          numColumns={numColumns}
          contentContainerStyle={styles.photoContainer}
          renderItem={renderItem({ setSelected, numColumns })}
          keyExtractor={(item, i) => i}
          onEndReached={() => loadData()}
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

function getItem(numColumns) {
  return (data, index) => {
    return data.slice(numColumns * index, numColumns * (index + 1));
  };
}

function renderItem({ setSelected, numColumns }) {
  return ({ item, index }) => {
    return (
      <View style={styles.row}>
        {item.map(({ source }, i) => {
          return (
            <TouchableOpacity onPress={() => setSelected(numColumns * index + i)}>
              <View style={styles.photoContainer}>
                <Image style={getPhotoStyle(numColumns)} source={source} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
}
