import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, VirtualizedList } from 'react-native';
import PhotoView from '@merryjs/photo-viewer';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import fs from 'react-native-fs';

import styles, { getPhotoStyle } from './styles';
import usePhotos from './usePhotos';
import baseUrl from '../../api/config';

const Comp = ({ numColumns }) => {
  const [selected, setSelected] = useState(null);
  const [photos, , loadData] = usePhotos();
  useDescriptor({ photos, selected });
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
        onChange={({ index }) => setSelected(index)}
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

function useDescriptor({ photos, selected }) {
  useEffect(() => {
    if (selected === null) {
      return;
    }
    ImageResizer.createResizedImage(photos[selected].source.uri, 600, 600, 'JPEG', 80)
      .then(async ({ uri }) => {
        return 'data:image/jpeg;base64,' + (await fs.readFile(uri, 'base64'));
      })
      .then((data) => {
        // prettier-ignore
        return axios
          .post(`${baseUrl}/faces/descriptor`, { data })
          .then((res) => res.data);
      })
      .catch(console.log);
  }, [selected]);
}
