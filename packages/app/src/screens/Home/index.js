import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, VirtualizedList } from 'react-native';
import { Button } from 'react-native';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import isLogin from '@bobwei/instagram-api/lib/apis/isLogin';
import logout from '@bobwei/instagram-api/lib/apis/logout';

import styles, { getPhotoStyle } from './styles';
import usePhotos from './usePhotos';

const Comp = ({ numColumns, navigation }) => {
  const [photos, , loadData] = usePhotos();
  setupListeners({ navigation });
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

Comp.navigationOptions = ({ navigation, isAuthenticated }) => {
  // prettier-ignore
  const headerRight = !isAuthenticated
    ? <Button title="Login" onPress={onLogin({ navigation })} />
    : <Button title="Logout" onPress={onLogout({ navigation })} />;
  return {
    title: 'All Photos',
    headerRight,
  };
};

export default withMappedNavigationParams()(Comp);

function setupListeners({ navigation }) {
  useEffect(() => {
    const listener = navigation.addListener('didFocus', () => {
      isLogin().then((val) => navigation.setParams({ isAuthenticated: val }));
    });
    return () => {
      listener.remove();
    };
  }, []);
}

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

function onLogin({ navigation }) {
  return () => {
    navigation.push('Login');
  };
}

function onLogout({ navigation }) {
  return () => {
    return logout()
      .then(() => navigation.setParams({ isAuthenticated: false }))
      .catch((res) => console.log(res.response));
  };
}
