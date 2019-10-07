import React from 'react';
import { View, Image, TouchableOpacity, VirtualizedList } from 'react-native';

import styles, { getPhotoStyle } from './styles';
import usePhotos from './usePhotos';

const Comp = ({ numColumns, navigation }) => {
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
          renderItem={renderItem({ numColumns, navigation })}
          keyExtractor={(item, i) => i}
          onEndReached={() => loadData()}
        />
      </View>
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

function renderItem({ numColumns, navigation }) {
  return ({ item }) => {
    return (
      <View style={styles.row}>
        {item.map((photo) => {
          const { source } = photo;
          return (
            <TouchableOpacity onPress={() => navigation.push('Photo', { photo })}>
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
